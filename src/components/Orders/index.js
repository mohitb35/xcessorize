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
		const { isFetching, fetchError, orders } = this.props;
		return (
			<div className="orders">
				<h1 className="page-header">My Orders ({orders.length})</h1>
				{ isFetching && 
				<Loader />
				}
				{ !(isFetching || fetchError) && orders.length === 0 && 
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
		isFetching: state.orders.isFetching,
		fetchError: state.orders.fetchError
	}
}

export default connect(
	mapStateToProps,
	{ fetchOrders }
)(Orders);