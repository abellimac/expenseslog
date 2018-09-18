import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
    constructor() {
        super();
        this.addGasto = this.addGasto.bind(this);
    }

    addGasto() {
        this.props.addGasto('esto es mi gasto');
    }

    render() {
        return(
            <div className="Button">
                <button
                    onClick={this.addGasto}
                >
                    Guardar
                </button>
            </div>
        )
    }
}

export default Button;