import React from 'react';

import AddRemoveFromCart from './AddRemoveFromCart';

import './ProductCard.css';

function renderProduct (product, page, quantity) {
	return (
		<article className="product-card">
			<div className="image-wrapper">
				<img className="product-thumbnail" src={product.imageURL} alt={product.name}/>
			</div>
			<div className="product-info">
				<h2 className="product-name">{product.name}</h2>
				{ page === 'home' &&
					<p className="product-description">{product.description}</p>
				}
				<div className="product-price">
					₹ { page === 'order-details' ? product.price * quantity : product.price }
				</div>
				{ page !== 'order-details' &&
					<AddRemoveFromCart product={product}/>
				}
				{ page === 'order-details' && quantity !== undefined &&
					<div className="product-quantity">Quantity: {quantity}</div>
				}
			</div>
		</article>
	)
}

const ProductCard = (props) => {
	return (
		renderProduct(props.product, props.page, props.quantity)
	);
}

export default ProductCard;