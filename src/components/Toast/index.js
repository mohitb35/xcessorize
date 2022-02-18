import React from "react";
import { connect } from "react-redux";

import { dismissError } from "../../actions";

import './Toast.css';

class Toast extends React.Component {
	state = {
		isToastVisible: false,
		timeoutId: null
	}

	componentDidUpdate(prevProps) {
		if (this.props.error && this.props.error !== prevProps.error && !this.state.isToastVisible) {
			this.setState({
				isToastVisible: true
			})
		}
	}

	handleDismissClick = () => {
		this.setState({
			isToastVisible: false
		});
		this.setState({
			timeoutId: setTimeout( () => this.props.dismissError(), 500 )
		});
	}

	componentWillUnmount() {
		console.log("Unmounting");
		clearTimeout(this.state.timeoutId);
	}

	render() {
		const { error } = this.props;
		if (!error) {
		 	return null;
		}

		const toastClasses = `toast ${this.state.isToastVisible ? '' : 'hidden'}`;

		return (
			<div className={toastClasses}>
				<p className="toast-message">
					{error.displayMessage || 'Oops..Something went wrong. Please try again after some time.'}
				</p>
				<button className="close-toast-button button-round" onClick={this.handleDismissClick}>
				&#215;
				</button>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	if (state.errors.length) {
		return {
			error: state.errors[0]
		}
	} else {
		return {};
	}
}

export default connect(
	mapStateToProps,
	{ dismissError }
)(Toast);