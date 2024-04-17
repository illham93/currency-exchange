import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Navbar from './Navbar';
import Footer from './Footer';

const Home = () => {
  return <h2>Home</h2>;
}

const Converter = () => {
  return <h2>Converter</h2>;
}

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
