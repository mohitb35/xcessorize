import {
	SIGN_OUT, 
	FETCH_ORDERS_REQUEST, 
	FETCH_ORDERS_SUCCESS,
	FETCH_ORDERS_FAILURE,
	FETCH_ORDER_REQUEST, 
	FETCH_ORDER_SUCCESS,
	CREATE_ORDER_REQUEST,
	CREATE_ORDER_SUCCESS,
	RESTART_APP,
	FETCH_ORDER_FAILURE,
	CREATE_ORDER_FAILURE
} from "../actions/types";

const INITIAL_STATE = {
	isFetching: false,
	isCreating: false,
	fetchError: false,
	createError: false,
	items: []
};

const orderReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FETCH_ORDERS_REQUEST: 
			return {
				...state,
				isFetching: true,
				fetchError: false
			};
		case FETCH_ORDERS_SUCCESS:
			return {
				...state,
				isFetching: false,
				fetchError: false,
				items: action.payload
			};
		case FETCH_ORDERS_FAILURE:
			return {
				...state,
				isFetching: false,
				fetchError: true
			};
		case FETCH_ORDER_REQUEST:
			return {
				...state,
				isFetching: true,
				fetchError: false
			};
		case FETCH_ORDER_SUCCESS:
			if (action.payload === null) {
				return {
					...state,
					isFetching: false
				}
			} else {
				return {
					...state,
					isFetching: false,
					fetchError: false,
					items: [
						action.payload,
						...(state.items.filter(order => order.id !== action.payload.id))
					]
				};
			};
		case FETCH_ORDER_FAILURE:
			return {
				...state,
				isFetching: false,
				fetchError: true
			};
		case CREATE_ORDER_REQUEST:
			return {
				...state,
				isCreating: true,
				createError: false
			};
		case CREATE_ORDER_SUCCESS:
			return {
				...state,
				isCreating: false,
				createError: false,
				items: [...state.items, action.payload]
			};
		case CREATE_ORDER_FAILURE:
			return {
				...state,
				isCreating: false,
				createError: true
			}
		case RESTART_APP:
		case SIGN_OUT:
			return INITIAL_STATE;
		default:
			return state;
	}
}

export default orderReducer;