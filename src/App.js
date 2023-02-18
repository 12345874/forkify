import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/home';

function App() {

  return (
    <div className="app">
      <BrowserRouter>
      <Routes>
      <Route exact path="/" element={<Home />} />
        <Route exact path="/:id" element={<Home />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
