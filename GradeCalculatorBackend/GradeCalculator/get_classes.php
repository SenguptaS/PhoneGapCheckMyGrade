<?php
require_once 'db.inc';
require_once 'output_generator.php';

try
{
	$results = DB::query('SELECT * FROM classes');
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