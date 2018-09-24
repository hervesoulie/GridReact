import React, { Component } from 'react'
import loadingImage from '../../images/loading.gif'

class GridNav extends Component {

	constructor(props, {id, nbMaxItems, nbItemsPerPage, currentPage}) {
		super(props)
	}

	componentDidMount() {
		document.querySelector('.loading').style.opacity = 0;
	}
	componentDidUpdate() {
		document.querySelector('.loading').style.opacity = 0;
	}

	render() {

		const id = this.props.id
		const nbMaxItems = this.props.nbMaxItems
		const nbItemsPerPage = this.props.nbItemsPerPage
		const currentPage = this.props.currentPage

		let nbPages = parseInt(nbMaxItems / nbItemsPerPage, 10),
			_currentPage = parseInt(currentPage, 10),
			options = []

		if (nbPages * nbItemsPerPage < nbMaxItems) {
			nbPages++
		}
		for (let i = 0; i < nbPages; i++) {
			options.push('Page ' + (i + 1))
		}

		/**
		 * Handler when the user changes the current page
		 * @param Event e
		 */
		const onChangeHandler = (e) => {
			this.props.callback(e.currentTarget.value)
		}

		const onMoveFirstHandler = (e) => {
			document.querySelector('.loading').style.opacity = 1;
			this.props.callback(0)
		}

		const onMovePrevHandler = (e) => {
			document.querySelector('.loading').style.opacity = 1;
			this.props.callback((_currentPage - 1))
		}

		const onMoveNextHandler = (e) => {
			document.querySelector('.loading').style.opacity = 1;
			this.props.callback((_currentPage + 1))
		}

		const onMoveLastHandler = (e) => {
			document.querySelector('.loading').style.opacity = 1;
			this.props.callback((nbPages - 1))
		}

		const isFirstPage = (_currentPage === 0)
		const isLastPage = (_currentPage === (nbPages - 1))

		return (
			<div className="gridNav" id={`GridNav_${id}`}>
				<img src={loadingImage} className="loading" alt="Loading..." />
				<button disabled={isFirstPage} onClick={onMoveFirstHandler.bind(this)}>
					<i className="fas fa-angle-double-left"></i>
				</button>
				<button disabled={isFirstPage} onClick={onMovePrevHandler.bind(this)}>
					<i className="fas fa-angle-left"></i>
				</button>
				<select name="pageSelect" id={`pageSelector_${id}`} onChange={onChangeHandler.bind(this)} value={currentPage}>
					{
						options.map((text, value) => {
							return <option value={value} key={`option_${id}_${value}`}>{text}</option>
						})
					}
				</select>
				<button disabled={isLastPage} onClick={onMoveNextHandler.bind(this)}>
					<i className="fas fa-angle-right"></i>
				</button>
				<button disabled={isLastPage} onClick={onMoveLastHandler.bind(this)} style={{marginRight: '20px'}}>
					<i className="fas fa-angle-double-right"></i>
				</button>
			</div>
		)
	}
}
export default GridNav