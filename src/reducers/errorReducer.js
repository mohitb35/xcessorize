import { DISMISS_ERROR } from "../actions/types";

const INITIAL_STATE = [];

const errorReducer = (state = INITIAL_STATE, action ) => {
	switch (action.type) {
		case DISMISS_ERROR:
			return [...state.slice(1)];
		default: 
			if (action.error) {
				return [
					action.error, 
					...state
				]	
			} else {
				return state;
			}
	}
}

export default errorReducer;