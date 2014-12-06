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
  		opacity: 0.50, 
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
		return false;
	};
	
	var doLogin = function()
	{
		submitAjaxForm("#login_form","login.php",
		function(data,status)
		{
			var obj = JSON.parse(data);
			if(obj.success)
				{
          $.grV.user = obj.data;
					//toast('Signup successful');
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
		return false;
	};
  
  var loadProfile = function()
  {
	$.mobile.changePage("#profilepage");
	    
	//Assign values to user profle page
	  $('#user_id').val($.grV.user.user_student_id);
	  $('#fname').val($.grV.user.user_first_name);
	  $('#lname').val($.grV.user.user_last_name);
	  $('#email').val($.grV.user.user_email);
	  $('#phone').val($.grV.user.user_phone_number);
	  
	  return false;
  };
  
  var launchGrader = function()
  {
	  //user_type = 1, student
	  //user_type = 0, instrcutor
	  
	  if($.grV.user.user_type == 1)
	  {
	  	$.mobile.changePage("#studcomputegrade");
	  }
	  else if($.grV.user.user_type == 0)
	  {
	  	$.mobile.changePage("#profcomputegrade");
	  }
	  return false;
  };
  
  var studComputeGrade = function()
  {
	
	$('#studGradeForm').append('<input type="hidden" name="user_email" value='+ $.grV.user.user_email +'>');  
	submitAjaxForm("#studGradeForm","compute_grade.php",
		function(data,status)
		{
			var obj = JSON.parse(data);
			console.log("$$$$$$$$$$$ " + obj.grade);
			if(obj.success)
				{
					$('#stud_lgarde').html("<h2>Grade: " + obj.grade + "</h2>");
	  			}
			else
				{
					toast(obj.error_message);
				}
		}
		,
		null
	 );
	return false;
  };
  
  var laodCourseList = function()
  {
	$.ajax({
          type: "GET",
          url: $.grV.baseURL+"get_classes.php",
          cache: false,
          dataType: "text",
          data: null,
          success: function(data, status){
  			var obj = JSON.parse(data);
  			if(obj.success)
  				{
  					$.mobile.changePage("#courselist");
					$('#courselistcontent').empty();
					for(var x in obj.data)
					{
						var ele = $('<p style="text-align: center;"><button class="ui-btn ui-btn-b" id='+obj.data[x].class_number+'>'+obj.data[x].class_number+'</button></p>');
						$('#courselistcontent').append(ele)
					}
  	  			}
  			else
  				{
  					toast(obj.error_message);
  				}
          },
          error: null
      });
	  return false;
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
    	$('#profile_info').on('click', loadProfile);
		$('#speed_grader').on('click', launchGrader);
		$('#stud_compute_grade').on('click', studComputeGrade);
		$('#course_list').on('click', laodCourseList);
		
		$('#back_profilepage').on('click', function(){$.mobile.changePage("#homepage"); return false;})
		$('#back_courselist').on('click', function(){$.mobile.changePage("#homepage"); return false;})
		$('#back_studgrader').on('click', function(){$.mobile.changePage("#homepage"); return false;})
		
	});

	// Load plugin
	$(document).on("deviceready", function() {
		StatusBar.overlaysWebView(false);
		StatusBar.backgroundColorByName("gray");
	});
}

)(jQuery);