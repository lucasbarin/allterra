<meta charset="utf-8">
<?php
include ("configuracoes.php");

//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer-6.7.1/src/Exception.php';
require 'PHPMailer-6.7.1/src/PHPMailer.php';
require 'PHPMailer-6.7.1/src/SMTP.php';



?>