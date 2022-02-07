import React from 'react';
import { connect } from 'react-redux';

import { addToCart, removeFromCart } from '../../../actions';

import './AddRemoveFromCart.css';

class AddRemoveFromCart extends React.Component {
	addToCart = () => {
		this.props.addToCart(this.props.product);
	}

	removeFromCart = () => {
		this.props.removeFromCart(this.props.product);
	}

	renderAddRemoveFromCart () {
		if (this.props.quantity) {
			return (
				<div className="product-cart-status">
					<button className="remove-from-cart-button button-round" onClick={this.removeFromCart}>&minus;</button>
					<span>{this.props.quantity}</span>
					<button className="add-to-cart-button button-round" onClick={this.addToCart}>+</button>
				</div>
			)
		} else {
			return (
				<button className="add-to-cart-button" onClick={this.addToCart}>
					Add To Cart
				</button>
			)
		}
	}

	render() {
		return this.renderAddRemoveFromCart();
	}
	
}

const mapStateToProps = (state, ownProps) => {
	let productId = ownProps.product.id;
	return {
		quantity: state.cart[productId] ? state.cart[productId].quantity : 0
	}
}

export default connect(
	mapStateToProps,
	{ addToCart, removeFromCart }
)(AddRemoveFromCart);