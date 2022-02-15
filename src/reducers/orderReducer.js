import {
	SIGN_OUT, 
	REQUEST_ORDERS, 
	RECEIVE_ORDERS, 
	REQUEST_ORDER, 
	RECEIVE_ORDER,
	REQUEST_ORDER_CREATE,
	COMPLETE_ORDER_CREATE
} from "../actions/types";

const INITIAL_STATE = {
	isFetching: false,
	isCreating: false,
	items: []
};

const orderReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SIGN_OUT:
			return INITIAL_STATE;
		case REQUEST_ORDERS: 
			return {
				...state,
				isFetching: true
			};
		case RECEIVE_ORDERS:
			return {
				...state,
				isFetching: false,
				items: action.payload
			};
		case REQUEST_ORDER:
			return {
				...state,
				isFetching: true
			};
		case RECEIVE_ORDER:
			if (action.payload === null) {
				return {
					...state,
					isFetching: false
				}
			} else {
				return {
					...state,
					isFetching: false,
					items: [
						action.payload,
						...(state.items.filter(order => order.id !== action.payload.id))
					]
				};
			}
		case REQUEST_ORDER_CREATE:
			return {
				...state,
				isCreating: true
			}
		case COMPLETE_ORDER_CREATE:
			return {
				...state,
				isCreating: false,
				items: [...state.items, action.payload]
			}
		default:
			return state;
	}
}

export default orderReducer;