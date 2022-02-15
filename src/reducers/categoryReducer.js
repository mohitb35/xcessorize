import { FETCH_CATEGORIES, RESTART_APP } from "../actions/types";

const INITIAL_STATE = [];

const categoryReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FETCH_CATEGORIES:
			return action.payload;
		case RESTART_APP:
			return INITIAL_STATE;
		default:
			return state;
	}
}

export default categoryReducer;