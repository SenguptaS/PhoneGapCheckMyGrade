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

	function AddOutputAssoc($assoc_array)
	{
		 $this->data = array_merge_recursive($this->data,(array) $assoc_array); 
	}

	function Output($return = false)
	{
		$this->data['success'] = $this->isSuccess;
			
		if($this->isSuccess === false)
		{
			$this->data['error_message'] = $this->errmsg;
		}
			
		if($return)
		{
			return json_encode($this->$data,true,3);
		}
		
		echo json_encode($this->data);
	}
}