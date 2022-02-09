import { ADD_TO_CART, CREATE_ORDER, REMOVE_FROM_CART, SIGN_OUT } from "../actions/types";

const INITIAL_STATE = {};

const cartReducer = (state = INITIAL_STATE, action) => {
	let initialQuantity;
	switch (action.type) {
		case ADD_TO_CART:
			initialQuantity = state[action.payload.id] ? state[action.payload.id].quantity : 0;
			return {
				...state,
				[action.payload.id]: {
					product: action.payload,
					quantity: initialQuantity + 1
				}
			};
		case REMOVE_FROM_CART:
			initialQuantity = state[action.payload.id] ? state[action.payload.id].quantity : 0;
			if (initialQuantity <= 0 || initialQuantity === 1) {
				const newCart = { ...state };
				delete newCart[action.payload.id];
				return newCart;
			} else {
				return {
					...state,
					[action.payload.id]: {
						product: action.payload,
						quantity: initialQuantity - 1
					}
				}
			};
		case CREATE_ORDER: 
		case SIGN_OUT:
			return INITIAL_STATE;
		default:
			return state;
	}
}

export default cartReducer;