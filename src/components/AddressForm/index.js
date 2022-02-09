import React from "react";
import { Field, Form } from 'react-final-form';

import './AddressForm.css';

class AddressForm extends React.Component {
	renderError = ({touched, error}) => {
		if (touched && error) {
		  return (
			<div className="field-error">
				{error}
			</div>
		  );
		}
	  };

	renderInput = ({label, input, required, maxLength, meta}) => {
		return (
			<div className={`form-field ${required ? 'required': undefined}`}>
				<label htmlFor={input.name}>{label}</label>
				<div className="input-container">
					<span className="remaining-chars">{maxLength - input.value.length}</span>
					<input 
						type="text"
						id={input.name} 
						{...input}
						required={required}
						maxLength={maxLength}
					/>
				</div>
				{this.renderError(meta)}
			</div>
		)
	}

	required(value, allValues, meta) {
		switch (meta.name) {
			case 'address[line 1]':
				return (value ? undefined : 'Please enter your address.');
			case 'phone':
				return (value ? undefined : 'Please enter your phone number.');
			case 'address[city]':
			case 'address[state]':
			case 'address[pincode]':
				let fieldName = meta.name.replace('address[','').replace(']','');
				return (value ? undefined : `Please enter your ${fieldName}.`);
			default:
				return (value ? undefined : `Please enter your ${meta.name}`);
		}
    }

	isPhoneValid(value) {
		return (
			/^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/.test(value) ? 
			undefined : 
			'Please enter a valid Indian phone number. Special characters are not allowed, except for + at the beginning, or - after the country code'
		);
	}

	composeValidators = (...validators) => (value, allValues, meta) =>
		validators.reduce((error, validator) => error || validator(value, allValues, meta), undefined);

	renderForm = ({ handleSubmit }) => {
		return (
			<form id="address-form" onSubmit={ handleSubmit }>
				<Field 
					name="name" 
					component={this.renderInput}
					label="Name" 
					required 
					maxLength={60}
					validate={this.required}
					validateFields={[]}
				/>
				<Field 
					name="address[line 1]" 
					component={this.renderInput} 
					label="Address Line 1" 
					required 
					maxLength={150}
					validate={this.required}
					validateFields={[]}
				/>
				<Field name="address[line 2]" component={this.renderInput} label="Address Line 2" maxLength={150}/>
				<Field 
					name="address[city]" 
					component={this.renderInput} 
					label="Town/City" 
					required 
					maxLength={20}
					validate={this.required}
					validateFields={[]}
				/>
				<Field 
					name="address[state]" 
					component={this.renderInput} 
					label="State" 
					required 
					maxLength={20}
					validate={this.required}
					validateFields={[]}
				/>
				<Field 
					name="address[pincode]" 
					component={this.renderInput} 
					label="Pincode" 
					required 
					maxLength={9}
					validate={this.required}
					validateFields={[]}
				/>
				<Field 
					name="phone" 
					component={this.renderInput} 
					label="Contact No." 
					maxLength={20}
					required
					validate={this.composeValidators(this.required, this.isPhoneValid)}
					validateFields={[]}
				/>
			</form>
		)
	}

	render() {
		return (
			<div className="address-form-container">
				<p className="form-instructions">
					Fill in the details of your delivery address and place your order.
				</p>
				<Form
					onSubmit={this.props.onSubmit}
					render={this.renderForm} 
					validateOnBlur
				/>
			</div>
		)
	}
}

export default AddressForm;