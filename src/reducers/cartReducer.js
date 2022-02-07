import { ADD_TO_CART, REMOVE_FROM_CART, SIGN_OUT } from "../actions/types";

const cartReducer = (state = {}, action) => {
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
		case SIGN_OUT:
			return {};
		default:
			return state;
	}
}

export default cartReducer;