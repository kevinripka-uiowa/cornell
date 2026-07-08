$(function(){
	$('#storyjs-timeline').ready(function(){
		$('#storyjs-timeline .date').each(function(){
			var that = $(this),
				year = that.text().split(' ')[1];
			console.log(year);
		});
			
	});
});