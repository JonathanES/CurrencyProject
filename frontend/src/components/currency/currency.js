import React, { Component } from 'react';
import '../../main.css';


class Currency extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: "",
            base: "",
            rates: {}
        };
    }
    componentDidMount() {
        //const url = "http://data.fixer.io/api/latest?access_key=1eef45b29a8b70c01f83176deb5dba0e&format=1";
        const url = "/api/currency"
        fetch(url)
            .then(res => res.json())
            .then(currency => this.setState({ date: currency.date, base: currency.base, rates: currency.rates }, () => console.log('Currency fetched...', currency)));
    }


    render() {
        return (
            <div className="contain">
                <h3 className="center result-search">Currency<span className="red">{this.state.value}</span></h3>
                date: {this.state.date}
                base: {this.state.base}
                <div className="search-container">
                    {Object.keys(this.state.rates).map(rate =>
                        <a key={rate} className="yt-rate">
                            <p> {rate}: {this.state.rates[rate]}</p>
                        </a>
                    )}

                </div>
            </div>
        );
    }
}

export default Currency;
