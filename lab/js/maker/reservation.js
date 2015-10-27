$(function(){
	//好的做法是将时间从服务器同步，稍后修改
	var today = new Date();
	$('#container .date').html(today.getFullYear() + '年' + (today.getMonth()+1) + '月');
	//在list中插入未来的七天
	var nextdayt = today.getTime();
	var nextday = new Date(nextdayt);
	var lists = '', day = '';

	for( var i = 0; i< 7; i++ ) {

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

	//绑定伸缩事件
	$('.item').bind('click', function() {
		//console.log($(this).data('expanded'));
		if($(this).data('expanded') === undefined ) {
			var sample = '<div class="bar"></div>';
			$(this).after(sample);
		}

		if($(this).data('expanded') != undefined && $(this).data('expanded') === '1') {
			$(this).next().animate({height:'0px'});
			$(this).data('expanded','0'); 
		} else {		
			$(this).next().animate({height:'100px'});
			$(this).data('expanded','1'); 
		}
		
	});

	$('#apply').bind('click',function() {
		alert('TODO:申请进行时');
	});

	$('#header .isLogin').bind('click',function() {
		alert('TODO:状态显示，做成弹出框');
	});
})