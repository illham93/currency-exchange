import React from "react";
import {Link} from "react-router-dom";

class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav class="navbar navbar-dark bg-white mb-5">
                <ul className="nav navbar-expand-md justify-content-center">
                    <li className="nav-item">
                        <Link className="nav-link mx-2 text-primary" to="/currency-exchange/"><strong>Home</strong></Link>
                    </li>    
                    <li className="nav-item">
                        <Link className="nav-link mx-2 text-primary" to="/currency-exchange/converter"><strong>Converter</strong></Link>
                    </li>
                </ul>
            </nav>
            
        );
    }
}

export default Navbar;