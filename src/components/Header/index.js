import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './Header.css';
import logo from '../../assets/xcessorize-logo.png';

import GoogleAuth from '../GoogleAuth';

import { cartItemCount } from '../../utils';

class Header extends React.Component {
	state = {
		isMenuOpen: false
	}

	toggleMenu = () => {
		this.setState({
			isMenuOpen: !(this.state.isMenuOpen)
		})
	}

	render() {
		const { location, cartItemCount } = this.props;
		const navMenuClasses = `nav-menu ${this.state.isMenuOpen ? 'open' : ''}`;
		const menuButtonClasses = `menu-button ${this.state.isMenuOpen ? 'open' : ''}`;
		return (
			<header className="header">
				<div className="nav-first">
					<div className="container">
						<div className="brand">
							<Link to="/">
								<img src={logo} className="brand-image" alt="brand-logo"/>
								<span className="brand-name">Xcessorize</span>
							</Link>
						</div>
						<div className={menuButtonClasses} id="menu-button" onClick={this.toggleMenu}>
							<span className="menu-label">Menu</span>
							<span className="menu-icon"></span>
						</div>
					</div>
				</div>
				<div className={navMenuClasses}>
					<ul className="nav-link-container">
						<li className={`nav-link ${location.pathname ==='/' ? 'selected' : ''}`}>
							<Link to="/">Home</Link>
						</li>
						<li className={`nav-link ${location.pathname.includes('orders') ? 'selected' : ''}`}>
							<Link to="/orders">Orders</Link>
						</li>
						<li className={`nav-link ${location.pathname.includes('cart') ? 'selected' : ''}`}>
							<Link to="/cart">
								Cart
								<span className="cart-item-count">{cartItemCount}</span>
							</Link>
						</li>
						{ location.pathname !== '/login' && 
						<li className="nav-button">
							<GoogleAuth place="header"/>	
						</li>
						}	
					</ul>
				</div>
			</header>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		cartItemCount: cartItemCount(Object.values(state.cart))
	}
}

export default withRouter(
	connect(mapStateToProps)(Header)
);