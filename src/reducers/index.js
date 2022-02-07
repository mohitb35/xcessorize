import { combineReducers } from 'redux';

import authReducer from './authReducer';
import cartReducer from './cartReducer';
import categoryReducer from './categoryReducer';
import productReducer from './productReducer';

export default combineReducers({
	auth: authReducer,
	categories: categoryReducer,
	products: productReducer,
	cart: cartReducer
})