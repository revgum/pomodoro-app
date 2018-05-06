// @flow
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

type Props = {
  foo: string
};
type State = {
  blah: string
};

class App extends Component<Props, State> {
  static defaultProps = {
    foo: 123
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="app-logo" alt="logo" />
          <h1 className="App-Title">Welcome to React</h1>
        </header>
      </div>
    );
  }
}

export default App;
