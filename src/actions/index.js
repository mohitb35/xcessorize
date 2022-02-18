import { 
	ADD_TO_CART,
	REMOVE_FROM_CART,
	FETCH_CATEGORIES_REQUEST,
	FETCH_CATEGORIES_SUCCESS,
	FETCH_CATEGORIES_FAILURE,
	INVALIDATE_PRODUCTS,
	FETCH_PRODUCTS_REQUEST,
	FETCH_PRODUCTS_SUCCESS,
	FETCH_PRODUCTS_FAILURE,
	FETCH_ORDERS_REQUEST,
	FETCH_ORDERS_SUCCESS,
	FETCH_ORDERS_FAILURE,
	FETCH_ORDER_REQUEST,
	FETCH_ORDER_FAILURE,
	FETCH_ORDER_SUCCESS,
	CREATE_ORDER_REQUEST,
	CREATE_ORDER_SUCCESS,
	CREATE_ORDER_FAILURE,
	SIGN_IN,
	START_SIGN_IN, 
	SIGN_OUT,
	ABORT_SIGN_IN,
	RESTART_APP,
	DISMISS_ERROR
} from './types';

import apiServer from '../apis/apiServer';
import { processCreateError, processFetchError } from '../utils';

export const startSignIn = () => {
	return {
		type: START_SIGN_IN
	}
}

export const signIn = (userId) => {
	return {
		type: SIGN_IN,
		payload: userId
	}
}

export const abortSignIn = () => {
	return {
		type: ABORT_SIGN_IN
	}
}

export const signOut = () => {
	return {
		type: SIGN_OUT
	}
}

export const fetchCategories = () => {
	return async function(dispatch) {
		dispatch({type: FETCH_CATEGORIES_REQUEST});
		try {
			const response = await apiServer.get('/categories');
			const categories = response.data ? response.data : [];
			dispatch({
				type: FETCH_CATEGORIES_SUCCESS,
				payload: categories
			})
		} catch (err) {
			dispatch({ 
				type: FETCH_CATEGORIES_FAILURE,
				error: processFetchError(err, 'categories')
			})
		}
	}
}

export const invalidateProducts = () => {
	return {
		type: INVALIDATE_PRODUCTS
	}
}

export const fetchProducts = (searchTerm = '', categoryId = 0, sortOption = 1) => {
	return async function(dispatch) {
		dispatch({ type: FETCH_PRODUCTS_REQUEST });
		try {
			const queryConfig = {};
			
			if (searchTerm.length) queryConfig.q = searchTerm;
			if (categoryId) queryConfig.category = categoryId;
			switch (sortOption) {
				case 1:
					queryConfig._sort = 'name';
					queryConfig._order = 'asc';
					break;
				case 2:
					queryConfig._sort = 'name';
					queryConfig._order = 'desc';
					break;
				case 3:
					queryConfig._sort = 'price';
					queryConfig._order = 'asc';
					break;
				default: 
					break;
			}

			const response = await apiServer.get('/products', {
				params: queryConfig
			});

			const products = response.data;
			dispatch({
				type: FETCH_PRODUCTS_SUCCESS,
				payload: products
			});
		} catch (err) {
			dispatch({ 
				type: FETCH_PRODUCTS_FAILURE,
				error: processFetchError(err, 'products')
			})
		}
	}
}

export const addToCart = (product) => {
	return {
		type: ADD_TO_CART,
		payload: product
	}
}

export const removeFromCart = (product) => {
	return {
		type: REMOVE_FROM_CART,
		payload: product
	}
}

export const createOrder = (formValues, cart, cartTotal, cartItemCount) => {
	return async function (dispatch, getState) {
		dispatch({ type: CREATE_ORDER_REQUEST });
		try {
			const orderData = {
				...formValues, 
				items: cart,
				itemCount: cartItemCount,
				total: cartTotal,
				userId: getState().auth.userId,
				payment: 'Cash on delivery',
				orderDate: new Date()
			}
		
			const response = await apiServer.post('/orders', orderData);
			const newOrder = response.data;
			dispatch({
				type: CREATE_ORDER_SUCCESS,
				payload: newOrder
			});
		} catch (err) {
			dispatch({ 
				type: CREATE_ORDER_FAILURE,
				error: processCreateError(err, 'order')
			})
		}
	}
}

export const fetchOrders = () => {
	return async function (dispatch, getState) {
		dispatch({ type: FETCH_ORDERS_REQUEST });
		try {
			const { userId } = getState().auth;
			let orders = [];
			if (userId) {
				const response = await apiServer.get('/orders', {
					params: {
						userId
					}
				});
				orders = response.data;
			}
			dispatch({
				type: FETCH_ORDERS_SUCCESS,
				payload: orders
			});
		} catch (err) {
			dispatch({ 
				type: FETCH_ORDERS_FAILURE,
				error: processFetchError(err, 'orders')
			})
		}
	}
}

export const fetchOrder = (orderId) => {
	return async function (dispatch, getState) {
		dispatch({ type: FETCH_ORDER_REQUEST });
		try {
			const response = await apiServer.get(`/orders/${orderId}`, {
				params: {
					userId: getState().auth.userId
				}
			});
			const order = response.data;
			dispatch({
				type: FETCH_ORDER_SUCCESS,
				payload: order
			});
		} catch (err) {
			if (err.response && err.response.status === 404) {
				dispatch({
					type: FETCH_ORDER_SUCCESS,
					payload: null

				})
			} else {
				dispatch({ 
					type: FETCH_ORDER_FAILURE,
					error: processFetchError(err, 'order')
				});
			}
		}
	}
}

export const restartApp = () => {
	return {
		type: RESTART_APP
	}
};

export const dismissError = () => {
	return {
		type: DISMISS_ERROR
	}
}