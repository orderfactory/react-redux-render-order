// e2e/render-order.spec.ts
import { expect, test, type Page } from '@playwright/test';

// The console traces walked through in the article
// "React Rendering Order: Renders Go Down, Effects Come Up".
// The production project runs against `vite build` + `vite preview`, the
// development project against the Vite dev server, where Strict Mode calls
// renders, useMemo calculations and reducers twice and gives every effect
// one extra setup and cleanup cycle.

interface Traces {
    firstLoad: string[];
    parentButton: string[];
    siblingStateButton: string[];
    siblingReducerButton: string[];
    childButton: string[];
}

const STORE_STATE = 'Store state on mount:';

// Children first within each kind of effect: layout effects, then passive ones.
const effectsOnMount = [
    'Child useLayoutEffect',
    'Sibling useLayoutEffect',
    'Parent useLayoutEffect',
    'Child useEffect',
    'Sibling useEffect',
    `${STORE_STATE} {…}`,
    'Parent useEffect',
    'App useEffect',
];

const production: Traces = {
    firstLoad: [
        'App Render Start',
        'App Render End',
        'Parent Render Start',
        'Parent useMemo',
        'Parent Render End',
        'Child Render Start',
        'Child useMemo',
        'Child Render End',
        'Sibling Render Start',
        'Sibling useMemo',
        'Sibling Render End',
        ...effectsOnMount,
    ],
    parentButton: [
        'Parent useCallback',
        'Parent Render Start',
        'Parent useMemo',
        'Parent Render End',
        'Child Render Start',
        'Child Render End',
        'Sibling Render Start',
        'Sibling Render End',
    ],
    siblingStateButton: [
        'Sibling useCallback',
        'Sibling Render Start',
        'Sibling useMemo',
        'Sibling Render End',
    ],
    siblingReducerButton: [
        'Sibling Render Start',
        'Sibling useReducer',
        'Sibling Render End',
    ],
    childButton: [
        'Child useCallback',
        'Parent Render Start',
        'Parent Render End',
        'Child Render Start',
        'Child useMemo',
        'Child Render End',
        'Sibling Render Start',
        'Sibling Render End',
    ],
};

const development: Traces = {
    firstLoad: [
        'App Render Start',
        'App Render End',
        'App Render Start',
        'App Render End',
        'Parent Render Start',
        'Parent useMemo',
        'Parent useMemo',
        'Parent Render End',
        'Parent Render Start',
        'Parent Render End',
        'Child Render Start',
        'Child useMemo',
        'Child useMemo',
        'Child Render End',
        'Child Render Start',
        'Child Render End',
        'Sibling Render Start',
        'Sibling useMemo',
        'Sibling useMemo',
        'Sibling Render End',
        'Sibling Render Start',
        'Sibling Render End',
        // The extra setup cycle; the demo's effects have no cleanups to log.
        ...effectsOnMount,
        ...effectsOnMount,
    ],
    parentButton: [
        'Parent useCallback',
        'Parent Render Start',
        'Parent useMemo',
        'Parent useMemo',
        'Parent Render End',
        'Parent Render Start',
        'Parent Render End',
        'Child Render Start',
        'Child Render End',
        'Child Render Start',
        'Child Render End',
        'Sibling Render Start',
        'Sibling Render End',
        'Sibling Render Start',
        'Sibling Render End',
    ],
    siblingStateButton: [
        'Sibling useCallback',
        'Sibling Render Start',
        'Sibling useMemo',
        'Sibling useMemo',
        'Sibling Render End',
        'Sibling Render Start',
        'Sibling Render End',
    ],
    siblingReducerButton: [
        'Sibling Render Start',
        'Sibling useReducer',
        'Sibling useReducer',
        'Sibling Render End',
        'Sibling Render Start',
        'Sibling Render End',
    ],
    childButton: [
        'Child useCallback',
        'Parent Render Start',
        'Parent Render End',
        'Parent Render Start',
        'Parent Render End',
        'Child Render Start',
        'Child useMemo',
        'Child useMemo',
        'Child Render End',
        'Child Render Start',
        'Child Render End',
        'Sibling Render Start',
        'Sibling Render End',
        'Sibling Render Start',
        'Sibling Render End',
    ],
};

const tracesByProject: Record<string, Traces> = { development, production };

function expectedTraces(): Traces {
    const { name } = test.info().project;
    const traces = tracesByProject[name];
    if (!traces) {
        throw new Error(`No console traces for project "${name}"`);
    }
    return traces;
}

// Opens the demo, records its console, and checks the first-load trace.
async function openDemo(page: Page) {
    const logs: string[] = [];
    const problems: string[] = [];
    page.on('console', (message) => {
        const type = message.type();
        if (type === 'log') {
            const text = message.text();
            logs.push(text.startsWith(STORE_STATE) ? `${STORE_STATE} {…}` : text);
        } else if (type === 'error' || type === 'warning') {
            problems.push(`${type}: ${message.text()}`);
        }
    });
    page.on('pageerror', (error) => problems.push(`pageerror: ${error.message}`));

    await page.goto('/');
    await expectLogs(page, logs, expectedTraces().firstLoad);
    return { logs, problems };
}

// Waits for the expected lines, then gives React a moment to print anything extra.
async function expectLogs(page: Page, logs: string[], expected: string[]) {
    await expect.poll(() => logs).toEqual(expected);
    await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 100)));
    expect(logs).toEqual(expected);
}

async function clickAndExpectLogs(page: Page, logs: string[], button: string, expected: string[]) {
    logs.length = 0;
    await page.getByRole('button', { name: button }).click();
    await expectLogs(page, logs, expected);
}

function text(page: Page, content: string) {
    return page.getByText(content, { exact: true });
}

test('first load: renders go down, effects come up', async ({ page }) => {
    const storeState = page.waitForEvent('console', (message) => message.text().startsWith(STORE_STATE));
    const { problems } = await openDemo(page);

    expect(await (await storeState).args()[1].jsonValue()).toEqual({ counter: { value: 0 } });
    await expect(text(page, 'Redux Counter: 0')).toHaveCount(3);
    expect(problems).toEqual([]);
});

test('Parent button: a state update and a dispatch render in one pass', async ({ page }) => {
    const { logs, problems } = await openDemo(page);

    await clickAndExpectLogs(page, logs, 'Increment (Local & Redux)', expectedTraces().parentButton);
    await expect(text(page, 'Local State: 1')).toBeVisible();
    await expect(text(page, 'Memoized Value (localState * 2): 2')).toBeVisible();
    await expect(text(page, 'Debug Local State: 1')).toBeVisible();
    await expect(text(page, 'Redux Counter: 1')).toHaveCount(3);
    expect(problems).toEqual([]);
});

test('Sibling state button: only Sibling renders', async ({ page }) => {
    const { logs, problems } = await openDemo(page);

    await clickAndExpectLogs(page, logs, 'Increment Sibling State', expectedTraces().siblingStateButton);
    await expect(text(page, 'Sibling State: 1')).toBeVisible();
    await expect(text(page, 'Memoized Sibling Value (siblingState * 4): 4')).toBeVisible();
    expect(problems).toEqual([]);
});

test('Sibling reducer button: the reducer runs inside the render', async ({ page }) => {
    const { logs, problems } = await openDemo(page);

    await clickAndExpectLogs(page, logs, 'Dispatch Reducer (Increment by 5)', expectedTraces().siblingReducerButton);
    await expect(text(page, 'Reducer State: 5')).toBeVisible();
    expect(problems).toEqual([]);
});

test('focus button: the imperative handle focuses the input and nothing renders', async ({ page }) => {
    const { logs, problems } = await openDemo(page);

    await clickAndExpectLogs(page, logs, 'Focus Sibling Input (Imperative Handle)', []);
    await expect(page.getByPlaceholder('Focus me via imperative handle')).toBeFocused();
    expect(problems).toEqual([]);
});

test('Child button: Parent renders first because it selects the counter too', async ({ page }) => {
    const { logs, problems } = await openDemo(page);

    await clickAndExpectLogs(page, logs, 'Decrement (Local & Redux)', expectedTraces().childButton);
    await expect(text(page, 'Child State: 1')).toBeVisible();
    await expect(text(page, 'Memoized Child Value (childState * 3): 3')).toBeVisible();
    await expect(text(page, 'Redux Counter: -1')).toHaveCount(3);
    expect(problems).toEqual([]);
});
