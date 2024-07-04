// src/App.js
import React from 'react';
import { TransactionsProvider } from './context/TransactionsContext';

import Dashboard from './Dashboard';


const App = () => {
  return (
    <TransactionsProvider>
      <Dashboard />
    </TransactionsProvider>
  );
};

export default App;
