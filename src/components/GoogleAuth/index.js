import React from 'react';
import { connect } from 'react-redux';

import './GoogleAuth.css';
import googleLogo from '../../assets/google.svg';

import { signIn, signOut } from '../../actions';

class GoogleAuth extends React.Component {
	componentDidMount() {
		window.gapi.load('client:auth2', () => {
			window.gapi.client.init({
				clientId: '497465941851-d8ef28lco7akqe6nrregvslae9rbrpr0.apps.googleusercontent.com',
				scope: 'email'
			}).then(() => {
				//Get auth object, and set state with isSignedIn
				this.auth = window.gapi.auth2.getAuthInstance();
				this.onAuthChange(this.auth.isSignedIn.get());
				this.auth.isSignedIn.listen(this.onAuthChange);
			})
		});
	};

	onAuthChange = (isSignedIn) => {
		if (isSignedIn) {
			this.props.signIn(this.auth.currentUser.get().getId());
			// this.auth.currentUser.get().getBasicProfile().getEmail();
			// this.auth.currentUser.get().getBasicProfile().getName();
		} else {
			this.props.signOut()
		}
	}

	handleSignIn = () => {
		this.auth.signIn();
	}

	handleSignOut = () => {
		this.auth.signOut();
	}

	renderAuthButton() {
		if (this.props.isSignedIn === null) {
			return null;
		} else if (this.props.isSignedIn) {
			return (
				<button className="google-auth-button" onClick={this.handleSignOut}>
					<img src={googleLogo} alt="google sign out"/>
					Sign Out
				</button>
			)
		 } else {
			return (
				<button className="google-auth-button" onClick={this.handleSignIn}>
					<img src={googleLogo} alt="google sign in"/>
					Sign In With Your Google Account
				</button>
			)
		}
	}

	render() {
		return this.renderAuthButton()
	}
}

const mapStateToProps = (state) => {
	return {
		isSignedIn: state.auth.isSignedIn,
		userId: state.auth.userId
	}
}

export default connect(
	mapStateToProps,
	{signIn, signOut}
)(GoogleAuth);