import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import AddressForm from '../../AddressForm';
import GridLayout from '../../GridLayout';

import { cartItemCount, cartTotal } from '../../../utils';
import { createOrder } from '../../../actions';

import '../OrderFlow.css';

class Checkout extends React.Component {
	handleOrderSubmit = async (formValues) => {
		const {cart, cartTotal, cartItemCount } = this.props;
		await this.props.createOrder(formValues, cart, cartTotal, cartItemCount);
	}

	renderSidebarHeader = () => {
		let { cartItemCount, cartTotal } = this.props;
		return (
			<React.Fragment>
				<label>Total ({cartItemCount} {cartItemCount === 1 ? 'item' : 'items'}):</label>
				<span className="info total">₹ {cartTotal}</span>
			</React.Fragment>
		)
	}

	renderItemSummary = () => {
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

	renderSidebarContent = () => {
		let { cartItemCount, isCreating } = this.props;
		return (
			<React.Fragment>
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
				<button 
					className="place-order-button" 
					form="address-form" 
					disabled={!cartItemCount || isCreating} 
					formNoValidate
				>
					{isCreating ? 'Placing your order...' : 'Place order'}
				</button>
				<div className="text-separator"><span>or</span></div>
				<Link to="/cart">
					Go back to cart
				</Link>
			</React.Fragment>	
		)
	}

	renderMainContent = () => {
		let { cartItemCount } = this.props;
		if (!cartItemCount) {
			return (
				<div className="grid-page-message">
					Your cart is currently empty. Add some items before placing an order.
				</div>
			)
		}
		
		return <AddressForm onSubmit={this.handleOrderSubmit} />
	}

	render() {
		let { redirectTo } = this.props;
		if (redirectTo) {
			return <Redirect to={redirectTo} />
		} else {
			return (
				<GridLayout 
					rootClass="checkout"
					headerContent="Place Your Order"
					renderMainContent={this.renderMainContent}
					renderSidebarHeader={this.renderSidebarHeader}
					renderSidebarContent={this.renderSidebarContent}
				/>
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
		redirectTo: state.redirectTo,
		isCreating: state.orders.isCreating
	}
}

export default connect(
	mapStateToProps,
	{ createOrder }
)(Checkout);