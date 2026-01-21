/**
 * APP STARTUP FILE
 * 
 * WHAT THIS FILE DOES:
 * - This is the starting point that "plugs in" the App code into your web browser.
 * - It prepares the screen to display all the content.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);