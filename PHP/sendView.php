<?php
  header("Content-Type: text/xml");
  echo '<?xml version="1.0" ?>';

	include 'map.inc';
	session_start();

	$x 				    = $_SESSION["x"];
	$y 				    = $_SESSION["y"];
	$orientation 	= $_SESSION["orientation"];
	$chaine 		  = '';

	for($i=0;$i<7;$i++) {
  		for($j=-2;$j<3;$j++) {
    		$ii=ceil($i/2);

    		switch ($orientation) {
    			case '0':	$xx=$x+$ii;
    						    $yy=$y+$j;
    						    break;

    			case '1':	$xx=$x-$j;
    						    $yy=$y+$ii;
    						    break;

    			case '2':	$xx=$x-$ii;
    						    $yy=$y-$j;
    						    break;

    			case '3':	$xx=$x+$j;
    						    $yy=$y-$ii;
    						    break;

    			default:	break;
    		}
    		if ($xx<0 || $xx>29 || $yy<0 || $yy>29) {
   				$chaine.= '1';
			} else {
   				$chaine.= $map[$yy][$xx];
			}
    		if ($j<2) {
     			 $chaine.=",";
  			}
  		}
  		if ($i<6) {
    		$chaine.=";";
  		}
	}

  echo '
        <racine>
          <vue>',$chaine,'</vue>
          <direction>', $orientation,'</direction>
        </racine>';

?>