import React from "react";

class Home extends React.Component {
    constructor(props) {
        super(props);
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
        }).catch((error) => {
            console.log(error);
        })
    }


    render() {
        return (
            <div class="container text-center">
                <h3>Currency Exchange Rates</h3>
                <p>Selecct base currency:</p>
                <select name="currencies"></select>
            </div>
        )
    }
}

export default Home;