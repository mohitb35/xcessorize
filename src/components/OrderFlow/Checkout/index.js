import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import AddressForm from '../../AddressForm';

import { cartItemCount, cartTotal } from '../../../utils';
import { createOrder } from '../../../actions';

import '../OrderFlow.css';

class Checkout extends React.Component {
	handleOrderSubmit = async (formValues) => {
		const {cart, cartTotal, cartItemCount } = this.props;
		await this.props.createOrder(formValues, cart, cartTotal, cartItemCount);
	}

	renderItemSummary () {
		return this.props.cart.map(item => {
			let { product, quantity } = item;
			return (
				<tr className="item-summary" key={product.id}>
					<td className="item">{product.name} <span className="item-quantity">x {quantity}</span></td>
					<td className="item-price">₹ {product.price}</td>
				</tr>
			)
		})
	}

	renderSidebar () {
		let { cartTotal, cartItemCount } = this.props;
		return (
			<div className="grid-side-bar">
				<div className="summary">
					<div className="summary-header">
						<label>Total ({cartItemCount} {cartItemCount === 1 ? 'item' : 'items'}):</label>
						<span className="info total">₹ {cartTotal}</span>
					</div>
					<table className="summary-item-table">
						<thead>
							<tr>
								<th colSpan="2">Item Summary</th>
							</tr>
						</thead>
						<tbody>
							{this.renderItemSummary()}
						</tbody>
					</table>
					<div className="summary-info">
						<label>Payment method:</label>
						<span className="info method">Cash on delivery</span>
					</div>
					<button className="place-order-button" form="address-form" disabled={!cartItemCount} formNoValidate>
						Place Order
					</button>
					<div className="text-separator"><span>or</span></div>
					<Link to="/cart">
						Go back to cart
					</Link>
				</div>
			</div>
		)
	}

	render() {
		let { cartItemCount, redirectTo } = this.props;
		if (redirectTo) {
			return <Redirect to={redirectTo} />
		} else {
			return (
				<div className="checkout">
					<h1 className="grid-page-header">Place Your Order</h1>
					{ !cartItemCount && 
						<div className="grid-page-message">Your cart is currently empty. Add some items before placing an order.</div>
					}
					{ cartItemCount !==0 && 
						<AddressForm onSubmit={this.handleOrderSubmit} />
					}
					{ this.renderSidebar() }
				</div>
			)
		}
	}
}

const mapStateToProps = (state) => {
	const cartArray = Object.values(state.cart)
	return {
		cart: cartArray,
		cartItemCount: cartItemCount(cartArray),
		cartTotal: cartTotal(cartArray),
		redirectTo: state.redirectTo
	}
}

export default connect(
	mapStateToProps,
	{ createOrder }
)(Checkout);