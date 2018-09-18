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
        this.getToday = this.getToday.bind(this);
    }
    
    addGasto() {
        // console.log(this.selectInput.value);
        // console.log(this.dateInput.value);
        // console.log(this.numberInput.current.value);


        let gastos = {
            gasto_date: this.getToday(),
            gasto_tipo: this.selectInput.value,
            gasto_monto: this.numberInput.current.value
        }
        this.props.addGasto(gastos);
    }

    getToday() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        
        if(dd<10) {
            dd = '0'+dd
        } 
        
        if(mm<10) {
            mm = '0'+mm
        } 
        
        today = mm + '/' + dd + '/' + yyyy;
        return today;
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
                                <option value="Desayuno">Desayuno</option>
                                <option value="Almuerzo">Almuerzo</option>
                                <option value="Cena">Cena</option>
                            </select>
                        </div>
                    </div>
                    {/* <div className="col-sm-12 mb-2">

                    </div> */}
                </div>
                <div className="Button">
                    <button
                        onClick={this.addGasto}
                    >
                        Guardar
                    </button>
                </div>
                {/* <Button
                    addGasto={this.props.addGasto}
                /> */}
            </div>
        )
    }
}

export default GastoForm;