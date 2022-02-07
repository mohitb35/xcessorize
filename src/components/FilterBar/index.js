import React from 'react';
import { connect } from 'react-redux';

import './FilterBar.css';

import { fetchCategories, fetchProducts } from '../../actions';

class FilterBar extends React.Component {
	state = {
			searchTerm: '',
			categoryId: 0,
			sortOption: 1
		}

	componentDidMount() {
		this.props.fetchCategories();
		this.props.fetchProducts(); //Reconsider. Is this the best place for this?
	}
	
	fetchProducts () {
		const { searchTerm, categoryId, sortOption } = this.state;
		this.props.fetchProducts(searchTerm, categoryId, sortOption);
	}

	handleSearchSubmit = (event) => {
		event.preventDefault();
		this.fetchProducts();
	}

	async handleCategoryChange (categoryId) {
		await this.setState( { categoryId: Number(categoryId) } );
		this.fetchProducts();
	}

	async handleSortChange (sortOption) {
		await this.setState( { sortOption: Number(sortOption) } );
		this.fetchProducts();
	}

	renderSearch () {
		return (
			<div className="search-widget">
				<form onSubmit={this.handleSearchSubmit}>
					<div>
						<input 
							type="text" 
							placeholder="What are you searching for?"
							name="term"
							value={this.state.searchTerm}
							onChange={(event) => this.setState({searchTerm: event.target.value})}
						/>
					</div>
				</form>
			</div>
		)
	}

	generateCategoryOptions () {
		console.log(this);
		return this.props.categories.map(category => {
			return (
				<option value={category.id} key={category.id}>{category.name}</option>
			)
		})
	}

	renderCategoryFilter () {
		return (
			<div className="filter-widget">
				<form>
					<label htmlFor="category-selector">Filter:</label>
					<select 
						name="category-option" 
						id="category-selector" 
						value={this.state.categoryId} 
						onChange={(event) => this.handleCategoryChange(event.target.value)}
					>
						<option disabled>Filter by category</option>
						<option value="0">All Categories</option>
						{this.generateCategoryOptions()}
					</select>
				</form>
			</div>
		)
	}

	renderSort () {
		return (
			<div className="sort-widget">
				<form>
					<label htmlFor="sort-option-selector">Sort:</label>
					<select 
						name="sort-option" 
						id="sort-option-selector" 
						value={this.state.sortOption} 
						onChange={(event) => this.handleSortChange(event.target.value)}
					>
						<option disabled>Sort by: </option>
						<option value="1">A - Z</option>
						<option value="2">Z - A</option>
						<option value="3">Price: ascending</option>
					</select>
				</form>
			</div>
		)
	}

	render() {
		return (
			<div className="filter-container">
				{this.renderSearch()}
				<div className="filter-options">
					{this.renderCategoryFilter()}
					{this.renderSort()}
				</div>
			</div>
		);
	}
	
}

const mapStateToProps = (state) => {
	return {
		categories: state.categories
	}
}

export default connect(
	mapStateToProps,
	{ fetchCategories, fetchProducts }
)(FilterBar);