import React from 'react';
import { connect } from 'react-redux';

import './GoogleAuth.css';
import googleLogo from '../../assets/google.svg';

import { startSignIn, signIn, signOut, abortSignIn, handleGeneralError } from '../../actions';

class GoogleAuth extends React.Component {
	componentDidMount() {
		try {
			window.gapi.load('client:auth2', () => {
				window.gapi.client.init({
					clientId: '497465941851-d8ef28lco7akqe6nrregvslae9rbrpr0.apps.googleusercontent.com',
					scope: 'email'
				}).then(() => {
					//Get auth object, and set state with isSignedIn
					this.auth = window.gapi.auth2.getAuthInstance();
					const isGoogleSignedIn = this.auth.isSignedIn.get();
					if(this.props.isSignedIn !== isGoogleSignedIn) {
						this.onAuthChange(isGoogleSignedIn);
					}
					this.auth.isSignedIn.listen(this.onAuthChange);
				})
			});
		} catch (err) {
			err.displayMessage = 'Google sign in seems to be unavailable. Please check your network.';
			this.props.handleGeneralError(err);
		}
	};

	componentWillUnmount() {
		delete this.auth;
	}

	onAuthChange = (isGoogleSignedIn) => {
		if (this.auth) {
			if (isGoogleSignedIn){
				const userId = this.auth.currentUser.get().getId();
				if (userId) {
					this.props.signIn(userId);
				} else {
					this.props.abortSignIn();
				}
			} else if (!isGoogleSignedIn) {
				this.props.signOut();
			}
		}
	}

	handleSignIn = async () => {
		try {
			this.props.startSignIn();
			await this.auth.signIn();
		} catch (err) {
			err.displayMessage = 'Unable to sign in. Please check your network and refresh the page';
			this.props.handleGeneralError(err);
			this.props.abortSignIn();
		}
	}

	handleSignOut = async () => {
		try {
			await this.auth.signOut();
		} catch (err) {
			err.displayMessage = 'Unable to sign out. Please check your network and refresh the page';
			this.props.handleGeneralError(err);
		}
		
	}

	renderAuthButton() {
		if (this.props.isSignedIn === null) {
			return null;
		}
		
		if (this.props.isSigningIn) {
			return (
				<button className="google-auth-button" disabled>
					<img src={googleLogo} alt="google sign in"/>
					Signing in....
				</button>
			)
		}
		
		if (this.props.isSignedIn) {
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
		isSigningIn: state.auth.isSigningIn,
		userId: state.auth.userId
	}
}

export default connect(
	mapStateToProps,
	{startSignIn, signIn, abortSignIn, signOut, handleGeneralError}
)(GoogleAuth);