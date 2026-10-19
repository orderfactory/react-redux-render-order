# React Redux Rendering Order Demo

A sample React application created with the Vite React‑TS template. This app demonstrates the rendering order in a React and Redux setup using a variety of React hooks (including state, effects, layout effects, memoization, callbacks, refs, reducers, and custom hooks with `useDebugValue`) as well as Redux hooks.

It accompanies the article [React Rendering Order: Renders Go Down, Effects Come Up](https://www.orderfactory.com/articles/react-rendering-order.html), which walks through the console output line by line.

## Overview

This project illustrates:
- **React Hooks**: `useState`, `useEffect`, `useLayoutEffect`, `useMemo`, `useCallback`, `useRef`, `useReducer`, `useImperativeHandle`, and a custom hook (`useDebugValueDemo`).
- **Redux Hooks**: `useSelector`, `useDispatch`, and `useStore`, used through their pre-typed versions (`useAppSelector`, `useAppDispatch`, `useAppStore`).
- **Component Hierarchy**: A Parent component that renders both Child and Sibling components to showcase various render orders and hook lifecycles.
- **Debugging**: Console logs are used throughout the components to demonstrate the execution order of renders and hooks.

## Prerequisites

- **Node.js** 22.13+ or 24+
- **npm**

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/orderfactory/react-redux-render-order.git
   cd react-redux-render-order
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

## Running the Application

Start the development server with:

```bash
npm run dev
```

Then open the address Vite prints (by default `http://localhost:5173`) and open the browser's developer console to observe the logs that illustrate the rendering order and hook execution across components. In development, Strict Mode calls renders, `useMemo` calculations, and reducers twice, and gives every effect one extra setup and cleanup cycle.

To see the order without Strict Mode's extra calls, serve the production build (by default at `http://localhost:4173`):

```bash
npm run build
npm run preview
```

## Linting and End-to-End Tests

```bash
npm run lint
```

The Playwright suite in `e2e/` checks the console traces from the article, line by line, against the Vite dev server (port 5273) and the production preview (port 4273), and starts both servers itself. Install its browser once, then run it:

```bash
npx playwright install chromium
npm run test:e2e
```

Or run it in Docker without installing a browser (from PowerShell or a POSIX shell; the extra volume keeps the container's `node_modules` separate from yours, and the image tag must match the installed `@playwright/test` version):

```bash
docker run --rm --ipc=host -v "${PWD}:/work" -v /work/node_modules -w /work mcr.microsoft.com/playwright:v1.64.1-noble bash -c "npm ci && npm run test:e2e"
```

## File Structure

```
/playwright.config.ts           # Runs the e2e suite against the dev server and the production preview
/e2e
  |-- render-order.spec.ts      # Playwright tests: the article's console traces in development and production
/src
  |-- main.tsx                  # App entry point; renders the App in StrictMode with the Redux Provider
  |-- App.tsx                   # Top-level component; renders the Parent component
  |-- app/
        |-- store.ts            # Redux store configuration (using Redux Toolkit) and its inferred types
        |-- hooks.ts            # Pre-typed Redux hooks: useAppDispatch, useAppSelector, useAppStore
  |-- features/
        |-- counterSlice.ts     # Redux slice for a simple counter state
  |-- hooks/
        |-- useDebugValueDemo.ts  # Custom hook demonstrating useDebugValue
  |-- components/
        |-- Parent.tsx          # Parent component: uses multiple React and Redux hooks
        |-- Child.tsx           # Child component: uses several hooks and logs its lifecycle
        |-- Sibling.tsx         # Sibling component: demonstrates additional hooks (useReducer, useImperativeHandle)
```

## Key Components

- **Parent Component**: 
  - Uses several React hooks (`useState`, `useEffect`, `useLayoutEffect`, `useMemo`, `useCallback`, `useRef`) and Redux hooks (`useAppSelector`, `useAppDispatch`, `useAppStore`).
  - Logs the Redux store state on mount to demonstrate the usage of `useStore` (through `useAppStore`).
  - Renders both the Child and Sibling components.
  - Displays the result of the custom `useDebugValueDemo` hook in the UI.

- **Child Component**: 
  - Uses common React hooks to manage state and side effects.
  - Logs its own render process and hook executions to help trace the component lifecycle.

- **Sibling Component**: 
  - Demonstrates additional hooks such as `useReducer` and `useImperativeHandle`.
  - Receives `ref` as a regular prop, as React 19 allows, instead of wrapping itself in `forwardRef`.
  - Exposes an imperative method to focus an input field from its parent; the handle's empty dependency list keeps it from being rebuilt on every render.
  - Uses React hooks to log its render and hook execution order.

- **Custom Hook (`useDebugValueDemo`)**: 
  - Uses `useDebugValue` to enhance the debugging experience in React DevTools.
  - Returns the passed value, which is also displayed in the Parent component UI for demonstration.

## Conclusion

This demo app is designed to help you understand the render lifecycle of React components when using Redux and various React hooks. By exploring the console logs, you can gain insights into the order of rendering and hook execution, making it easier to debug and optimize React applications.

Feel free to explore and modify the code to experiment with different hook combinations and component structures!
