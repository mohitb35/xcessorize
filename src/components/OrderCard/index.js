import React from 'react';
import { Link } from 'react-router-dom';

import { formattedDate } from '../../utils';

import './OrderCard.css';

function renderOrder (order) {
	const { id, orderDate, total, payment, name, address } = order;
	return (
		<article className="order-card">
			<div className="order-card-section">
				<label>Order #{id}</label>
				<div className="info-wrapper">
					<div className="info">{formattedDate(new Date(orderDate))}</div>
				</div>
			</div>
			<div className="order-card-section">
				<label>Ship to</label>
				<div className="info-wrapper">
					<div className="info">{name}</div>
					<div className="info">{address.city}</div>
				</div>
			</div>
			<div className="order-card-section">
				<label>Total</label>
				<div className="info-wrapper">
					<div className="info">₹ {total}</div>
					<div className="info">Payment method: {payment}</div>
				</div>
			</div>
			<Link className="order-link" to={`/orders/${id}`}>
				<button className="view-order-button">View Order</button>
			</Link>
		</article>
	)
}

const OrderCard = (props) => {
	return (
		renderOrder(props.order)
	)
}

export default OrderCard;