import React from 'react'

const GridHeader = (props) => {
	const {header} = props

	const SORT_NONE = 0;
	const SORT_DESC = 1;
	const SORT_ASC = 2;

	function getSortIcon(sortMode) {
		let _sortIcon, _sortMode = parseInt(sortMode, 10);

		if(isNaN(_sortMode)) return '';
		switch(_sortMode) {
			case SORT_NONE:
			default:
				_sortIcon = '';
				break;
			case SORT_DESC:
				_sortIcon = <div className="sorticon down"><i className="fa fa-sort-down"></i></div>
				break;
			case SORT_ASC:
				_sortIcon = <div className="sorticon up"><i className="fa fa-sort-up"></i></div>
				break;
		}

		return _sortIcon;
	}

	function onClickHandler(e) {
		const sortName = e.currentTarget.attributes['data-sort-name'].value
		const sortMode = e.currentTarget.attributes['data-sort-mode'].value
		props.callback(sortName, sortMode);
	}

	return (
		<thead>
			<tr>
				{
					header.map((item, headerIndex) => {
						let _style = (item.hasOwnProperty('widthMax')) ? item.widthMax + 'px' : 'initial',
							_sortIcon,
							_revertSortMode,
							_rowClass = '';

						// Sort Arrow
						if(item.sortable) {
							_sortIcon = getSortIcon(item.sortMode)
							_rowClass = 'sortable'
							_revertSortMode = (parseInt(item.sortMode, 10) === 1) ? 2 : 1;
							return (
								<th key={`header${headerIndex}`}
									style={{ width: _style }}
									className={_rowClass}
									onClick={onClickHandler}
									data-sort-mode={_revertSortMode}
									data-sort-name={item.sortName}>
										{item.caption}
										{_sortIcon}
								</th>
							)
						} else {
							return (
								<th key={`header${headerIndex}`} style={{ width: _style }}>
									{item.caption}
									{_sortIcon}
								</th>
							)
						}
					})
				}
			</tr>
		</thead>
	)
}
export default GridHeader