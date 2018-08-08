import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
    { date: 2019, symbol: 'USD', rate: 2 },
    { date: 2018, symbol: 'USD', rate: 1.2 },
];

class Graph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            base: "",
            exchange: "",
            data: [],
            rates: this.props.rates
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.rates !== this.props.rates) {
            this.setState({ rates: this.props.rates });
        }
    }

    componentDidMount() {
        const url = "/api/graph";
        const base = "EUR";
        const newBase = "USD";
        fetch(url, { base: base, newBase: newBase });
    }

    handleChange(event) {
        switch (event.target.id) {
            case "base":
                this.setState({ base: event.target.value });
                break;
            case "exchange":
                this.setState({ exchange: event.target.value });
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
                exchange: this.state.exchange,
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
            <div>
                <form className="form-search" onSubmit={this.handleSubmit}>
                    <label>
                        <select id="base" value={this.state.base} onChange={this.handleChange}>
                            {Object.keys(this.state.rates).map(rate =>
                                <option value={rate}>{rate}</option>
                            )}
                        </select>
                        <select id="exchange" value={this.state.exchange} onChange={this.handleChange}>
                            {Object.keys(this.state.rates).map(rate =>
                                <option value={rate}>{rate}</option>
                            )}
                        </select>
                    </label>
                    <button type="submit" id="search-button"></button>
                </form>
                <LineChart width={600} height={300} data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="rate" stroke="#82ca9d" />
                </LineChart>
            </div>
        );
    }
}

export default Graph;