import React from 'react';
import { connect } from 'react-redux';

import ProductCard from '../ProductCard';

import './ProductList.css';

function renderProductList(products) {
	return products.map( product => {
		return (
			<ProductCard product={product} key={product.id} />
		)
	})
}

const ProductList = (props) => {
	return <div className="product-list">
		{renderProductList(props.products)}
	</div>
}

const mapStateToProps = (state) => {
	return {
		products: state.products
	}
}

export default connect(
	mapStateToProps
)(ProductList);