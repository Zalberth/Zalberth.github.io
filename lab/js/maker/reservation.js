$(function(){
	var today = new Date();
	$('#container .date').html(today.getFullYear() + '年' + (today.getMonth()+1) + '月');
	//在list中插入未来的七天
	var nextdayt = today.getTime();
	var nextday = new Date(nextdayt);
	var lists = '', day = '';

	for( var i = 0; i< 12; i++ ) {

		switch(nextday.getDay()) {
			case 0: day = '星期天'; break;
			case 1: day = '星期一'; break;
			case 2: day = '星期二'; break;
			case 3: day = '星期三'; break;
			case 4: day = '星期四'; break;
			case 5: day = '星期五'; break;
			case 6: day = '星期六'; break;
		}
		lists += '<li>' +
		         '<div class="item">' + 
		         	'<div class="date">' 
		         	+ (nextday.getMonth()+1) +'-'+ nextday.getDate() 
		         	+'</div>' 
		         	+ '<div class="weekday">'
		         	+ day 
		         	+ '</div>' + 
		          '</div>'		
		         +'</li>';

		nextdayt = nextdayt + 1000*60*60*24;
	    nextday = new Date(nextdayt);
	} 
	//
	$('.list').append(lists);
	$('.item').bind('click', function() {
		var sample = '<div class="bar"></div>';
		$(this).after(sample);
		$('.bar').animate({height:'60px'});
	});
})