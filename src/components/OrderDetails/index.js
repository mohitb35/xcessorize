import React from 'react';
import { connect } from 'react-redux';

import GridLayout from '../GridLayout';
import ProductCard from '../ProductCard';

import { fetchOrder } from '../../actions';
import { formattedDate, formattedAddress } from '../../utils';

import './OrderDetails.css'
import Loader from '../Loader';

class OrderDetails extends React.Component {
	componentDidMount() {
		if (!this.props.order) {
			this.props.fetchOrder(this.props.match.params.id);
		}
	}

	renderSidebarHeader = () => {
		const { id } = this.props.order;
		return (
			<React.Fragment>
				<span>Order #{id}</span>
			</React.Fragment>
		)
	}

	renderSidebarContent = () => {
		const { payment, itemCount, total, orderDate, name, address } = this.props.order;
		return (
			<React.Fragment>
				<div className="summary-info">
					<label>Placed on:</label>
					<span className="info date">{formattedDate(new Date(orderDate))}</span>
				</div>
				<div className="summary-info">
					<label>Total ({itemCount} {itemCount === 1 ? 'item' : 'items'}):</label>
					<span className="info total">₹ {total}</span>
				</div>
				<div className="summary-info">
					<label>Payment method:</label>
					<span className="info method">{payment}</span>
				</div>
				<div className="summary-address">
					<label>Delivery Address</label>
					<p className="info name">{name}</p>
					<p className="address">{formattedAddress(address)}</p>
				</div>
			</React.Fragment>
		)
	}

	renderItemList = (items) => {
		return items.map( item => {
			let { product, quantity } = item;
			return (
				<ProductCard product={product} quantity={quantity} key={product.id} page="order-details"/>
			)
		})
	}

	renderMainContent = () => {
		return (
			<div className="item-list">
				{this.renderItemList(this.props.order.items)}
			</div>
		)
	}

	render() {
		let { order } = this.props;
		if (this.props.isFetching) {
			return <Loader />
		} else if (order) {
			return (
				<GridLayout
					rootClass="order-details"
					headerContent={`Order Details (#${order.id})`}
					renderMainContent={this.renderMainContent}
					renderSidebarHeader={this.renderSidebarHeader}
					renderSidebarContent={this.renderSidebarContent}
				/>
			)
		} else {
			return <div>No such order found</div>;
		}
	}	
}

const mapStateToProps = (state, ownProps) => {
	return {
		order: state.orders.items.find(order => order.id === Number(ownProps.match.params.id)),
		isFetching: state.orders.isFetching
	}
}

export default connect(
	mapStateToProps,
	{ fetchOrder }
)(OrderDetails);