import React,{ Component } from 'react';
import './Table.css';

class Table extends Component {
    constructor() {
        super();
        // console.log(props.gastos);
        this.removeGasto = this.removeGasto.bind(this);
    }
    
    removeGasto(gasto_id) {
        // console.log(gasto_id);
        this.props.removeGasto(gasto_id);
    }

    render() {
        return(
        <div className="divTable">
            <div className="divTableBody">
                <div className="divTableRow">
                    <div className="divTableCell thead">Tipo de Gasto</div>
                    <div className="divTableCell thead">Monto de Gasto</div>
                    {/* <div className="divTableCell thead"></div> */}
                </div>
                {
                    this.props.gastos.map(gasto => {
                        return (
                            <div key={gasto.gasto_id} className="divTableRow">
                                <div className="divTableCell">{gasto.gasto_tipo}</div>
                                <div className="divTableCell">
                                    {gasto.gasto_monto}
                                    <button
                                        onClick={() => this.removeGasto(gasto.gasto_id)}
                                        type="button"
                                        className="btn btn-circle float-right"
                                    >
                                        &times;
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
        );
    }
}

export default Table;