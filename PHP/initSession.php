<?php
	include 'map.inc'; 
	session_start();

	$_SESSION["y"] 				= $mapstarty;
	$_SESSION["x"] 				= $mapstartx;
	$_SESSION["orientation"] 	= 0;

	/*
		0 => east
		1 => south
		2 => west
		3 => north
	*/

?>