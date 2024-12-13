import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { StoreProvider } from 'easy-peasy';
import store from './models/store';  // Make sure the store is imported correctly

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  </React.StrictMode>
);
