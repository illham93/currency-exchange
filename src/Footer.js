import React from "react";

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="text-center">
                <span>Made by Devon Hamill</span> | <span>Altcademy</span>
            </div>
        )
    }
}

export default Footer;