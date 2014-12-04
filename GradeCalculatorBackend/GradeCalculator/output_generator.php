<?php

class OutputGenerator
{
	var $isSuccess;
	var $errmsg;
	var $data;
	
 	function __construct($success = false,$error_message ='Not instantiated')
 	{
 		$this->isSuccess = $success;
 		$this->errmsg = $error_message;
 		$this->data = array();
 	}
 	
 	function AddOutput($key,$value)
 	{
 		$this->data[$key] = $value;
 	}
 	
 	function AddOutput(array $assoc_array)
 	{
 		$this->data = array_merge($this->data,$assoc_array);
 	}
 	
 	function Output($return = false)
 	{
 		$this->data['success'] = $this->isSuccess;
 		
 		if(!$this->isSuccess)
 		{
 			$this->data['error_message'] = $this->errmsg;
 		}
 		
 		if($return)
 		{
 			return json_encode($data,true,3);
 		}
 		echo json_encode($data,true,3);
 	}
 	
}