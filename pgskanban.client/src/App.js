import React, { Component } from 'react';
import Board from './components/Board';
import logo from './logo.svg';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import NewBoard from './components/NewBoard';

class App extends Component {
  render() {
    return (
        <div className="App">
          <BrowserRouter>
            <div>
                <Route path='/new' component={NewBoard}/>
                <Route exact path='/' component={Board}/>
            </div>
          </BrowserRouter>
        </div>
    );
  }
}

export default App;
