import React, { Component } from 'react';
import Currency from './components/currency/currency';
import Menu from './components/menu/menu'

class App extends Component {
  constructor (props) {
    super(props)
 
    this.state = {}
  }
  render() {
    return (
      <div className="App">
        <Menu/>
        <Currency />
      </div>
    );
  }
}

export default App;
