import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = (props) => {
	const { component: Component, isSignedIn, location, ...rest } = props;

	return (
		<Route 
			{...rest} 
			render={(props) => {
				if (isSignedIn) {
					return <Component {...props} />
				} else {
					return <Redirect 
						to={{
							pathname: '/login',
							search: `?ret=${encodeURIComponent(location.pathname)}`
						}}
					/>
				}	 
			}} 
		/>
	)
}

const mapStateToProps = (state) => {
	return {
		isSignedIn: state.auth.isSignedIn
	}
}

export default connect(
	mapStateToProps
)(PrivateRoute);