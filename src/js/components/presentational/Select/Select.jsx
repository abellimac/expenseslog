import React, { Component } from 'react';
import './Select.css';

class Select extends Component {
    render() {
        return (
            <div className="Select">
                <select>
                    <option value="Desayuno">Desayuno</option>
                    <option value="Almuerzo">Almuerzo</option>
                    <option value="Cena">Cena</option>
                </select>
            </div>
        )
    }
}

export default Select;