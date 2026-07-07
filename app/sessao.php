<?
@ob_start();
@session_start ();
if ($_SESSION['vendnog'] != "dhs561BHU156_#sd156vg"){
	header ("Location: login.php?erro=1");
	exit();
}

ob_end_flush();
?>