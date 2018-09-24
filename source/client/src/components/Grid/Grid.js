import React, { Component } from 'react'
import axios from 'axios'
import Configuration from '../../conf'

import GridHeader from './GridHeader'
import GridBody from './GridBody'
import GridNav from './GridNav'
import './Grid.css'

class Grid extends Component {

	constructor(props) {
		super(props)
		this.state = {
			currentPage: 0,
			data: null,
			sortColumn: '',
			sortMode: 0
		}
	}

	componentWillMount() {
		this.loadData()
	}

	loadData(options = {}) {
		let url = `${Configuration.WEB_SERVER_EP}${Configuration.GET_DATA}&nbItemsPerPage=${Configuration.NB_ITEMS_PER_PAGE}&page=${this.state.currentPage}`;

		if (options.hasOwnProperty('sortColumn'))
			url += '&sortColumn=' + options.sortColumn;
		else {
			options.sortColumn = this.state.sortColumn
			url += '&sortColumn=' + this.state.sortColumn
		}
		if (options.hasOwnProperty('sortMode'))
			url += '&sortMode=' + options.sortMode;
		else {
			options.sortMode = this.state.sortMode
			url += '&sortMode=' + this.state.sortMode
		}

		if (options.hasOwnProperty('currentPage'))
			url += '&page=' + options.currentPage;
		else{
			options.currentPage = this.state.currentPage
			url += '&page=' + this.state.currentPage
		}

		axios.get(url)
			.then(function (response) {
				this.setState({
					data: response.data,
					sortColumn: options.sortColumn,
					sortMode: options.sortMode ,
					currentPage: options.currentPage
				})
			}.bind(this))
	}

	headerOnClickHandler(sortColumn, sortMode) {
		this.loadData({'sortColumn': sortColumn, 'sortMode': sortMode })
	}

	navOnClickHandler(pageId) {
		this.loadData({'currentPage': pageId })
	}
	render() {
		if (!this.state.data) {
			return <div><img src="../images/logo.svg" alt="" /></div>
		} else {
			return (
				<div className="mainGrid">
					<div className="grid" id={this.props.id}>
						<table>
							<GridHeader header={this.state.data.header} callback={this.headerOnClickHandler.bind(this)} />
							<GridBody rows={this.state.data.rows} />
						</table>
					</div>
					<GridNav id={this.props.id}
						nbMaxItems={this.state.data.NbTotalItems}
						nbItemsPerPage={Configuration.NB_ITEMS_PER_PAGE}
						currentPage={this.state.currentPage}
						callback={this.navOnClickHandler.bind(this)} />
				</div>
			)
		}
	}
}

export default Grid;