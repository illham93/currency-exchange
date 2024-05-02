import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import Converter from './Converter';

const App = () => {
  return (
    <>
      <Router>
        <Navbar/>
        <Switch>
          <Route path="/Converter/" component={Converter} />
          <Route path="/" component={Home} />
        </Switch>
    </Router>
    <Footer />
    </>
  );
}

export default App;
