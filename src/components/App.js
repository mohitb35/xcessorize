import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';

import Header from './Header';
import Home from './Home';
import Cart from './OrderFlow/Cart';
import Checkout from './OrderFlow/Checkout';
import Orders from './Orders';
import OrderDetails from './OrderDetails';
import Footer from './Footer';
import PrivateRoute from './PrivateRoute';
import Login from './Login';
import Toast from './Toast';

class App extends React.Component {
	render() {
		// throw new Error("Test error");
		return (
			<div className="app">
				<BrowserRouter>
					<Header />
					<main className="container">
						<Toast />
						<Switch>
							<Route path="/" exact component={Home} />
							<Route path="/cart" exact component={Cart} />
							<PrivateRoute path="/checkout" exact component={Checkout} />
							<PrivateRoute path="/orders" exact component={Orders} />
							<PrivateRoute path="/orders/:id" exact component={OrderDetails} />
							<Route path="/login" exact component={Login} />
						</Switch>
					</main>
					<Footer />
				</BrowserRouter>
			</div>
		)
	}
}

export default App;
