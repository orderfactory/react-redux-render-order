// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counterSlice';

// Configure the Redux store with the counter reducer
export const store = configureStore({
    reducer: {
        counter: counterReducer,
    },
});

// Infer the AppStore, RootState and AppDispatch types from the store itself
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
