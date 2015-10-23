$(function(){
	var today = new Date();
	$('#container .date').html(today.getFullYear() + '年' + (today.getMonth()+1) + '月');
})