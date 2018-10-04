import React, { Component } from 'react';
import './GastoForm.css';

class GastoForm extends Component {
    constructor() {
        super();
        this.addGasto = this.addGasto.bind(this);
        this.numberInput = React.createRef();
    }
    
    addGasto() {
        let gastos = {
            gasto_date: this.props.today,
            gasto_tipo: this.selectInput.value,
            gasto_monto: this.numberInput.current.value
        }
        this.props.addGasto(gastos);
    }

    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 mb-2">
                        <div className="Number">
                            <input
                                ref={this.numberInput}
                                defaultValue={0}
                                type="number"/>
                        </div>
                    </div>
                    <div className="col-sm-6 mb-2">
                        <div className="Select">
                            <select
                                ref={selectref => this.selectInput = selectref}
                            >
                                {
                                    this.props.tipogastos.map(tipogasto => {
                                        return(
                                            <option key={tipogasto.tipogastos_id} value={tipogasto.tipogastos_name}>{tipogasto.tipogastos_name}</option>
                                        );
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </div>
                <div className="Button">
                    <button
                        onClick={this.addGasto}
                    >
                        Guardar
                    </button>
                </div>
            </div>
        )
    }
}

export default GastoForm;