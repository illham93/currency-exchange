import React from "react";
import CurrencyDropDown from "./CurrencyDropDown";

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
            error: '',
            countryCode: '',
            results: [],
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (value) => {
        this.setState({ countryCode: value });
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

    render() {
        const { results, error } = this.state;

        return (
            <div className="container text-center">
                <h3>Currency Exchange Rates</h3>
                <p>Select base currency:</p>
                <form onSubmit={this.handleSubmit}>
                    <CurrencyDropDown onChange={this.handleChange} />
                    <button type="submit">Go</button>
                </form>
                <table>
                    <thead>
                        <tr>
                            <td>Currency</td>
                            <td>Rate</td>
                        </tr>
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
            </div>
        )
    }
}

export default Home;