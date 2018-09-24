<?php

class Tools {

	/**
	 * Return get, post or cookie param value
	 *
	 * @param String $name
	 * @param Variant $default
	 * @return Variant
	 */
	public static function getHttpParam(String $name, $default = null) {
		if(isset($_REQUEST[$name]))
			return $_REQUEST[$name];
		else
			return $default;
	}
}