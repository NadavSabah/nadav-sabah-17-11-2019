import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import NavBar from './components/NavBar/NavBar.cmp';
import HomePage from './pages/HomePage/HomePage'
import FavoritesPage from './pages/FavoritesPage/FavoritesPage'

function App() {
  return (
    <Router>


      <NavBar />
      <Route path="/" exact component={HomePage} />
      <Route path="/Favorites" component={FavoritesPage} />

    </Router>
  );
}

export default App;
