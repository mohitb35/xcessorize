import { FETCH_CATEGORIES } from "../actions/types";

const INITIAL_STATE = [];

const categoryReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FETCH_CATEGORIES:
			return action.payload;
		default:
			return state;
	}
}

export default categoryReducer;