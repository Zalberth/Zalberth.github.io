$(function(){
	var today = new Date();
	$('#container .date').html(today.getFullYear() + '年' + (today.getMonth()+1) + '月');
	//在list中插入未来的七天
	var nextdayt = today.getTime();
	var nextday = new Date(nextdayt);
	var lists = '';
	for( var i = 0; i< 12; i++ ) {
		lists += '<li>' + (nextday.getMonth()+1)+'-'+ nextday.getDate() + '</li>';
		nextdayt = nextdayt + 1000*60*60*24;
	    nextday = new Date(nextdayt);
	} 
	//
	$('.list').append(lists);
})