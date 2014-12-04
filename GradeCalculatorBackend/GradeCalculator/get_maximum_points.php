<?php
require_once 'db.inc';
require_once 'output_generator.php';

try
{
	$results = DB::query('SELECT * FROM maximum_points WHERE user_email=%s AND user_class_number=%s',$_POST['user_email'],$_POST['user_class_number']);
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