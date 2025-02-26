# React Redux Rendering Order Demo

A sample React application created with the Vite React‑TS template. This app demonstrates the rendering order in a React and Redux setup using a variety of React hooks (including state, effects, layout effects, memoization, callbacks, refs, reducers, and custom hooks with `useDebugValue`) as well as Redux hooks.

## Overview

This project illustrates:
- **React Hooks**: `useState`, `useEffect`, `useLayoutEffect`, `useMemo`, `useCallback`, `useRef`, `useReducer`, `useImperativeHandle`, and a custom hook (`useDebugValueDemo`).
- **Redux Hooks**: `useSelector`, `useDispatch`, and `useStore`.
- **Component Hierarchy**: A Parent component that renders both Child and Sibling components to showcase various render orders and hook lifecycles.
- **Debugging**: Console logs are used throughout the components to demonstrate the execution order of renders and hooks.

## Prerequisites

- **Node.js** (v14 or later is recommended)
- **npm** or **yarn** as your package manager

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
   or
   ```bash
   yarn
   ```

## Running the Application

Start the development server with:

```bash
npm run dev
```
or
```bash
yarn dev
```

Then, open your browser and navigate to the URL provided (usually `http://localhost:3000`). Open the browser's developer console to observe the logs that illustrate the rendering order and hook execution across components.

## File Structure

```
/src
  |-- main.tsx                  # App entry point; renders the App with the Redux Provider
  |-- App.tsx                   # Top-level component; renders the Parent component
  |-- store.ts                  # Redux store configuration (using Redux Toolkit)
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
  - Uses several React hooks (`useState`, `useEffect`, `useLayoutEffect`, `useMemo`, `useCallback`, `useRef`) and Redux hooks (`useSelector`, `useDispatch`, `useStore`).
  - Logs the Redux store state on mount to demonstrate the usage of `useStore`.
  - Renders both the Child and Sibling components.
  - Displays the result of the custom `useDebugValueDemo` hook in the UI.

- **Child Component**: 
  - Uses common React hooks to manage state and side effects.
  - Logs its own render process and hook executions to help trace the component lifecycle.

- **Sibling Component**: 
  - Demonstrates additional hooks such as `useReducer` and `useImperativeHandle`.
  - Exposes an imperative method to focus an input field from its parent.
  - Uses React hooks to log its render and hook execution order.

- **Custom Hook (`useDebugValueDemo`)**: 
  - Uses `useDebugValue` to enhance the debugging experience in React DevTools.
  - Returns the passed value, which is also displayed in the Parent component UI for demonstration.

## Conclusion

This demo app is designed to help you understand the render lifecycle of React components when using Redux and various React hooks. By exploring the console logs, you can gain insights into the order of rendering and hook execution, making it easier to debug and optimize React applications.

Feel free to explore and modify the code to experiment with different hook combinations and component structures!
