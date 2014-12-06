(function($) {
 "use strict";
 
 var onLoginSuccess = function(data,status)
 {
	 var obj = JSON.parse(data);
	 if(obj.success)
		 {
		 	alert('Login success');
		 	$.grV.user = obj.data;
		 	populateMainPage();
		 	$.mobile.changePage("#main_page");
		 }
	 else
		 {
		 	alert(obj.error_message);
		 }
 };
 
 var onLoginError = function(data,status)
 {
	 $("#notification").text("Login failed");
 };
 
 var doLogin = function()
 {
	 var frmData = $("#login_form").serialize();
	  $.ajax({
          type: "POST",
          url: $.grV.baseURL+"login.php",
          cache: false,
          dataType: "text",
          data: frmData,
          success: onLoginSuccess,
          error: onLoginError
      });

 }
 
 var populateMainPage = function()
 {
	 $("#welcomeHeader").text("Welcome " + $.grV.user.user_first_name + " " + $.grV.user.user_last_name);
	 $("#phoneNumber").text($.grV.user.user_phone_number);
	 $("#studentID").text($.grV.user.user_student_id);
	 $("#email").text($.grV.user.user_email);
	 
 }
 
 // Setup the event handlers
 $( document ).on( "ready", function()
                  {
                  
	 			  $.grV = new Object()
	 			  $.grV.baseURL = "http://localhost/GradeCalculator/";
	 			  
				  $("#popupDiv").popup();
					 			  
	 			  $('#do_login').on('click', doLogin);
                  $('#main_page').on('load',populateMainPage);
	 			  $('#saveSettings').on('click', saveSettings);
                  $('#cancelSettings').on('click', cancelSettings);

                  var gradeCutOffSetting = localStorage.getItem('gradeCutOff');
                  
                  if (gradeCutOffSetting)
                  {
                    gApoint = parseFloat(gradeCutOffSetting);
                  }
                  
                  $('#gradeCutOff').val(gApoint);
                  
                  
                  
                  });

 $( document ).bind( "mobileinit", function() {
	    // Make your jQuery Mobile framework configuration changes here!
	 $.mobile.allowCrossDomainPages = true;
	});
 
 // Load plugin
 $( document ).on( "deviceready", function(){
                  StatusBar.overlaysWebView( false );
                  StatusBar.backgroundColorByName("gray");
                  });
 }
 )(jQuery);