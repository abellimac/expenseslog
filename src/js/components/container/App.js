import React, { Component } from 'react';

import firebase from 'firebase';
import { DB_CONFIG } from '../../../config/config';
import Note from '../presentational/Note.jsx';
import NoteForm from '../presentational/NoteForm.js';
import './App.css';


class App extends Component {
	constructor() {
		super();
		this.state = {
			notes: [
				// {noteId: 1, noteContent: 'nota 1'},
				// {noteId: 2, noteContent: 'nota 2'}
			]
		};
		this.app = firebase.initializeApp(DB_CONFIG);
		this.db = this.app.database().ref().child('notes');
		this.addNote = this.addNote.bind(this);

		this.removeNote = this.removeNote.bind(this);
	}

	componentDidMount() {
		const { notes } = this.state;
		this.db.on('child_added', snap => {
			// console.log( snap.key );
			// console.log( snap.val().noteContent );
			notes.push({
				noteId: snap.key,
				noteContent: snap.val().noteContent
			});
			this.setState({ notes });
		});

		this.db.on('child_removed', snap => {
			for(let i = 0; i < notes.length; i++) {
				if (notes[i].noteId == snap.key) {
					notes.splice(i, 1);
					this.setState({ notes });
				}
			}
		});

	}

	removeNote(noteId) {
		const response = window.confirm('Estas seguro de Eliminar');
		if (response) {
			this.db.child(noteId).remove();
		}
		return
	}

	addNote(note) {
		// let { notes } = this.state;
		// notes.push({
		// 	noteId: notes.length + 1,
		// 	noteContent: note
		// });
		// this.setState({ notes });
		this.db.push().set({noteContent: note});
	}

	render() {
		return(
			<div className="notesContainer">
				<div className="notesHeader">
					<h1>React y Firebase App</h1>
				</div>
				<div className="notesBody">
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
				</div>
				<div className="notesFooter">
					<NoteForm
						addNote={this.addNote}
					/>
				</div>
			</div>
		);
	}
}

export default App;