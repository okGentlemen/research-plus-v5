import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './components/Header';
import { Router } from './router';

function App() {
  return (
    <BrowserRouter>
      <div className="h-screen flex flex-col bg-gray-50">
        <Header />
        <Router />
      </div>
    </BrowserRouter>
  );
}

export default App;