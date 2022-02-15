import { COMPLETE_ORDER_CREATE, RESTART_APP } from "../actions/types";

const INITIAL_STATE = null;

const redirectReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case COMPLETE_ORDER_CREATE:
			return `/orders/${action.payload.id}`;
		case RESTART_APP:
		default:
			return INITIAL_STATE;	
	}
}

export default redirectReducer;