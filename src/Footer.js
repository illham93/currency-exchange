import React from "react";

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="text-center footer bg-white text-primary align-content-center">
                <strong><span className="d-none d-sm-inline">Made by </span><span><a target="blank" href="https://euphonious-toffee-e8a2fd.netlify.app/">Devon Hamill</a></span> | <span><a target="blank" href="https://www.altcademy.com/">Altcademy</a></span></strong>
            </div>
        )
    }
}

export default Footer;