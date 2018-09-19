import React, { Component } from 'react';
import './GastoForm.css';
// import Date from '../../presentational/Date/Date';
// import Select from '../../presentational/Select/Select';
// import Button from '../../presentational/Button/Button';

class GastoForm extends Component {
    constructor() {
        super();
        this.addGasto = this.addGasto.bind(this);
        this.numberInput = React.createRef();
    }
    
    addGasto() {
        let gastos = {
            // gasto_date: this.getToday(),
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
                                // ref={numberref => this.numberInput = numberref}
                                ref={this.numberInput}
                                defaultValue={0}
                                type="number"/>
                        </div>
                        {/* <div className="Date">
                            <input
                                type="date"
                                ref={dateref => this.dateInput = dateref}
                            />
                        </div> */}
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