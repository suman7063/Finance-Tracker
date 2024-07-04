import logo from './logo.svg';
import { useEffect, useState } from "react";
import './App.css';
import AddTransaction from './component/AddTransaction';

function App() {

  return (
    <div className="App">
      <AddTransaction />
    </div>
  );
}

export default App;
