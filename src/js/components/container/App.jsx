import React, { Component } from 'react';

import firebase from 'firebase';
import { DB_CONFIG } from '../../../config/config';
import Note from '../presentational/Note';
import NoteForm from '../presentational/NoteForm';
import './App.css';
import Table from './Table/Table';
import GastoForm from './GastoForm/GastoForm';
import { constants } from 'os';


class App extends Component {
	constructor() {
		super();
		this.state = {
			gastos:[]
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
	}

	componentDidMount() {
		// const { notes } = this.state;
		const { gastos } = this.state;
		this.db.on("child_added", snap => {
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

	render() {
		return(
			<div className="notesContainer">
				<div className="notesHeader">
					<h1>Registro de Gastos</h1>
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