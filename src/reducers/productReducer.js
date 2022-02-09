import { FETCH_PRODUCTS } from "../actions/types";

const INITIAL_STATE = [];

const productReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FETCH_PRODUCTS:
			return action.payload;
		default:
			return state;
	}
}

export default productReducer;