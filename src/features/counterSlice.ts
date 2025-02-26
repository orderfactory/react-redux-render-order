// src/features/counterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state for the counter
interface CounterState {
    value: number;
}

// Initial state of the counter with a default value of 0
const initialState: CounterState = { value: 0 };

// Create a slice for the counter with reducers for increment, decrement, and addAmount
export const counterSlice = createSlice({
    name: 'counter', // Name of the slice
    initialState, // Initial state of the slice
    reducers: {
        // Reducer to increment the counter value by 1
        increment(state) {
            state.value += 1;
        },
        // Reducer to decrement the counter value by 1
        decrement(state) {
            state.value -= 1;
        },
        // Reducer to add a specified amount to the counter value
        addAmount(state, action: PayloadAction<number>) {
            state.value += action.payload;
        },
    },
});

// Export the actions and reducer from the counter slice
// Actions are used to dispatch changes to the state
export const { increment, decrement, addAmount } = counterSlice.actions;

// Export the reducer to be used in the store configuration
export default counterSlice.reducer;
