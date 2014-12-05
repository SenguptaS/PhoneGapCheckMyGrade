<?php
require_once 'db.inc';
require_once 'output_generator.php';
// test comment
try
{
	$results = DB::query('SELECT * FROM user_classes_binding WHERE user_email=%s',$_POST['user_email']);
	$opt = new OutputGenerator(true);
	$opt->AddOutputAssoc($results);
	$opt->Output();
	return;
	
}
catch(Exception $ex)
{
	$opt = new OutputGenerator(false,$ex->getMessage());
	$opt->Output();
	return;
}