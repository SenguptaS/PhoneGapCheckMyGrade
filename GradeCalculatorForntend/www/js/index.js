(function($) {
	"use strict";

	var submitAjaxForm = function(formName,url,successHandler,errorHandler)
	{
		var frmData = $(formName).serialize();
		
		$.ajax({
	          type: "POST",
	          url: $.grV.baseURL+url,
	          cache: false,
	          dataType: "text",
	          data: frmData,
	          success: successHandler,
	          error: errorHandler
	      });
	};
	
	
	var doSignup = function() {
		submitAjaxForm("#frmSignup","signup.php",
		function(data,status)
		{
			var obj = JSON.parse(data);
			if(obj.success)
				{
					alert('Signup successful');
					$.mobile.changePage("#index");
				}
			else
				{
					alert(obj.error_message);
				}
		}
		,
		null
		);
	};
	
	var doLogin = function()
	{
		
	}
	
	// Setup the event handlers
	$(document).on("ready", function() {
		$.grV = new Object()
		$.grV.baseURL = "http://localhost/Grade/GradeCalculatorBackend/GradeCalculator/";
		
		$('#btn_do_Signup').on('click',doSignup);
		$('#do_login').on('click',doLogin);
		
		
	});

	// Load plugin
	$(document).on("deviceready", function() {
		StatusBar.overlaysWebView(false);
		StatusBar.backgroundColorByName("gray");
	});
}

)(jQuery);