import React from "react";

class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="text-center">
                <span>Exchange Rates</span> | <span>Converter</span>
            </div>
        )
    }
}

export default Navbar;