import React from "react";
import CurrencyDropDown from "./CurrencyDropDown";
import Chart from "chart.js";

class Converter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            amount1: null,
            amount2: null,
            currency1: '',
            currency2: '',
            error: '',
        };

        this.chartRef = React.createRef();
    }

    getHistoricalRates = (base, quote) => {
        const endDate = new Date().toISOString().split('T')[0];
        const startDate = new Date((new Date).getTime() - (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
        fetch(`https://api.frankfurter.app/${startDate}..${endDate}?from=${base}&to=${quote}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Request denied');
            })
            .then(data => {
                if (data.error) {
                throw new Error(data.error);
                }
                const chartLabels = Object.keys(data.rates);
                const chartData = Object.values(data.rates).map(rate => rate[quote]);
                const chartLabel = `${base}/${quote}`;
                this.buildChart(chartLabels, chartData, chartLabel);
            })
            .catch(error => console.error(error.message));
    }

    buildChart = (labels, data, label) => {
        const chartRef = this.chartRef.current.getContext("2d");
        if (typeof this.chart !== "undefined") {
            this.chart.destroy();
        }
        this.chart = new Chart(this.chartRef.current.getContext("2d"), {
            type: 'line',
            data: {
                labels,
                datasets: [
                    {
                        label: label,
                        data,
                        fill: false,
                        tension: 0,
                    }
                ]
            },
            options: {
                responsive: true,
            }
        })
    }


    handleChange = (currency, value) => {
        console.log('changed');
        this.setState({ [currency]: value }, () => {
            if (currency == 'currency1') {
                this.calculate(currency, this.state.amount1);
            } else {
                this.calculate(currency, this.state.amount2);
            }
        });
    }

    calculate = (currency, value) => {
        const { currency1, currency2 } = this.state;
        // If the first input is changed, then we calculate the second input, and vice versa
        if (currency == 'currency1') {
            this.setState({ amount1: value });
            fetch(`https://api.frankfurter.app/latest?amount=${value}&from=${currency1}&to=${currency2}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Request denied');
            })
            .then(data => {
                console.log(data);
                const currencyCode = this.state.currency2;
                this.setState({ amount2: data.rates[currencyCode] }, () => {
                    console.log(this.state.amount2);
                });
            })
            .catch(error => {
                console.log(error);
                this.setState({ error: 'Error fetching currencies'});
            })
        } else {
            this.setState({ amount2: value });
            fetch(`https://api.frankfurter.app/latest?amount=${value}&from=${currency2}&to=${currency1}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Request denied');
            })
            .then(data => {
                console.log(data);
                const currencyCode = this.state.currency1;
                this.setState({ amount1: data.rates[currencyCode] }, () => {
                    console.log(this.state.amount1);
                });
            })
            .catch(error => {
                console.log(error);
                this.setState({ error: 'Error fetching currencies'});
            })
        }
        
    }

    componentDidUpdate(prevProps, prevState) {
        const { amount1, amount2, currency1, currency2 } = this.state;

        if (prevState.amount1 !== amount1) {
            document.getElementById("amount1").value = amount1 || '';
        } else if (prevState.amount2 !== amount2) {
            document.getElementById("amount2").value = amount2 || '';
        }
        
        if (prevState.currency1 !== currency1 || prevState.currency2 !== currency2) {
            this.getHistoricalRates(currency1, currency2);
        }             
    }

    render() {
        const {currency1, currency2} = this.state;

        return (
            <div className="container text-center">
                <h1><strong>Currency Converter</strong></h1>
                <p className="mb-4">Select two currencies to make a conversion:</p>
                <form>
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-4 d-flex flex-column align-items-center">
                            <CurrencyDropDown id="currency1" selectedCurrency={currency2} onChange={(value) => this.handleChange('currency1', value)} />
                            <input id="amount1" className="form-control mt-2" onChange={(e) => this.calculate('currency1', e.target.value)} type="number"></input>
                        </div>
                        <div id="equals" className="col-12 col-md-4 d-flex justify-content-center align-items-center">
                            <i className="fa-regular fa-equals"></i>
                        </div>
                        <div className="col-12 col-md-4 d-flex flex-column align-items-center">
                            <CurrencyDropDown id="currency2" selectedCurrency={currency1} onChange={(value) => this.handleChange('currency2', value)} />
                            <input id="amount2" className="form-control mt-2" onChange={(e) => this.calculate('currency2', e.target.value)} type="number"></input>
                        </div>
                    </div>
                </form>
                <canvas ref={this.chartRef} />
            </div>

        )
    }
}

export default Converter;