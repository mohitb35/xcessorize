import { CREATE_ORDER_SUCCESS, RESTART_APP } from "../actions/types";

const INITIAL_STATE = null;

const redirectReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case CREATE_ORDER_SUCCESS:
			return `/orders/${action.payload.id}`;
		case RESTART_APP:
		default:
			return INITIAL_STATE;	
	}
}

export default redirectReducer;