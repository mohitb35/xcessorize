import { COMPLETE_ORDER_CREATE } from "../actions/types";

const INITIAL_STATE = null;

const redirectReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case COMPLETE_ORDER_CREATE:
			return `/orders/${action.payload.id}`;
		default:
			return INITIAL_STATE;	
	}
}

export default redirectReducer;