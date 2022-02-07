import { FETCH_PRODUCTS } from "../actions/types";

const categoryReducer = (state = [], action) => {
	switch (action.type) {
		case FETCH_PRODUCTS:
			return action.payload;
		default:
			return state;
	}
}

export default categoryReducer;