import React from 'react';
import { connect } from 'react-redux';

import './GoogleAuth.css';
import googleLogo from '../../assets/google.svg';

import { startSignIn, signIn, signOut } from '../../actions';

class GoogleAuth extends React.Component {
	componentDidMount() {
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
	};

	componentWillUnmount() {
		delete this.auth;
	}

	onAuthChange = (isGoogleSignedIn) => {
		console.log(this.props.place, " - Auth change detected:", this.props.isSignedIn, "g:", isGoogleSignedIn);
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

	handleSignIn = () => {
		this.props.startSignIn();
		this.auth.signIn();
	}

	handleSignOut = () => {
		this.auth.signOut();
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
	{startSignIn, signIn, signOut}
)(GoogleAuth);