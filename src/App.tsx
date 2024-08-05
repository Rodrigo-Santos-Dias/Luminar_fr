
import Home from './pages/home/Home';
import './App.css';
import React, { useState } from 'react';


function App() {
  const [valor, setValor] = useState(0);
  function handleClick() {
    setValor(valor + 1);
  }
  return (
    <>
      <Home/>
    </>
  
  );
}

export default App;