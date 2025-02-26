// src/components/Child.tsx
import {
    useState,
    useEffect,
    useLayoutEffect,
    useMemo,
    useCallback,
    useRef
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { decrement } from '../features/counterSlice';

// Define the Child component
const Child = () => {
    console.log('Child Render Start');

    const [childState, setChildState] = useState(0);
    const dispatch: AppDispatch = useDispatch();
    const counter = useSelector((state: RootState) => state.counter.value);
    const childRef = useRef<HTMLDivElement>(null);

    // useEffect demonstration
    useEffect(() => {
        console.log('Child useEffect');
    }, []);

    // useLayoutEffect demonstration
    useLayoutEffect(() => {
        console.log('Child useLayoutEffect');
    }, []);

    // useMemo demonstration
    const memoizedChild = useMemo(() => {
        console.log('Child useMemo');
        return childState * 3;
    }, [childState]);

    // useCallback demonstration
    const handleChildClick = useCallback(() => {
        console.log('Child useCallback');
        setChildState(prev => prev + 1);
        dispatch(decrement());
    }, [dispatch]);

    console.log('Child Render End');

    return (
        <div ref={childRef} style={{ border: '2px solid green', padding: '10px', margin: '10px' }}>
            <h3>Child Component</h3>
            <p>Child State: {childState}</p>
            <p>Memoized Child Value (childState * 3): {memoizedChild}</p>
            <p>Redux Counter: {counter}</p>
            <button onClick={handleChildClick}>Decrement (Local & Redux)</button>
        </div>
    );
};

export default Child;
