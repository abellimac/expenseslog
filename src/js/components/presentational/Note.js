import React, { Component } from 'react';
import './Note.css';
import './Note';

class Note extends Component {
	constructor(props) {
		super(props);
		this. noteContent = props.noteContent;
		this. noteId = props.noteId;
	}

	handleRemove(id) {
		this.props.removeNote(id);
	}

	render() {
		return(
			<div className="Note">
				<span
					onClick={() => this.handleRemove(this.noteId)}
				>&times;</span>
				<p>{this.noteId} - {this.noteContent}</p>
			</div>
		)
	}
}

export default Note;