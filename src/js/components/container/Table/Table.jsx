import React,{ Component } from 'react';
import './Table.css';

class Table extends Component {
    constructor() {
        super();
        // console.log(props.gastos);
    }
    
    render() {
        return(
        <div className="divTable">
            <div className="divTableBody">
                <div className="divTableRow">
                    <div className="divTableCell thead">Tipo de Gasto</div>
                    <div className="divTableCell thead">Monto de Gasto</div>
                </div>
                    {
                        this.props.gastos.map(gasto => {
                            return (
                                <div key={gasto.noteId} className="divTableRow">
                                    <div className="divTableCell">{gasto.noteId}</div>
                                    <div className="divTableCell">{gasto.noteContent}</div>
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