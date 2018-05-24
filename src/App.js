import React, { Component } from 'react';
import './common/stylus/index.styl';
import './index.css';
import Header from './components/header/header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
      </div>
    );
  }
}

export default App;
