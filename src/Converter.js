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
        }
    }

    handleChange = (currency, value) => {
        this.setState({ [currency]: value });
    }

    calculate = (value) => {
        const { currency1, currency2 } = this.state;
        
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
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.amount2 !== this.state.amount2) {
            document.getElementById("amount2").value = this.state.amount2;
        }
    }

    render() {
        return (
            <div class="container text-center">
                <h3>Converter</h3>
                <p>Select two currencies to make a conversion:</p>
                <form>
                    <CurrencyDropDown id="currency1" onChange={(value) => this.handleChange('currency1', value)} />
                    <CurrencyDropDown id="currency2" onChange={(value) => this.handleChange('currency2', value)} />
                    <br></br>
                    <input id="amount1" onChange={(e) => this.calculate(e.target.value)} type="number"></input>
                    <input id="amount2" type="number"></input>
                </form>
            </div>

        )
    }
}

export default Converter;