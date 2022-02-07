import React from 'react';

import ProductList from '../ProductList';
import FilterBar from '../FilterBar';

const Home = () => {
	return <div>
		<FilterBar />
		<ProductList />
	</div>
}

export default Home;