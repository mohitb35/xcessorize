import { combineReducers } from 'redux';

import authReducer from './authReducer';
import cartReducer from './cartReducer';
import categoryReducer from './categoryReducer';
import errorReducer from './errorReducer';
import orderReducer from './orderReducer';
import productReducer from './productReducer';
import redirectReducer from './redirectReducer';

export default combineReducers({
	auth: authReducer,
	categories: categoryReducer,
	products: productReducer,
	cart: cartReducer,
	orders: orderReducer,
	redirectTo: redirectReducer,
	errors: errorReducer
})