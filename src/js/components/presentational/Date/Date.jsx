import React, { Component } from 'react';
import './Date.css';

class Date extends Component {
    render() {
        return(
            <div className="Date">
                <input type="date" />
            </div>
        )
    }
}

export default Date;