import React from 'react';
import { connect } from 'react-redux';

import ProductList from '../ProductList';
import FilterBar from '../FilterBar';
import Loader from '../Loader';

const Home = (props) => {
	return (
		<div className="home">
			<FilterBar />
			{(props.didInvalidate || props.isFetching) &&  
			<Loader />
			}
			<ProductList page="home"/>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		didInvalidate: state.products.didInvalidate,
		isFetching: state.products.isFetching
	}
}

export default connect(
	mapStateToProps
)(Home);