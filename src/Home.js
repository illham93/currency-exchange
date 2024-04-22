import React from "react";

const CurrencyList = (props) => {
    const {
        code,
    } = props.currency;

    return (
        <option value={code}>{code}</option>
    )
}

const CurrencyTable = (props) => {
    const {
        currency,
        rate,
    } = props;

    return (
        <tr>
            <td>{currency}</td>
            <td>{rate}</td>
        </tr>
    )
}

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            baseCurrency: '',
            currencies: [],
            error: '',
            countryCode: '',
            results: [],
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ countryCode: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        let { countryCode } = this.state;
        if (!countryCode) {
            return;
        }

        fetch(`https://api.frankfurter.app/latest?from=${countryCode}`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Request denied');
        })
        .then((data) => {
            console.log(data);
            this.setState({ results: Object.entries(data.rates), error: ''});
        })
        .catch((error) => {
            console.log(error);
            this.setState({ error: 'Error fetching currency rates' });
        })
    }

    componentDidMount () {
        fetch("https://api.frankfurter.app/currencies")
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Request denied');
        })
        .then((data) => {
            console.log(data);
            this.setState({ currencies: Object.keys(data), error: '' });
        }).catch((error) => {
            console.log(error);
            this.setState({ error: 'Error fetching currencies' });
        })
    }


    render() {
        const { currencies, countryCode, results, error } = this.state;

        return (
            <div class="container text-center">
                <h3>Currency Exchange Rates</h3>
                <p>Select base currency:</p>
                <form>
                    <select name="currencies" onChange={this.handleChange}>
                        <option disabled selected value>--</option>
                        {(() => {
                            if (error) {
                                return error;
                            }
                            if (currencies.length === 0) {
                                return <option value="">Loading...</option>;
                            }
                            return currencies.map((currency) => {
                                return <CurrencyList key={currency} currency={{ code: currency }} />;
                            })
                        })()}
                    </select>
                    <button onClick={this.handleSubmit} type="submit">Go</button>
                    <table>
                        <thead>
                            <td>Currency</td>
                            <td>Rate</td>
                        </thead>
                        <tbody>
                            {(() => {
                                if (error) {
                                    return <tr><td>{error}</td></tr>;
                                }
                                return results.map(([currency, rate]) => {
                                    return <CurrencyTable key={currency} currency={currency} rate={rate} />;
                                })
                            })()}
                        </tbody>
                    </table>
                </form> 
            </div>
        )
    }
}

export default Home;