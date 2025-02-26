// src/hooks/useDebugValueDemo.ts
import { useDebugValue } from 'react';

// Custom hook that uses useDebugValue for debugging purposes
export const useDebugValueDemo = <T>(value: T) => {
    useDebugValue(value, (val) => `Debug Value: ${val}`);
    return value;
};
