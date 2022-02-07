import { 
	ADD_TO_CART,
	API_ERROR,
	FETCH_CATEGORIES,
	FETCH_PRODUCTS,
	REMOVE_FROM_CART,
	SIGN_IN, 
	SIGN_OUT
} from './types';

import apiServer from '../apis/apiServer';

export const signIn = (userId) => {
	return {
		type: SIGN_IN,
		payload: userId
	}
}

export const signOut = () => {
	return {
		type: SIGN_OUT
	}
}

export const fetchCategories = () => {
	return async function(dispatch) {
		try {
			const response = await apiServer.get('/categories');
			const categories = response.data;
			dispatch({
				type: FETCH_CATEGORIES,
				payload: categories
			})
		} catch (err) {
			dispatch(apiError(err));
		}
	}
}

export const fetchProducts = (searchTerm = '', categoryId = 0, sortOption = 1) => {
	// console.log(searchTerm, categoryId, sortOption);
	return async function(dispatch) {
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

			// console.log("Query params:", queryConfig);
			const response = await apiServer.get('/products', {
				params: queryConfig
			});

			const products = response.data;
			dispatch({
				type: FETCH_PRODUCTS,
				payload: products
			})
		} catch (err) {
			dispatch(apiError(err));
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

export const apiError = (err) => {
	return {
		type: API_ERROR,
		payload: err
	}
}