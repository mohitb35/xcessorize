import React from 'react';
import { Link } from 'react-router-dom';
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
		const navMenuClasses = `nav-menu ${this.state.isMenuOpen ? 'open' : ''}`;
		const menuButtonClasses = `menu-button ${this.state.isMenuOpen ? 'open' : ''}`;
		return (
			<header className="header">
				<div className="nav-first">
					<div className="container">
						<div className="brand">
							<img src={logo} className="brand-image" alt="brand-logo"/>
							<span className="brand-name">Xcessorize</span>
						</div>
						<div className={menuButtonClasses} id="menu-button" onClick={this.toggleMenu}>
							<span className="menu-label">Menu</span>
							<span className="menu-icon"></span>
						</div>
					</div>
				</div>
				<div className={navMenuClasses}>
					<ul className="nav-link-container">
						<li className="nav-link">
							<Link to="/">Home</Link>
						</li>
						<li className="nav-link">
							<Link to="/orders">Orders</Link>
						</li>
						<li className="nav-link">
							<Link to="/cart">
								Cart
								<span class="cart-item-count">{this.props.cartItemCount}</span>
							</Link>
						</li>
						<li className="nav-button">
							<GoogleAuth />	
						</li>
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

export default connect(
	mapStateToProps
)(Header);