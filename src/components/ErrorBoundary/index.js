import React from 'react';
import { connect } from 'react-redux';

import { restartApp } from '../../actions';

import './ErrorBoundary.css';

class ErrorBoundary extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			hasError: false
		}
	};

	static getDerivedStateFromError(error) {
		return {
			hasError: true
		}
	}

	componentDidCatch(error, info){
		console.log("Error:", error.toString());
		console.log("Location:", info.componentStack);
	}

	handleRestart = () => {
		this.props.restartApp();
	}

	render(){
		if(this.state.hasError){
			return (
				<div className="error alert-message">
					<p>
						Oops..something went wrong. Please refresh the page. If you still see an error, please restart the app.
					</p>
					<button onClick={this.handleRestart}>Restart App</button>
				</div>
			);
		} else {
			return this.props.children;
		}
	}
}


export default connect(
	null,
	{restartApp}
)(ErrorBoundary);