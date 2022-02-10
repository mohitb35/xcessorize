import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ProductList from '../../ProductList';
import GridLayout from '../../GridLayout';

import { cartItemCount, cartTotal } from '../../../utils';

import '../OrderFlow.css';

class Cart extends React.Component {
	renderSidebarHeader = () => {
		let { cartItemCount, cartTotal } = this.props;
		return (
			<React.Fragment>
				<label>Total ({cartItemCount} {cartItemCount === 1 ? 'item' : 'items'}):</label>
				<span className="info total">₹ {cartTotal}</span>
			</React.Fragment>
		)
	}

	renderSidebarContent = () => {
		let { cartTotal, cartItemCount } = this.props;
		return (
			<React.Fragment>
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
			</React.Fragment>
		)
	}

	renderMainContent = () => {
		let { cartItemCount } = this.props;
		if (!cartItemCount) {
			return (
				<div className="grid-page-message">
					Your cart is currently empty. Add some items to checkout.
				</div>
			)
		}

		return <ProductList page="cart"/>
	}

	render() {
		let { cartItemCount } = this.props;
		return (
			<GridLayout
				rootClass="cart"
				headerContent={`My Cart (${cartItemCount})`}
				renderMainContent={this.renderMainContent}
				renderSidebarHeader={this.renderSidebarHeader}
				renderSidebarContent={this.renderSidebarContent}
			/>
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