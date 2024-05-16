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
    <div className='wrapper'>
      <div className='content'>
        <Router>
          <Navbar/>
          <Switch>
            <Route path="/currency-exchange/Converter/" component={Converter} />
            <Route path="/currency-exchange/" component={Home} />
          </Switch>
        </Router>
        <div className='spacer'></div>
        <Footer/>
      </div>
    </div>
  );
}

export default App;
