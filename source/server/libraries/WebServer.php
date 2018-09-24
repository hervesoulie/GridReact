<?php

class WebServer {
	const DEFAULT_MAX_ITEM_PER_PAGE = 15;
	const NB_MAX_ROWS = 100;
	const NB_HEADERS = 7;

	const SORT_NONE = 0;
	const SORT_DESC = 1;
	const SORT_ASC  = 2;

	const TYPE_TEXT = 0;
	const TYPE_HTML = 1;
	const TYPE_LINK = 2;
	const TYPE_ICON = 4;

	public static function getData() {
		$page = Tools::getHttpParam('page', 0);
		$nbItemsPerPage = Tools::getHttpParam('nbItemsPerPage', WebServer::DEFAULT_MAX_ITEM_PER_PAGE);
		$sortColumn = Tools::getHttpParam('sortColumn', '');
		$sortMode = Tools::getHttpParam('sortMode', WebServer::SORT_DESC);

		$start = $page * $nbItemsPerPage;
		$end = min(($start + $nbItemsPerPage), WebServer::NB_MAX_ROWS);
		$json = array(
			'NbTotalItems' => WebServer::NB_MAX_ROWS,
			'header' => array(),
			'rows'	=> array()
		);

		// Header

		for($i = 0; $i < WebServer::NB_HEADERS; $i++) {
			$columnCode = 'HEADER'.$i;
			if(($columnCode === $sortColumn)  || (empty($sortColumn) && $i === 0)){
				$json['header'][] = array(
					'caption'	=> 'HEADER '.$i,
					'sortable'	=> true,
					'sortMode'	=> $sortMode,
					'sortName'	=> 'HEADER'.$i,
					'widthMax'	=> ($i % 2 === 0) ? 150 : 100
				);
			} else {
				$json['header'][] = array(
					'caption'	=> 'HEADER '.$i,
					'sortable'	=> ($i < 4) ? true : false,
					'sortMode'	=> WebServer::SORT_NONE,
					'sortName'	=> 'HEADER'.$i,
					'widthMax'	=> ($i % 2 === 0) ? 150 : 100
				);
			}
		}

		// Rows
		for($i = $start; $i < $end; $i++) {
			$tmpRows = array();
			for($j = 0; $j < WebServer::NB_HEADERS; $j++) {
				if($j == 0 || $j > 3) {
					$tmpRows[] = array (
						'caption'		=> "CELL $i-$j",
						'content-type'	=> WebServer::TYPE_TEXT
					);
				}

				if($j == 1) {
					$tmpRows[] = array (
						'caption'		=> "<span style=\"font-weight:700;font-style:italic;\">CELL $i-$j</span>",
						'content-type'	=> WebServer::TYPE_HTML
					);
				}

				if($j == 2) {
					$tmpRows[] = array (
						'caption'		=> "CELL $i-$j",
						'content-type'	=> WebServer::TYPE_LINK,
						'url'			=> 'http://www.google.com'
					);
				}

				if($j == 3) {
					$tmpRows[] = array (
						'caption'		=> "CELL $i-$j",
						'content-type'	=> WebServer::TYPE_ICON,
						'icon'			=> 'fa fa-edit',
						'action'		=> '{"action": "edit", "params": {"id": "$i$j" }}'
					);
				}
			}
			$json['rows'][] = $tmpRows;
		}

		return json_encode($json);
	}
}