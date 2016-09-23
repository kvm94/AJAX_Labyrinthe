<?php
	session_start();
	$x 				= $_SESSION["x"];
	$y 				= $_SESSION["y"];
	$orientation	= $_SESSION["orientation"];
	$turn 			= $_GET['turn'];	

	if ($turn == 1) {
		if ($orientation == 3) {
			$_SESSION["orientation"]= 0;
		} else {
			$_SESSION["orientation"]= $orientation+1;
		}
	} else if ($turn == 0) {
		if ($orientation == 0) {
			$_SESSION["orientation"]= 3;
		} else {
			$_SESSION["orientation"]= $orientation-1;
		}
	}
	echo $orientation;
?>