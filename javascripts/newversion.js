$(function() {
             
      var mq = window.matchMedia( "(max-device-width: 800px)" );
      if(mq.matches) {
      	$('#article_list').css('display','none');
      	$('#articleLists').on('tap',function(e) {
      		$(this).animate({height:'100px'});
      	});
      }else {
      	      	            	              	             	        
      }
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

      
      });