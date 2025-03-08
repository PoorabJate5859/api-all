import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Weather from '../src/components/Weather';
import Dog from '../src/components/Dog';
import Movie from '../src/components/Movie';
import Home from '../src/components/Home';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <nav className="fixed left-0 top-0 h-full w-64 bg-slate-900/90 backdrop-blur-lg border-r border-slate-800 flex flex-col">
        <div className="p-6 mb-8">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            API Dashboard
          </Link>
        </div>
        <div className="flex flex-col gap-4 px-4">
          <Link to="/weather" className="nav-link hover:bg-slate-800/50 transition-all">
            ⛅ Weather
          </Link>
          <Link to="/dog" className="nav-link hover:bg-slate-800/50">
            🐶 Dog Generator
          </Link>
          <Link to="/movie" className="nav-link hover:bg-slate-800/50">
            🎬 Movie Browser
          </Link>
        </div>
      </nav>

      <main className="ml-64 p-8 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/dog" element={<Dog />} />
          <Route path="/movie" element={<Movie />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
