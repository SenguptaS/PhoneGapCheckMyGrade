<?php
require_once 'db.inc';
require_once 'output_generator.php';

try
{
	$result = DB::queryFirstRow('SELECT * FROM users where user_email=%s',$_POST['email']);

	if($result == null)
	{
		$result = DB::insert('users',array
				(
						'user_email' => $_POST['user_email'],
						'user_first_name' =>$_POST['user_first_name'], 
						'user_last_name' => $_POST['user_last_name'],
						'user_phone_number' => $_POST['user_phone_number'],
						'user_student_id' =>  $_POST['use_student_id'],
						'user_password' => sha1( $_POST['user_password'] ),
						'user_profile_pic' => null,
						'user_access_token' => null,
						'user_type' => 1));
			
		
		$opt = new OutputGenerator(true);
		$opt->Output();
		return;	
	}
	else
	{
		throw Exception('User already exists');
	}
	
}
catch(Exception $ex)
{
	$opt = new OutputGenerator(false,$ex->getMessage());
	$opt->Output();
	return; 
}