import { INVALIDATE_PRODUCTS, RECEIVE_PRODUCTS, REQUEST_PRODUCTS, RESTART_APP } from "../actions/types";

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
		case REQUEST_PRODUCTS:
			return {
				...state,
				isFetching: true,
				didInvalidate: false
			}
		case RECEIVE_PRODUCTS:
			return {
				...state,
				didInvalidate: false,
				isFetching: false,
				items: action.payload
			}
		case RESTART_APP:
			return INITIAL_STATE;
		default:
			return state;
	}
}

export default productReducer;