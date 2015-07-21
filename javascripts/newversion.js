$(function() {          
      var mq = window.matchMedia( "(max-device-width: 1200px)" );
      var listsClicked = 0;
      var listNum = 0;
      var listItemsHeight = 0;
      var artLists = '';
      $('#contentDisplayer').before('<div style="width:100%;height:135px;"></div>');
      $.getJSON('articles/list.json',function(data) {
      		artLists = '<ul id="article_list">';
      	$.each(data.lists,function(k,v) { //$.each sync
      		
      			artLists += '<li class="zmh_cursor" data-target="'+v.where+'">'+v.name+'</li>';
      		
      	});
      	artLists += '</ul>';
      	$('#articleLists').append(artLists);
      	$('.zmh_cursor').on('click',function(e) {
      		e.preventDefault();
      		$('.currentItem').removeClass('currentItem');
      		$(e.target).addClass('currentItem');
       		var _target = $(e.target).data('target');  //get the value data-*

       		 $.get('articles/'+_target+'.html', function(data) {
          	 $('#contentDisplayer').html(data);
       		 });
        }); 
         mediaSizeChange(mq); //for First-time Load 
         mq.addListener(mediaSizeChange);
      });

      $.getJSON('usefullinks.json',function(data) {
        usflinks = '<ul>';
        $.each(data.usflinks,function(k,v) {
          usflinks += '<li><a href="' + v.linkto + '">' + v.linkname + '</a></li>'
        });
        usflinks += '</ul>';
        $('#usflinks').after(usflinks);
      });

        

      function mediaSizeChange(mediaQuery) { //Listening to the Media Query Change
        if( mediaQuery.matches ){
        	$('#toggleArticleLists').off();
        	$('#contentDisplayer').off();
        	$('#contentDisplayer').on('click',function(e) {
        		e.preventDefault();
        		if(listsClicked === 1) {
        			 $('#articleLists').animate({height:40+'px'},200,function() {
                   $('#article_list').css('display','none');
                   $('#toggleArticleLists').text('EXPAND');
                });
        			listsClicked = 0;
        		}
        	});
            $('#article_list').css('display','none');
            $('#toggleArticleLists').on('click',function(e) {
              if(listsClicked === 0){                
                listNum = $('#article_list').children().length;
                listItemHeight = listNum*30 + 50;
              
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
          $('#articleLists').addDotedTracker();//Successfully tested!
        }
      }

      $('#toGithub').on('click',function(e) {
        e.preventDefault();
        window.open("https://github.com/Zalberth");    
      });

      $.get('articles/resume.html', function(data) {  //Load The Default Article
    	 $('#contentDisplayer').html(data);
      });    
});