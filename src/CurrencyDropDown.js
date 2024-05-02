import React from "react";

class CurrencyDropDown extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currencies: [],
            error: ''
        };
        this.dropDownChange = this.dropDownChange.bind(this);
    }

    dropDownChange(event) {
        const { onChange } = this.props;
        onChange(event.target.value);
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
        const { currencies, error } = this.state;
        const { selectedCurrency } = this.props;
        return (
                <select className="form-select" name="currencies" onChange={this.dropDownChange}>
                    <option disabled selected value>--</option>
                    {(() => {
                        if (error) {
                            return <option>{error}</option>;
                        }
                        if (currencies.length === 0) {
                            return <option>Loading...</option>;
                        }
                        return currencies.filter(currency => currency !== selectedCurrency).map((currency) => {
                            return <option key={currency} value={currency}>{currency}</option>;
                        })
                    })()}
                </select>
        )
    }
}

export default CurrencyDropDown;