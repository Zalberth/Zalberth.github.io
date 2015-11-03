$(function(){
	//好的做法是将时间从服务器同步，稍后修改
	var today = new Date();
	$('#container .date').html(today.getFullYear() + '年' + (today.getMonth()+1) + '月');
	//在list中插入未来的七天
	var nextdayt = today.getTime();
	var nextday = new Date(nextdayt);
	var lists = '', day = '', applyDialog = '';


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
		var that = $(this);
		$(this).after('<div id="masker"><div class="loader">Loading</div></div>');
		//ajax:to get the login state
		$.ajax({
			url:'/loginValidation',
			type:'GET',
			dataType:'json',
			success:function(data, textStatus) {
				if(data.loginStatus === '1') {
					$('.loader').remove();
					applyDialog = '<form id="applyDialog" action="/sendReserv" method="POST">'+
					'<h1>' + data.orgname + '</h1>' + 
					'<input id="whichday" type="text">' +
					'<input id="starttime" type="text">'+
					'<input id="endtime" type="textt">'+
					'<input id="submitReserv" type="button" value="提交">'+
					'<input id="cancelbtn" type="button" value="取消">' + '</form>';
					//插入时间选择框
					that.after(applyDialog);
					$('#cancelbtn').on('click', function() {
						$('#applyDialog').remove();
						$('#masker').remove();
						$('#secondhalf').remove();
					});
					$('#submitReserv').on('click', function() {
						var sencondhalf = '<div id="secondhalf">' +
										  '<div id="flex1"><div class="days">10-11</div><div class="days">10-22</div></div>' +
										  '<div id="flex2"><div class="days">10-11</div><div class="days">10-22</div></div>' +
										  '<div id="flex3"><div class="days">10-11</div><div class="days">10-22</div></div>' +
										  '<div id="flex4"><div class="days">10-11</div></div>' + '</div>';
						that.after(sencondhalf);
						$('.days').on('click', function() {
							$(this).addClass('changeColor');
							function removeHalf() {
								$('#secondhalf').remove();
							};
							setTimeout(removeHalf,500);

						});
					});
					//alert('TODO:用户已经登录');
				}
			}
		});
		
	});

	$('#header .isLogin').bind('click',function() {
		alert('TODO:状态显示!');
	});
	

})