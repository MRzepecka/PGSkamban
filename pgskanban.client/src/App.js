import React, { Component } from 'react';
import Board from './components/Board';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
        <div className="App">
          <Board/>
        </div>
    );
  }
}

export default App;