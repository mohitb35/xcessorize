import React from "react";

import './GridLayout.css';

class GridLayout extends React.Component {
	renderSidebar() {
		return (
			<div className="grid-side-bar">
				<div className="summary">
					<div className="summary-header">{this.props.renderSidebarHeader()}</div>
					{ this.props.renderSidebarContent() }
				</div>
			</div>
		)
	}

	render() {
		return (
			<div className={`grid-page ${this.props.rootClass}`}>
				<h1 className="grid-page-header">{this.props.headerContent}</h1>
				<div className="grid-main-content">
					{ this.props.renderMainContent() }
				</div>
				{ this.renderSidebar() }
			</div>
		)
	}
}

export default GridLayout;