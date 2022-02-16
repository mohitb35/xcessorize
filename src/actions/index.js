import { 
	ADD_TO_CART,
	API_ERROR,
	COMPLETE_ORDER_CREATE,
	FETCH_CATEGORIES_REQUEST,
	FETCH_CATEGORIES_SUCCESS,
	FETCH_CATEGORIES_FAILURE,
	INVALIDATE_PRODUCTS,
	RECEIVE_ORDER,
	RECEIVE_ORDERS,
	RECEIVE_PRODUCTS,
	REMOVE_FROM_CART,
	REQUEST_ORDER,
	REQUEST_ORDERS,
	REQUEST_ORDER_CREATE,
	REQUEST_PRODUCTS,
	SIGN_IN,
	START_SIGN_IN, 
	SIGN_OUT,
	ABORT_SIGN_IN,
	RESTART_APP,
	DISMISS_ERROR
} from './types';

import apiServer from '../apis/apiServer';
import { processFetchError } from '../utils';

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

export const requestProducts = () => {
	return {
		type: REQUEST_PRODUCTS
	}
}

export const receiveProducts = (products) => {
	return {
		type: RECEIVE_PRODUCTS,
		payload: products
	}
}

export const fetchProducts = (searchTerm = '', categoryId = 0, sortOption = 1) => {
	return async function(dispatch) {
		dispatch(requestProducts());
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
			dispatch(receiveProducts(products));
		} catch (err) {
			// console.log(err);
			// dispatch(apiError(err));
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

export const requestOrderCreate = () => {
	return {
		type: REQUEST_ORDER_CREATE
	}
}

export const completeOrderCreate = (newOrder) => {
	return {
		type: COMPLETE_ORDER_CREATE,
		payload: newOrder
	}
}

export const createOrder = (formValues, cart, cartTotal, cartItemCount) => {
	return async function (dispatch, getState) {
		const orderData = {
			...formValues, 
			items: cart,
			itemCount: cartItemCount,
			total: cartTotal,
			userId: getState().auth.userId,
			payment: 'Cash on delivery',
			orderDate: new Date()
		}
		dispatch(requestOrderCreate());
		try {
			const response = await apiServer.post('/orders', orderData);
			const newOrder = response.data;
			dispatch(completeOrderCreate(newOrder));
		} catch (err) {
			dispatch(apiError(err));
		}
	}
}

export const requestOrders = () => {
	return {
		type: REQUEST_ORDERS
	}
}

export const receiveOrders = (orders) => {
	return {
		type: RECEIVE_ORDERS,
		payload: orders
	}
}

export const fetchOrders = () => {
	return async function (dispatch, getState) {
		dispatch(requestOrders());
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
			dispatch(receiveOrders(orders));
		} catch (err) {
			console.log(err);
			dispatch(apiError(err));
		}
	}
}

export const requestOrder = () => {
	return {
		type: REQUEST_ORDER
	}
}

export const receiveOrder = (order) => {
	return {
		type: RECEIVE_ORDER,
		payload: order
	}
}

export const fetchOrder = (orderId) => {
	return async function (dispatch, getState) {
		dispatch(requestOrder());
		try {
			const response = await apiServer.get(`/orders/${orderId}`, {
				params: {
					userId: getState().auth.userId
				}
			});
			const order = response.data;
			dispatch(receiveOrder(order));
		} catch (err) {
			if (err.response && err.response.status === 404) {
				dispatch(receiveOrder(null));
			}
			dispatch(apiError(err));
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

export const handleError = () => {

}

export const apiError = (err, customMessage) => {
	console.log('In action creator apiError');
	console.dir(err);
	console.log(err.status);
	console.log('==============');
	/* console.dir(err);
	console.log(customMessage); */
	return {
		type: API_ERROR,
		payload: err
	}
}