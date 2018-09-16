import React, { Component } from 'react';
import Input from '../presentational/Input'

class FormContainer extends Component {
	constructor() {
		super();
		this.state = {
			seo_title: "Section of title"
		};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.setState({
			[e.target.id]: e.target.value
		});
	}

	render() {
		return(
			<form id="formulario">
				<Input
					id="seo_title"
					type="text"
					value={this.state.seo_title}
					label=""
					text={this.state.seo_title}
					handleChange={this.handleChange}
				/>
			</form>
		)
	}
}

export default FormContainer;