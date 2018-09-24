import React from 'react'
import StringUtil from '../../tools/StringUtil'

const GridBody = (props) => {

	const TYPE_TEXT = 0;
	const TYPE_HTML = 1;
	const TYPE_LINK = 2;
	const TYPE_ICON = 4;

	const {rows} = props

	return (
		<tbody>
			{
				rows.map((row, rowIndex) => {
					return (
						<tr key={`Row-${rowIndex}`}>
							{
								row.map((cell, cellIndex) => {
									const _decoded = StringUtil.Html2Text(cell.caption)
									switch (cell['content-type']) {
										case TYPE_TEXT:
										default:
											return (
												<td key={`Cell-${rowIndex}-${cellIndex}`} title={_decoded}>
													{_decoded}
												</td>
											)
										case TYPE_HTML:
											return (
												<td key={`Cell-${rowIndex}-${cellIndex}`}
													title={_decoded}
													dangerouslySetInnerHTML={{ __html: cell.caption }} />)
										case TYPE_LINK:
											return (
												<td key={`Cell-${rowIndex}-${cellIndex}`} title={_decoded}>
													<a href={cell.url} target="_blank">{_decoded}</a>
												</td>
											)

										case TYPE_ICON:
											return (
												<td key={`Cell-${rowIndex}-${cellIndex}`} className="text-center">
													<i className={cell.icon}></i>
												</td>
											)
									}

								})
							}
						</tr>
					)
				})
			}
		</tbody>
	)
}
export default GridBody