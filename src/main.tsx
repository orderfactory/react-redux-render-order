// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './store';

// Render the App component wrapped with the Redux Provider
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

    /* =====================================================================================

     React renders components twice in development mode due to Strict Mode. 
     Strict Mode is a tool for highlighting potential problems in an application. 
     When enabled, React intentionally renders components twice (and runs effects twice) 
     to help identify issues related to:

     • Impure rendering:
       Rendering logic should be pure, meaning it should always produce the same output 
       for the same input and should not have side effects. Rendering components twice 
       helps uncover situations where this rule is broken.

     • Missing Effect cleanup:
       Effects (using useEffect) may introduce side effects, such as setting up event 
       listeners or timers. If these side effects are not properly cleaned up, they can 
       lead to memory leaks or unexpected behavior. Running effects twice helps highlight 
       cases where cleanup is missing.

     • Resilience to remounting:
       Strict Mode checks if components handle being remounted with existing state correctly.

     This double rendering behavior is intentional and only occurs in development mode. 
     It does not affect production builds. While it might seem like an inconvenience, 
     it helps catch bugs early in the development process and ensures the application 
     is more robust.

     To disable this behavior, the <StrictMode> tag can be removed from the application. 
     This can help when you need to match the rendering behavior of production build temporarily. 
     However, it is highly recommended to turn it back on during development otherwise.

    ===================================================================================== */

    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
