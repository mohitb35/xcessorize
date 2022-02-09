import { CREATE_ORDER } from "../actions/types";

const INITIAL_STATE = null;

const redirectReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case CREATE_ORDER:
			return `/orders/${action.payload.id}`;
		default:
			return INITIAL_STATE;	
	}
}

export default redirectReducer;