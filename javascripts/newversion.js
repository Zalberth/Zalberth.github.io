$(function() {
        
      var mq = window.matchMedia( "(max-device-width: 800px)" );
      if(mq.matches) {
      	$('#article_list').css('display','none');
      }
       

      var rightsecWidth = parseInt($('#mainbody').css('width'))-parseInt($('#leftsec').css('width')) - 10;
        $('#right_container').css('width' , rightsecWidth + 'px');
      
        $(window).resize(function() {
          rightsecWidth = parseInt($('#mainbody').css('width'))-parseInt($('#leftsec').css('width')) - 10;
          $('#right_container').css('width' , rightsecWidth-1 + 'px'); //minus 1 can fix a bug
        });

        $('#zmh_links').on('click',function(e) {
          e.preventDefault();
          window.open("https://github.com/Zalberth");    
        });

       	$.get('articles/resume.html', function(data) {
        	$('#contentDisplayer').html(data);
        });
  
        $('#article_list').on('click',function(e) {
        	e.preventDefault();
        	var _target = $(e.target).data('target');  //get the value data-*
        	$.get('articles/'+_target+'.html', function(data) {
		       $('#contentDisplayer').html(data);
		    });
        	//Bind click event to ul
        });
        
        

        $('#tools').on('click',function(e) {
        	 e = e || window.event;  
    		if(e.stopPropagation) { //W3C阻止冒泡方法  
      		  e.stopPropagation();  
    		} else {  
      		  e.cancelBubble = true; //IE阻止冒泡方法  
    		}  
    		
        });
      });