import React from "react";
import CurrencyDropDown from "./CurrencyDropDown";

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
        const { amount1, amount2 } = this.state;

        if (prevState.amount1 !== amount1) {
            document.getElementById("amount1").value = amount1 || '';
        } else if (prevState.amount2 !== amount2) {
            document.getElementById("amount2").value = amount2 || '';
        }
    }

    render() {
        const {currency1, currency2} = this.state;

        return (
            <div className="container text-center">
                <h1><strong>Currency Converter</strong></h1>
                <p>Select two currencies to make a conversion:</p>
                <form>
                    <CurrencyDropDown id="currency1" selectedCurrency={currency2} onChange={(value) => this.handleChange('currency1', value)} />
                    <CurrencyDropDown id="currency2" selectedCurrency={currency1} onChange={(value) => this.handleChange('currency2', value)} />
                    <br></br>
                    <input id="amount1" onChange={(e) => this.calculate('currency1', e.target.value)} type="number"></input>
                    <input id="amount2" onChange={(e) => this.calculate('currency2', e.target.value)} type="number"></input>
                </form>
            </div>

        )
    }
}

export default Converter;