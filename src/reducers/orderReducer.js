import { CREATE_ORDER, FETCH_ORDERS, SIGN_IN, SIGN_OUT } from "../actions/types";

const INITIAL_STATE = [];

const orderReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FETCH_ORDERS: 
			return action.payload;
		case CREATE_ORDER:
			return [...state, action.payload];
		case SIGN_IN:
		case SIGN_OUT:
			return INITIAL_STATE;
		default:
			return state;
	}
}

export default orderReducer;