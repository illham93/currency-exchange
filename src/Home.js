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
                <h1><strong>Currency Exchange Rates</strong></h1>
                <p>Select base currency:</p>
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <form onSubmit={this.handleSubmit}>
                            <div className="input-group justify-content-center">
                                <CurrencyDropDown onChange={this.handleChange} />
                                <div className="input-group-append">
                                    <button className="btn btn-outline-primary" type="submit">Go</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-md-6 offset-md-3">
                        <table className="table table-striped table-bordered">
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
                </div>
                
            </div>
        )
    }
}

export default Home;