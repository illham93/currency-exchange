import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Footer from './Footer';
import Home from './Home';
import Converter from './Converter';

const App = () => {
  return (
    <>
      <Router>
        <nav class="text-center">
          <Link to="/">Home</Link>
          <Link to="/Converter/">Converter</Link>
        </nav>
        <Route path="/" exact component={Home} />
        <Route path="/Converter/" component={Converter} />
    </Router>
    <Footer />
    </>
  );
}

export default App;
