 (function($) {
  "use strict";
  
  var gApoint = 90.0;
  
  var computeGrade = function()
  {
  var currentPoints = Number( $('#points').val() );
  var currentGrade = "NA";
  
  if (currentPoints >= gApoint)
  {
  currentGrade = "A";
  }
  else
  {
  currentGrade = "F";
  }
  $('#finalgrade').text(currentGrade);
  };
  
  var saveSettings = function()
  {
  try {
  var aPoint = parseFloat( $('#gradeCutOff').val() );
  
  localStorage.setItem('gradeCutOff', aPoint);
  gApoint = aPoint;
  window.history.back();
  } catch (ex)
  {
  alert('Points must be a decimal value');
  }
  };
  
  var cancelSettings = function()
  {
  localStorage.clear();
  };
  
  
  // Setup the event handlers
  $( document ).on( "ready", function()
                   {
                   $('#computeGrade').on('click', computeGrade);
                   $('#saveSettings').on('click', saveSettings);
                   $('#cancelSettings').on('click', cancelSettings);
                   
                   var gradeCutOffSetting = localStorage.getItem('gradeCutOff');
                   
                   if (gradeCutOffSetting)
                   {
                   gApoint = parseFloat(gradeCutOffSetting);
                   }
                   
                   $('#gradeCutOff').val(gApoint);
                   
                   });
  
  // Load plugin
  $( document ).on( "deviceready", function(){
                   StatusBar.overlaysWebView( false );
                   StatusBar.backgroundColorByName("gray");
                   });
  }
  
  
  )(jQuery);