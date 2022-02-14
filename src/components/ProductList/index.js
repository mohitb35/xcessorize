import React from 'react';
import { connect } from 'react-redux';

import ProductCard from '../ProductCard';

import './ProductList.css';

function renderProductList(products, page) {
	return products.map( product => {
		return (
			<ProductCard product={product} key={product.id} page={page}/>
		)
	})
}

const ProductList = (props) => {
	return <div className="product-list">
		{renderProductList(props.products, props.page)}
	</div>
}

const mapStateToProps = (state, ownProps) => {
	switch(ownProps.page) {
		case "home": 
			return {
				products: state.products.items
			}
		case "cart":
			return {
				products: Object.values(state.cart).map(cartItem => cartItem.product)
			}
		default:
			return null;
	}
	
}

export default connect(
	mapStateToProps
)(ProductList);