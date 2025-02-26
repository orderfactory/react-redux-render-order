// src/components/Parent.tsx
import {
    useState,
    useEffect,
    useLayoutEffect,
    useMemo,
    useCallback,
    useRef
} from 'react';
import { useSelector, useDispatch, useStore } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { increment } from '../features/counterSlice';
import Child from './Child';
import Sibling from './Sibling';
import { useDebugValueDemo } from '../hooks/useDebugValueDemo';

// Define the Parent component
const Parent = () => {
    console.log('Parent Render Start');

    const [localState, setLocalState] = useState(0);
    const dispatch: AppDispatch = useDispatch();
    const counter = useSelector((state: RootState) => state.counter.value);
    const store = useStore();
    const parentRef = useRef<HTMLDivElement>(null);
    const siblingRef = useRef<{ focusInput: () => void }>(null);

    // Custom hook to demo useDebugValue
    const debugLocalState = useDebugValueDemo(localState);

    // useEffect to log current store state demonstrating useStore usage
    useEffect(() => {
        console.log('Store state on mount:', store.getState());
    }, [store]);

    // useEffect demonstration
    useEffect(() => {
        console.log('Parent useEffect');
    }, []);

    // useLayoutEffect demonstration
    useLayoutEffect(() => {
        console.log('Parent useLayoutEffect');
    }, []);

    // useMemo demonstration
    const memoizedValue = useMemo(() => {
        console.log('Parent useMemo');
        return localState * 2;
    }, [localState]);

    // useCallback demonstration
    const handleClick = useCallback(() => {
        console.log('Parent useCallback');
        setLocalState(prev => prev + 1);
        dispatch(increment());
    }, [dispatch]);

    console.log('Parent Render End');

    return (
        <div ref={parentRef} style={{ border: '2px solid blue', padding: '10px', margin: '10px' }}>
            <h2>Parent Component</h2>
            <p>Local State: {localState}</p>
            <p>Memoized Value (localState * 2): {memoizedValue}</p>
            <p>Redux Counter: {counter}</p>
            <p>Debug Local State: {debugLocalState}</p>
            <button onClick={handleClick}>Increment (Local & Redux)</button>
            <Child />
            <Sibling ref={siblingRef} />
            <button onClick={() => siblingRef.current?.focusInput()}>
                Focus Sibling Input (Imperative Handle)
            </button>
        </div>
    );
};

export default Parent;
