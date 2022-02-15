import React from 'react';
import { connect } from 'react-redux';

import OrderCard from '../OrderCard';
import Loader from '../Loader';

import { fetchOrders } from '../../actions';

import './Orders.css';

class Orders extends React.Component {
	componentDidMount() {
		this.props.fetchOrders();
	}

	renderOrderList() {
		return this.props.orders.map( order => {
			return (
				<OrderCard order={order} key={order.id} />
			)
		})
	}

	render() {
		return (
			<div className="orders">
				<h1 className="page-header">My Orders ({this.props.orders.length})</h1>
				{ this.props.isFetching && 
				<Loader />
				}
				{ !this.props.isFetching && this.props.orders.length === 0 && 
					<div className="page-message">You haven't placed any orders yet. Orders placed will appear on this page.</div>
				}
				<div className="order-list">
					{this.renderOrderList()}
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		orders: state.orders.items,
		isFetching: state.orders.isFetching
	}
}

export default connect(
	mapStateToProps,
	{ fetchOrders }
)(Orders);