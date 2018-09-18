import React, { Component } from 'react';
import Date from '../../presentational/Date/Date';
import Select from '../../presentational/Select/Select';
import Button from '../../presentational/Button/Button';

class GastoForm extends Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 mb-2">
                        <Date />
                    </div>
                    <div className="col-sm-6 mb-2">
                        <Select />
                    </div>
                </div>
                <Button
                    addGasto={this.props.addGasto}
                />
            </div>
        )
    }
}

export default GastoForm;