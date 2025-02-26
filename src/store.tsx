// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counterSlice';

// Configure the Redux store with the counter reducer
export const store = configureStore({
    reducer: {
        counter: counterReducer,
    },
});

// Define types for the RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
