$(function(){

	$('.slickQuizWrapper').on('click','.nextQuestion',function(){
			var wrapper = $('.slickQuizWrapper');
			$('html,body').animate({
		          scrollTop: wrapper.offset().top - 60
		        }, 1000);
		        return false;
	});
	
});