import React, { Component } from 'react';
import './NoteForm.css';

class NoteForm extends Component {
	constructor() {
		super();
	}

	addNote() {
		this.props.addNote(this.textInput.value);
		this.textInput.value = '';
		this.textInput.focus();
	}

	render() {
		return(
			<div className="NoteForm">
				<input
					ref={inputref => this.textInput = inputref}
					type="text" />
				<button
					onClick={() => this.addNote()}
				>
					Add note
				</button>
			</div>
		)
	}
}

export default NoteForm;