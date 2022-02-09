import { CREATE_ORDER, FETCH_ORDERS, FETCH_ORDER, SIGN_IN, SIGN_OUT } from "../actions/types";

const INITIAL_STATE = [];

const orderReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FETCH_ORDERS: 
			return action.payload;
		case FETCH_ORDER:
			return [
				action.payload,
				...(state.filter(order => order.id !== action.payload.id))
			];
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