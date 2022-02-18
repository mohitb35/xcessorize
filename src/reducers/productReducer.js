import { INVALIDATE_PRODUCTS, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_REQUEST, RESTART_APP, FETCH_PRODUCTS_FAILURE } from "../actions/types";

const INITIAL_STATE = {
	didInvalidate: false,
	isFetching: false,
	items: []
};

const productReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case INVALIDATE_PRODUCTS:
			return {
				...state,
				didInvalidate: true
			}
		case FETCH_PRODUCTS_REQUEST:
			return {
				...state,
				isFetching: true,
				didInvalidate: false
			}
		case FETCH_PRODUCTS_SUCCESS:
			return {
				...state,
				didInvalidate: false,
				isFetching: false,
				items: action.payload
			}
		case FETCH_PRODUCTS_FAILURE: 
			return {
				...state,
				didInvalidate: false,
				isFetching: false
			}
		case RESTART_APP:
			return INITIAL_STATE;
		default:
			return state;
	}
}

export default productReducer;