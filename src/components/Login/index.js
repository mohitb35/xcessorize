import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import qs from 'qs';

import GoogleAuth from "../GoogleAuth";

import './Login.css';

const renderLoginMessage = () => {
	return (
		<div className="alert-message">
			<p>Please sign in to access that page.</p>
			<GoogleAuth place="login"/>
		</div>
	)
}

const Login = (props) => {
	if (!props.isSignedIn) {
		return renderLoginMessage();
	}

	const queryParams =  qs.parse(props.location.search, { ignoreQueryPrefix: true });
	const ret = queryParams.ret || '/';
	console.log("Redirecting to:", ret);
	return <Redirect to={ret} />
}

const mapStateToProps = (state) => {
	return {
		isSignedIn: state.auth.isSignedIn
	}
}

export default connect(
	mapStateToProps
)(Login);