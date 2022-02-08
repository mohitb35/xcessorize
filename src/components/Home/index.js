import React from 'react';

import ProductList from '../ProductList';
import FilterBar from '../FilterBar';

const Home = () => {
	return (
		<div className="home">
			<FilterBar />
			<ProductList page="home"/>
		</div>
	)
}

export default Home;