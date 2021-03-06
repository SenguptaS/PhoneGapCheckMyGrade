<?php
require_once 'db.inc';
require_once 'output_generator.php';

try
{
	$result = DB::queryFirstRow('SELECT * FROM users where user_email=%s',$_POST['user_email']);

	if($result == null)
	{
		throw new Exception('No such user');
		return;
	}
	else
	{
		if($result['user_password'] == sha1($_POST['user_password']))
		{
			$opt = new OutputGenerator(true);
			$opt->AddOutputAssoc($result);
			$opt->Output();
			return;
		}
		
		throw new Exception('Password incorrect');
	}

}
catch(Exception $ex)
{
	$opt = new OutputGenerator(false,$ex->getMessage());
	$opt->Output();
	return;
}
?>