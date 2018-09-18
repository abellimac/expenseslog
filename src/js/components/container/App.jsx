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
			open: true,
			tipogastos: [
				{
					tipogastos_id: 1,
					tipogastos_name: "Almuerzo1"
				},
				{
					tipogastos_id: 2,
					tipogastos_name: "desayouno1"
				},
			]
			// notes: [
				// {noteId: 1, noteContent: 'nota 1'},
				// {noteId: 2, noteContent: 'nota 2'}
			// ]
		};
		this.app = firebase.initializeApp(DB_CONFIG);
		// this.db = this.app.database().ref().child('notes');
		this.db = this.app.database().ref().child('gastos');
		// this.addNote = this.addNote.bind(this);
		// this.removeNote = this.removeNote.bind(this);

		this.addGasto = this.addGasto.bind(this);
		this.removeGasto = this.removeGasto.bind(this);
		this.onOpenModal = this.onOpenModal.bind(this);
		this.onCloseModal = this.onCloseModal.bind(this);

		this.db = this.app.database().ref().child('tipogastos');
		this.addTipoGasto = this.addTipoGasto.bind(this);
	}
	
	onOpenModal() {
		this.setState({ open: true });
	  };
	 
	onCloseModal() {
		this.setState({ open: false });
	};

	componentDidMount() {
		// const { notes } = this.state;
		const { gastos } = this.state;
		this.db.on("child_added", snap => {
			// console.log(snap.val());
			gastos.push({
				gasto_id: snap.key,
				gasto_date: snap.val().gasto_date,
				gasto_monto: snap.val().gasto_monto,
				gasto_tipo: snap.val().gasto_tipo
			});
			this.setState({ gastos });
		});
		// this.db.on('child_added', snap => {
		// 	// console.log( snap.key );
		// 	// console.log( snap.val().noteContent );
		// 	notes.push({
		// 		noteId: snap.key,
		// 		noteContent: snap.val().noteContent
		// 	});
		// 	this.setState({ notes });
		// });
		this.db.on('child_removed', snap => {
			// console.log(gastos);
			for (let i = 0; i < gastos.length; i++) {
				// console.log(gastos[i].gasto_id);
				if (gastos[i].gasto_id == snap.key) {
					gastos.splice(i, 1);
				}
			}
			this.setState({ gastos });
		});
		// this.db.on('child_removed', snap => {
		// 	for(let i = 0; i < notes.length; i++) {
		// 		if (notes[i].noteId == snap.key) {
		// 			notes.splice(i, 1);
		// 			this.setState({ notes });
		// 		}
		// 	}
		// });

	}

	// removeNote(noteId) {
	// 	const response = window.confirm('Estas seguro de Eliminar');
	// 	if (response) {
	// 		this.db.child(noteId).remove();
	// 	}
	// 	return
	// }

	removeGasto(gasto_id) {
		const response = window.confirm('Estas seguro de eliminar este gasto');
		if(response) {
			this.db.child(gasto_id).remove();
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
		this.db.push().set(
			{
				gasto_tipo: gasto_tipo.gasto_tipo,
				gasto_date: gasto_tipo.gasto_date,
				gasto_monto: gasto_tipo.gasto_monto
			}
		);
	}

	addTipoGasto() {
		this.db.push().set({
			tipogastos_name: this.inputTipoGasto.value
		});
	}

	render() {
		const { open } = this.state;
		return(
			
			<div className="notesContainer">
				<div className="notesHeader">
					<h1>Registro de Gastos</h1>
					<div>
						<button className="btn-configuration" onClick={this.onOpenModal}>
							<Image1 width={35} height={35}/>
						</button>
						{/* <button onClick={this.onOpenModal}>Open modal</button> */}
						<Modal open={open} onClose={this.onCloseModal} center>
							<div className="configuration">
								<h2>Simple centered modal</h2>
								<div className="configuration-body">
									<div className="tipogasto">
										<table className="table">
											<tbody>
												{this.state.tipogastos.map(tipogasto => {
													
													return(
														<tr key={tipogasto.tipogastos_id}>
															<td>{tipogasto.tipogastos_name}</td>
														</tr>
													)
												})}
											</tbody>
										</table>

										<div className="col-md-6 mb-2">
											<div className="Text">
												<input
													ref={inputref => this.inputTipoGasto = inputref}
													type="text"
												/>
											</div>
										</div>
										<div className="col-md-6">
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
				{/* <div className="notesBody">
					<ul>
						{
							this.state.notes.map(note => {
								return(
									<Note
										noteContent={note.noteContent}
										noteId={note.noteId}
										removeNote={this.removeNote}
										key={note.noteId}
									/>
									// <li key={note.noteId}>{note.noteContent}</li>
								)
							})
						}
					</ul>
				</div> */}
				<div className="notesFooter">
					{/* <NoteForm
						addNote={this.addNote}
					/> */}
					<GastoForm
						addGasto={this.addGasto}
					/>
				</div>
			</div>
		);
	}
}

export default App;