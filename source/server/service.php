<?php
require_once('./libraries/Tools.php');
require_once('./libraries/WebServer.php');

const GET_DATA = 'getData';

$action = Tools::getHttpParam('action');
switch($action) {
	case GET_DATA:
		header("Access-Control-Allow-Origin: *");
		header('Content-Type: application/json');
		die(WebServer::getData());
	default:
		die("action = $action");
}
