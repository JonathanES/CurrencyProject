import React, { Component } from 'react';
import Currency from './components/currency/currency';
import Menu from './components/menu/menu';
import Graph from './components/graph/graph';

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      rates: {}
    }
  }
  changeRates(data) {
    this.setState({ rates: data});
  }

  render() {
    return (
      <div className="App">
        <Menu/>
        <Currency rates={this.changeRates.bind(this)}/>
        <Graph rates={this.state.rates}/>
      </div>
    );
  }
}

export default App;
