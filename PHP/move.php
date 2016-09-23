<?php
	include 'map.inc';
	session_start();
	$x 				= $_SESSION["x"];
	$y 				= $_SESSION["y"];
	$orientation 	= $_SESSION["orientation"];
	$move			= $_GET['move'];

	switch (( $orientation + $move) % 4) {
		case '0':	$x++; break;

		case '1':	$y++; break;

		case '2':	$x--; break;

		case '3':	$y--; break;

		default:	break;
	}
	if ($map[$y][$x] == 0) {	//Pour ne pas traverser les murs.
		$_SESSION["x"] = $x;
		$_SESSION["y"] = $y;
	}

?>