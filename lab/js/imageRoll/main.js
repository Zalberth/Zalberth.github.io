(function($) {
	$.fn.abtImageScrollAbt = function(configs) {
		var html = '';
		var imgSet = '';
		var that = this;
		 $.getJSON('js/imageRoll/data.json',function(data) {
		 	for( var i = 0, len = data.images.length; i < len; i++) {
		 		imgSet += '<img class="img_zmh" src="' + data.basicFolder + data.images[i].imageUrl +'" width="100%" height="100%"></img>';
		 	}

		 	html = '<div class="leftArrow"><div class="arAreaLeft"></div></div>'
		         + '<div class="imageZone">' + imgSet + '</div>'
		         + '<div class="rightArrow"><div class="arAreaRight"></div></div>';
		 	that.append(html); //Notice that the async works here
		 });

		
	};
})(jQuery);