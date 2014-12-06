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
	
  var toast=function(msg){
  	$("<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'><h3>"+msg+"</h3></div>")
  	.css({ display: "block", 
  		opacity: 0.90, 
  		position: "fixed",
  		padding: "7px",
  		"text-align": "center",
  		width: "270px",
  		left: ($(window).width() - 284)/2,
  		top: $(window).height()/2 })
  	.appendTo( $.mobile.pageContainer ).delay( 1500 )
  	.fadeOut( 400, function(){
  		$(this).remove();
  	});
    };
	
	var doSignup = function() {
		submitAjaxForm("#frmSignup","signup.php",
		function(data,status)
		{
			var obj = JSON.parse(data);
			if(obj.success)
				{
					toast('Signup successful');
					$.mobile.changePage("#index");
				}
			else
				{
					toast(obj.error_message);
				}
		}
		,
		null
		);
	};
	
	var doLogin = function()
	{
		submitAjaxForm("#login_form","login.php",
		function(data,status)
		{
      console.log(data);
			var obj = JSON.parse(data);
			if(obj.success)
				{
					toast('Signup successful');
					$.mobile.changePage("#homepage");
				}
			else
				{
					toast(obj.error_message);
				}
		}
		,
		null
		);
	};
	
  $(document).bind("mobileinit", function(){
    $.mobile.allowCrossDomainPages = true;
  });
  
  
	// Setup the event handlers
	$(document).on("ready", function() {
    
		$.grV = new Object()
		$.grV.baseURL = "http://bay-area.net/cmpe235/proj/";
		
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