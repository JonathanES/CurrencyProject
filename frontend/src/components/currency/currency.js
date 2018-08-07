import React, { Component } from 'react';
import '../../main.css';

class Currency extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: "",
            base: "",
            newbase: "",
            result: 0,
            rates: {},
            amount: 0
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.base !== this.state.base) {
            const url = "/api/currency/" + this.state.base
            fetch(url)
                .then(res => res.json())
                .then(currency => { currency.rates[this.state.base] = 1, this.setState({ date: currency.date, base: currency.base, rates: currency.rates }, () => console.log('Currency fetched...', currency))});
        }
    }

    componentDidMount() {
        const url = "/api/currency/EUR"
        fetch(url)
            .then(res => res.json())
            .then(currency => this.setState({ date: currency.date, base: currency.base, rates: currency.rates }, () => console.log('Currency fetched...', currency)));
    }

    handleChange(event) {
        switch (event.target.id) {
            case "base":
                this.setState({ base: event.target.value });
                break;
            case "newbase":
                this.setState({ newbase: event.target.value });
                break;
            case "amount":
                this.setState({ amount: event.target.value });
                break;
            default:
                break;
        }
    }

    handleSubmit(event) {
        const that = this;
        fetch('/api/exchange', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                base: this.state.base,
                newbase: this.state.newbase,
                amount: this.state.amount
            })
        })
            .then(res => res.json())
            .then(function (result) {
                console.log(result);
                that.setState({ result: result.result });
            }).catch(err => {
                console.log(err);
            });
        event.preventDefault();

    }

    render() {
        return (
            <div className="contain">
                <h3 className="center result-search">Currency<span className="red">{this.state.value}</span></h3>
                <form className="form-search" onSubmit={this.handleSubmit}>
                    <label>

                        <input id="amount" type="text" value={this.state.amount} onChange={this.handleChange} placeholder="amount" />
                        <select id="base" value={this.state.base} onChange={this.handleChange}>
                            {Object.keys(this.state.rates).map(rate =>
                                <option value={rate}>{rate}</option>
                            )}
                        </select>
                        <select id="newbase" value={this.state.newbase} onChange={this.handleChange}>
                            {Object.keys(this.state.rates).map(rate =>
                                <option value={rate}>{rate}</option>
                            )}
                        </select>
                    </label>
                    <button type="submit" id="search-button"></button>
                </form>
                result: {this.state.result}
                date: {this.state.date}
                base: {this.state.base}
                <div class="flex-container">
                    {Object.keys(this.state.rates).map(rate =>
                        <div id="img">
                            <p> {rate}: {this.state.rates[rate]}</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Currency;
