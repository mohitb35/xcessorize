import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ProductList from '../ProductList';

import { cartItemCount, cartTotal } from '../../utils';

import './Cart.css';

class Cart extends React.Component {
	renderSidebar () {
		let { cartTotal, cartItemCount } = this.props;
		return (
			<div className="side-bar">
				<div className="summary">
					<div className="summary-header">
						<label>Total ({cartItemCount} items):</label>
						<span class="total">₹ {cartTotal}</span>
					</div>
					<Link to="/checkout" className={!cartTotal && "disabled"}>
						<button 
							className="checkout-button" 
							disabled={!cartItemCount}
						>
							Checkout
						</button>
					</Link>
					<div class="text-separator"><span>or</span></div>
					<Link to="/">
						Continue shopping on Xcessorize
					</Link>
				</div>
			</div>
		)
	}

	render() {
		let { cartItemCount } = this.props;
		return (
			<div className="cart">
				<h1 className="cart-header">My Cart ({cartItemCount})</h1>
				{ !cartItemCount && 
					<div class="message">Your cart is currently empty. Add some items to checkout.</div>
				}
				{ cartItemCount !== 0 &&
					<ProductList page="cart"/>
				}
				{ this.renderSidebar() }
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	const cartArray = Object.values(state.cart)
	return {
		cart: cartArray,
		cartItemCount: cartItemCount(cartArray),
		cartTotal: cartTotal(cartArray)
	}
}

export default connect(
	mapStateToProps
)(Cart);