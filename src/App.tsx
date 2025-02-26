// src/App.tsx
import { useEffect } from 'react';
import Parent from './components/Parent';

// Define the App component
const App = () => {
    console.log('App Render Start');

    // useEffect demonstration
    useEffect(() => {
        console.log('App useEffect');
    }, []);

    console.log('App Render End');

    return (
        <div style={{ border: '2px solid black', padding: '10px', margin: '10px' }}>
            <h1>React Redux Rendering Order Demo</h1>
            <Parent />
        </div>
    );
};

export default App;
