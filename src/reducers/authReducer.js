import { SIGN_IN, SIGN_OUT, START_SIGN_IN } from '../actions/types';

const INITIAL_STATE = {
	isSigningIn: false,
	isSignedIn: null,
	userId: null
};

const authReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case START_SIGN_IN: 
			return { ...state, isSigningIn: true }
		case SIGN_IN:
			return { ...state, isSigningIn: false, isSignedIn: true, userId: action.payload };
		case SIGN_OUT:
			return { ...state, isSigningIn: false, isSignedIn: false, userId: null };
		default:
			return state;
	}
}

export default authReducer;