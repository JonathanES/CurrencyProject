import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

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
            rates: this.props.rates,
            week: [],
            month: [],
            year: [],
            years: []
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
        const exchange = "USD";
        axios.get('/api/graph', {
            params: { base: base, exchange: exchange }
        }).then(currency => this.setState({ week: currency.data.week, month: currency.data.month, year: currency.data.year, years: currency.data.years }, () => console.log('Currency fetched...', currency)));
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
                <LineChart width={1200} height={300} data={this.state.week}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="rate" stroke="#82ca9d" />
                </LineChart>
                <LineChart width={1200} height={300} data={this.state.month}
                    margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                    <XAxis dataKey="date" interval={0}/>
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="rate" stroke="#82ca9d" />
                </LineChart>
                <LineChart width={1200} height={300} data={this.state.year}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="rate" stroke="#82ca9d" />
                </LineChart>
                <LineChart width={1200} height={300} data={this.state.years}
                    margin={{ top: 3, right: 30, left: 20, bottom: 5}}>
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