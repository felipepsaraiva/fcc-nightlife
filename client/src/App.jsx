import { Component } from 'react';
import './App.module.css';

export default class App extends Component {
  state = {
    name: 'fcc-nightlife',
  };

  render() {
    return (
      <div className="App">
        <h1>Welcome to {this.state.name}</h1>
      </div>
    );
  }
}
