(function($) {
	$.fn.addDotedTracker = function(configs) {
		
		this.each(function() { //may have multiple jquery objs
		var positionState = $(this).css('position');
			if( positionState != 'static') {
					if(positionState === 'fixed'){
							$(this).on('click',function(e) {
								e.preventDefault();
								var 
								x, y;
							    //In Chrome
								x = e.clientX - parseInt($(this).css('left')) - 5;
								y = e.clientY - parseInt($(this).css('top')) - 5;
								 var marked = '<div class="circle" style="top:' + y + 'px;left:' + x +'px"></div>';
						         $(this).append(marked);
						         var settings = $.extend({
						         	finalOpacity:0.3,
						         	finalBkColor:'#ff0000',
						         	duration:200
						         },configs);
						       
						         $('.circle').animate({top:y- 5 + 'px',left:x - 5 + 'px',width:'20px',height:'20px',borderRadius:'10px',opacity:settings.finalOpacity,backgroundColor:settings.finalBkColor},settings.duration,function() {
						    	     $(this).remove();
						         });
							});
						}else if(positionState === 'absolute') {
								$(this).on('click',function(e) {
									e.preventDefault();
									var 
									x, y;
								    //In Chrome
									x = e.clientX + document.body.scrollLeft - parseInt($(this).css('left')) - 5;
									y = e.clientY + document.body.scrollTop - parseInt($(this).css('top')) - 5;
									 var marked = '<div class="circle" style="top:' + y + 'px;left:' + x +'px"></div>';
							         $(this).append(marked);
							         var settings = $.extend({
							         	finalOpacity:0.3,
							         	finalBkColor:'#ff0000',
							         	duration:200
							         },configs);
							       
							         $('.circle').animate({top:y- 5 + 'px',left:x - 5 + 'px',width:'20px',height:'20px',borderRadius:'10px',opacity:settings.finalOpacity,backgroundColor:settings.finalBkColor},settings.duration,function() {
							    	     $(this).remove();
							         });
								});
						}
					
			}
		});
	};
})(jQuery);