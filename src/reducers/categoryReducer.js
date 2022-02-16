import { 
	FETCH_CATEGORIES_REQUEST, 
	FETCH_CATEGORIES_SUCCESS,
	FETCH_CATEGORIES_FAILURE, 
	RESTART_APP 
} from "../actions/types";

const INITIAL_STATE = {
	isFetching: false,
	items: []
};

const categoryReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FETCH_CATEGORIES_REQUEST:
			return {
				...state,
				isFetching: true
			};
		case FETCH_CATEGORIES_SUCCESS:
			return {
				...state,
				isFetching: false,
				items: action.payload
			}
		case FETCH_CATEGORIES_FAILURE:
			return INITIAL_STATE;
		case RESTART_APP:
			return INITIAL_STATE;
		default:
			return state;
	}
}

export default categoryReducer;