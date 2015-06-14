$(function() {
             
      var mq = window.matchMedia( "(max-device-width: 800px)" );
      var listsClicked = 0;
      var listNum = 0;
      var listItemsHeight = 0;
      if(mq.matches) {
      	$('#article_list').css('display','none');
      	$('#toggleArticleLists').on('click',function(e) {
      		if(listsClicked === 0){
      			
      			listNum = $('#article_list').children().length;
      			listItemHeight = listNum*parseInt($('.zmh_cursor').css('height')) + 50;
      		
      			$('#articleLists').animate({height:listItemHeight+'px'},200,function() {
      				$('#toggleArticleLists').text('SHRINK');
      			});
      			$('#article_list').css('display','block');
      			listsClicked = 1;
      		}else {
      			$('#articleLists').animate({height:40+'px'},200,function() {
      				$('#article_list').css('display','none');
      				$('#toggleArticleLists').text('EXPAND');
      			});
      			
      			listsClicked = 0;
      		}
      		
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
        
              $('.zmh_cursor').on('click',function(e) {
              	e.preventDefault();
              	$('.currentItem').removeClass('currentItem');
              	$(e.target).addClass('currentItem');

              	var _target = $(e.target).data('target');  //get the value data-*
              	$.get('articles/'+_target+'.html', function(data) {
      		       $('#contentDisplayer').html(data);
      		    });
              	//Bind click event to ul
              });  

      
      });