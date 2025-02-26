// src/components/Sibling.tsx
import {
    useState,
    useEffect,
    useLayoutEffect,
    useMemo,
    useCallback,
    useReducer,
    useRef,
    forwardRef,
    useImperativeHandle
} from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

// Define the interface for the Sibling component's imperative handle
interface SiblingHandle {
    focusInput: () => void;
}

// Define the Sibling component using forwardRef to expose an imperative handle
const Sibling = forwardRef<SiblingHandle>((_props, ref) => {
    console.log('Sibling Render Start');

    const [siblingState, setSiblingState] = useState(0);
    const counter = useSelector((state: RootState) => state.counter.value);
    const inputRef = useRef<HTMLInputElement>(null);

    // useEffect demonstration
    useEffect(() => {
        console.log('Sibling useEffect');
    }, []);

    // useLayoutEffect demonstration
    useLayoutEffect(() => {
        console.log('Sibling useLayoutEffect');
    }, []);

    // useMemo demonstration
    const memoizedSibling = useMemo(() => {
        console.log('Sibling useMemo');
        return siblingState * 4;
    }, [siblingState]);

    // useCallback demonstration
    const handleSiblingClick = useCallback(() => {
        console.log('Sibling useCallback');
        setSiblingState(prev => prev + 1);
    }, []);

    // useReducer demonstration
    const [reducerState, dispatch] = useReducer(
        (state: number, action: { type: string; payload?: number }) => {
            console.log('Sibling useReducer');
            switch (action.type) {
                case 'increment':
                    return state + (action.payload || 1);
                default:
                    return state;
            }
        },
        0
    );

    // Expose a method to focus the input using useImperativeHandle
    useImperativeHandle(ref, () => ({
        focusInput: () => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }
    }));

    console.log('Sibling Render End');

    return (
        <div style={{ border: '2px solid red', padding: '10px', margin: '10px' }}>
            <h3>Sibling Component</h3>
            <p>Sibling State: {siblingState}</p>
            <p>Memoized Sibling Value (siblingState * 4): {memoizedSibling}</p>
            <p>Reducer State: {reducerState}</p>
            <p>Redux Counter: {counter}</p>
            <button onClick={handleSiblingClick}>Increment Sibling State</button>
            <button onClick={() => dispatch({ type: 'increment', payload: 5 })}>
                Dispatch Reducer (Increment by 5)
            </button>
            <input ref={inputRef} placeholder="Focus me via imperative handle" />
        </div>
    );
});

export default Sibling;
