import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ProductList from '../../ProductList';

import { cartItemCount, cartTotal } from '../../../utils';

import '../OrderFlow.css';

class Cart extends React.Component {
	renderSidebar () {
		let { cartTotal, cartItemCount } = this.props;
		return (
			<div className="grid-side-bar">
				<div className="summary">
					<div className="summary-header">
						<label>Total ({cartItemCount} items):</label>
						<span className="total">₹ {cartTotal}</span>
					</div>
					<Link to="/checkout" className={!cartTotal ? "disabled" : ""}>
						<button 
							className="checkout-button" 
							disabled={!cartItemCount}
						>
							Checkout
						</button>
					</Link>
					<div className="text-separator"><span>or</span></div>
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
				<h1 className="grid-page-header">My Cart ({cartItemCount})</h1>
				{ !cartItemCount && 
					<div className="grid-page-message">Your cart is currently empty. Add some items to checkout.</div>
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