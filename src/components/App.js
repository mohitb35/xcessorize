import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import './App.css';

import Header from './Header';
import Home from './Home';
import Cart from './Cart';
import Checkout from './Checkout';
import Orders from './Orders';
import OrderDetails from './OrderDetails';
import Footer from './Footer';

const App = () => {
  return (
    <div className="App">
		<BrowserRouter>
			<Header />
			<main class="container">
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/cart" exact component={Cart} />
					<Route path="/checkout" component={Checkout} />
					{/* <PrivateRoute path="/checkout" component={Checkout} /> */}
					<Route path="/orders" component={Orders} />
					{/* <PrivateRoute path="/orders" component={Orders} /> */}
					<Route path="/orders/:id" exact component={OrderDetails} />
					{/* <PrivateRoute path="/orders/:id" exact component={OrderDetails} /> */}
				</Switch>
			</main>
			<Footer />
		</BrowserRouter>
    </div>
  )
}

export default App;
