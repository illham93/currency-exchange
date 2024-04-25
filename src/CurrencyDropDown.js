import React from "react";

class CurrencyDropDown extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currencies: [],
            error: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
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
        return (
            <select name="currencies" onChange={this.handleChange}>
                <option disabled selected value>--</option>
                {(() => {
                    if (error) {
                        return <option>{error}</option>;
                    }
                    if (currencies.length === 0) {
                        return <option>Loading...</option>;
                    }
                    return currencies.map((currency) => {
                        return <option key={currency} value={currency}>{currency}</option>;
                    })
                })()}
            </select>
        )
    }
}

export default CurrencyDropDown;