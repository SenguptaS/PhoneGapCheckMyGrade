<?php
require_once 'db.inc';
require_once 'output_generator.php';

try
{
	if(isset($_POST["add"]))
	{
	$results = DB::insert('user_classes_binding',
			array(
					'user_email' => $_POST['user_email'],
					'user_class_number' => $_POST['class_number']
					));
	}
	else
	{
		$results = DB::delete('user_classes_binding','user_email=%s and user_class_number=%s',
				$_POST['user_email'],
				$_POST['class_number']
				);
	}
	
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