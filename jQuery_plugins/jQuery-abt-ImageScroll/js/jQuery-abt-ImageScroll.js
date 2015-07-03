(function($) {
	//jQuery required
	$.fn.abtImageScroll = function(configs) {
		var html = '';
		var imgSet = '';
		var that = this;
		var imgLeft = 0;
		var imgTop = 0;
		var imgListLength = 0;
		var imgArray = []; //array,do not use {}
		var tmpArray = [];
		var styleArray = [];
		 $.getJSON('js/data.json',function(data) {
		 	imgListLength = data.images.length;
		 	imgLeft = -3*5;
		 	imgTop = -3*5;
		 	//imgArray = new Array(imgListLength); //initilize the array
		 	for( var i = 0, len = imgListLength; i < len; i++) {		 				 		
		 		//console.log(imgLeft);
		 		if( i < len - 3 ) {
		 		imgSet += '<img class="img_zmh" src="' + data.basicFolder + data.images[i].imageUrl +'" style="z-index:'+i+';opacity:0;"></img>';
		 		} else {
		 			imgLeft = +imgLeft + 5;
		 		    imgTop = +imgTop +5;
		 			if( i < len -1 ) {
		 			  imgSet += '<img class="img_zmh" src="' + data.basicFolder + data.images[i].imageUrl +'" style="z-index:'+i+';opacity:0.2;left:'+imgLeft+'px;top:'+imgTop+'px"></img>';
		 		    } else if( i == len -1 ){		 		
		 		      imgSet += '<img class="img_zmh frontest" src="' + data.basicFolder + data.images[i].imageUrl +'" style="z-index:'+i+';opacity:1.0;left:'+imgLeft+'px;top:'+imgTop+'px"></img>';
		 		    }	
		 		}	 	    
		 	}
		 	html = '<div class="leftArrow"><div class="arAreaLeft"></div></div>'
		         + '<div class="imageZone">' + imgSet + '</div>'
		         + '<div class="rightArrow"><div class="arAreaRight"></div></div>';
		 	that.append(html); //Notice that the async works here

		 	$('.img_zmh').each(function() { //PUSHED IN TO ARRAY
		 			imgArray.push($(this));
		 	});

		 	for( var i = 0,len = imgArray.length; i < len; i++ ) {
		 		styleArray.push(imgArray[i].attr('style'));
		 	}

		 	$('.arAreaLeft').on('click',function() {		 		
		 		tmpArray.push(imgArray.pop());
		 		//console.log(imgArray);
		 		imgArray = tmpArray.concat(imgArray);
		 		
                tmpArray = []; //in this way ,tmpArray can be released without 
		 		
		 		$('.frontest').animate({left:"-50px",opacity:"0"},100,function() {
		 			$(this).removeClass('frontest');
		 			$(this).removeAttr('style');
		 			var tmpIndex = '-'+imgListLength;
		 			//$(this).css({'zIndex':tmpIndex,'opacity':'0'});
		 			for( var i = 0,len = imgArray.length; i < len; i++) {
		 				imgArray[i].attr('style',styleArray[i]);
		 				if( i == len-1) {
		 					imgArray[i].addClass('frontest');
		 				}
		 			}

		 		});
		 	});

		 	$('.arAreaRight').on('click',function() {	 		
		 		//先后移，再淡出
		 		tmpArray.push(imgArray[0]); //保存最下面的img
		 		for (var i = 0,len = imgListLength; i < len - 1; i++ ) {
		 			imgArray[i] = imgArray[i+1];
		 		}
		 		imgArray.pop();//弹出最后一个重复的Img
		 		imgArray = imgArray.concat(tmpArray); //这样将第一个img放到了数组的最后一个
		 		tmpArray = [];
		 		$('.frontest').removeClass('frontest'); 

		 		for( var i = 0,len = imgArray.length; i < len; i++ ) {
		 				imgArray[i].attr('style',styleArray[i]);
		 				if( i == len-1) {
		 					imgArray[i].addClass('frontest');
		 				}
		 		}
		 		
		 		var leftTmp = imgArray[imgListLength-1].css('left');
		 		imgArray[imgListLength-1].css({'left':'-50px','opacity':'0'});		 				 	
		 		imgArray[imgListLength-1].animate({left:leftTmp,'opacity':'1'},100,function() {
		 			
		 			
		 		});

		 	});
		 });

		
	};
})(jQuery);