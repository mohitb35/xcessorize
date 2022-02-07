import React from 'react';

import AddRemoveFromCart from './AddRemoveFromCart';

import './ProductCard.css';

function renderProduct(product) {
	return (
		<article className="product-card">
			<div className="image-wrapper">
				<img className="product-thumbnail" src={product.imageURL} alt={product.name}/>
			</div>
			<div className="product-info">
				<h2 className="product-name">{product.name}</h2>
				<p className="product-description">{product.description}</p>
				<div className="product-price">₹ {product.price}</div>
				<AddRemoveFromCart product={product}/>
			</div>
		</article>
	)
}

const ProductCard = (props) => {
	return (
		renderProduct(props.product)
	);
}

export default ProductCard;