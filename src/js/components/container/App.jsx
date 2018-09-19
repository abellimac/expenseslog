import React, { Component } from 'react';

import firebase from 'firebase';
import { DB_CONFIG } from '../../../config/config';
import Note from '../presentational/Note';
import NoteForm from '../presentational/NoteForm';
import './App.css';
import Table from './Table/Table';
import GastoForm from './GastoForm/GastoForm';
import { constants } from 'os';
import Modal from 'react-responsive-modal';
// import logo from '../../../svg/configuration.svg';
import Image1 from 'react-svg-loader!../../../svg/configuration.svg';


class App extends Component {
	constructor() {
		super();
		this.state = {
			gastos:[],
			open: false,
			tipogastos: [],
			month: (new Date().getMonth()),
			today: this.getToday(new Date()),
			totalGastado: 0
		};
		// this.db = this.app.database().ref().child('notes');
		// this.addNote = this.addNote.bind(this);
		// this.removeNote = this.removeNote.bind(this);
		this.app = firebase.initializeApp(DB_CONFIG);
		
		this.addGasto = this.addGasto.bind(this);
		this.removeGasto = this.removeGasto.bind(this);
		this.onOpenModal = this.onOpenModal.bind(this);
		this.onCloseModal = this.onCloseModal.bind(this);

		this.db_gastos = this.app.database().ref().child('gastos');
		this.db_tipogastos = this.app.database().ref().child('tipogastos');

		this.addTipoGasto = this.addTipoGasto.bind(this);
		this.removeTipoGasto = this.removeTipoGasto.bind(this);
		this.getToday = this.getToday.bind(this);
	}
	
	onOpenModal() {
		this.setState({ open: true });
	  };

	onCloseModal() {
		this.setState({ open: false });
	};

	componentDidMount() {
		const { gastos, tipogastos } = this.state;
		this.db_gastos.on("child_added", snap => {
			if(this.state.today == this.getToday(new Date(snap.val().gasto_date)))
			{
				gastos.push({
					gasto_id: snap.key,
					gasto_date: snap.val().gasto_date,
					gasto_monto: parseInt(snap.val().gasto_monto),
					gasto_tipo: snap.val().gasto_tipo
				});
				this.setState({
					totalGastado: (this.state.totalGastado + parseInt(snap.val().gasto_monto))
				})
			}
			this.setState({ gastos });
		});

		this.db_gastos.on('child_removed', snap => {
			for (let i = 0; i < gastos.length; i++) {
				if (gastos[i].gasto_id == snap.key) {
					gastos.splice(i, 1);
				}
			}
			this.setState({ gastos });
		});

		// Tipo de datos
		this.db_tipogastos.on("child_added", snap => {
			tipogastos.push({
				tipogastos_id: snap.key,
				tipogastos_name: snap.val().tipogastos_name
			});
			this.setState({ tipogastos });
		});

		this.db_tipogastos.on("child_removed", snap => {
			for(let i =0; i < tipogastos.length; i++) {
				if (tipogastos[i].tipogastos_id == snap.key) {
					tipogastos.splice(i, 1);
				}
			}
			this.setState({ tipogastos });
		});
	}

	// removeNote(noteId) {
	// 	const response = window.confirm('Estas seguro de Eliminar');
	// 	if (response) {
	// 		this.db.child(noteId).remove();
	// 	}
	// 	return
	// }

	removeGasto(gasto_id) {
		const response = window.confirm('¿Estás seguro de eliminar este gasto?');
		if(response) {
			this.db_gastos.child(gasto_id).remove();
		}
	}

	// addNote(gasto_tipo) {
	// 	// let { notes } = this.state;
	// 	// notes.push({
	// 	// 	noteId: notes.length + 1,
	// 	// 	noteContent: note
	// 	// });
	// 	// this.setState({ notes });
	// 	this.db.push().set({gasto_tipo: gasto_tipo});
	// }

	addGasto(gasto_tipo) {
		this.db_gastos.push().set(
			{
				gasto_tipo: gasto_tipo.gasto_tipo,
				gasto_date: gasto_tipo.gasto_date,
				gasto_monto: gasto_tipo.gasto_monto
			}
		);
	}

	addTipoGasto() {
		this.db_tipogastos.push().set({
			tipogastos_name: this.inputTipoGasto.value
		});
		this.inputTipoGasto.value = '';
		this.inputTipoGasto.focus();
	}

	removeTipoGasto(tipogastos_id) {
		const response = window.confirm('¿Estás seguro de eliminar este Tipo de gasto?');
		if (response) {
			this.db_tipogastos.child(tipogastos_id).remove();
		}
	}

	getToday(date) {
        var today = date;
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
		const { open } = this.state;
		return(
			
			<div className="notesContainer">
				<div className="notesHeader">
					<h2>Registro de Gastos</h2>
					<div className="text-justify">
						Total Gastado {this.state.totalGastado}
					</div>
					<div>
						<button className="btn-configuration" onClick={this.onOpenModal}>
							<Image1 width={35} height={35}/>
						</button>
						<Modal open={open} onClose={this.onCloseModal} center>
							<div className="configuration">
								<h3>Lista de Gastos</h3>
								<div className="configuration-body">
									<div className="tipogasto">
										<table className="table">
											<tbody>
												{this.state.tipogastos.map(tipogasto => {
													return(
														<tr key={tipogasto.tipogastos_id}>
															<td>
																{tipogasto.tipogastos_name}
																<button
																	onClick={() => this.removeTipoGasto(tipogasto.tipogastos_id)}
																	type="button"
																	className="btn btn-circle float-right"
																>
																	&times;
																</button>
															</td>
														</tr>
													)
												})}
											</tbody>
										</table>

										<div className="col-md-12 mb-2">
											<div className="Text">
												<input
													ref={inputref => this.inputTipoGasto = inputref}
													type="text"
												/>
											</div>
										</div>
										<div className="col-md-12">
											<div className="Button">
												<button
													onClick={this.addTipoGasto}
												>
													Guardar
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</Modal>
					</div>
				</div>
				<div className="gastos-container notesBody">
					<div className="row">
						<Table
							gastos={this.state.gastos}
							removeGasto={this.removeGasto}
						/>
					</div>
				</div>
				<div className="notesFooter">
					<GastoForm
						addGasto={this.addGasto}
						tipogastos={this.state.tipogastos}
						today={this.state.today}
					/>
				</div>
			</div>
		);
	}
}

export default App;