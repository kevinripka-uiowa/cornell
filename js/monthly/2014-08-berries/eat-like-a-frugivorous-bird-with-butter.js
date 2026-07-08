$(function(){
	
	var bird,weight;
	var gramx = 453.592,
		butter_fat = 91.65,
		blueberry_wt = 1.36,
		bperpint = 217;
	var x = {
		phainopepla : {
			fat : 0.0236,
			berries : .1572
		},
		cedar : {
			fat : 0.1666,
			berries : .9975
		}
	};
	
	$('#frug-intro button').on('click',function(){
		bird = $(this).data('bird');
		$('#frug-intro').fadeOut(400,function(){
			$('#frug-weight-collect').fadeIn();
		});
		return false;
	});
	
	function commaSeparateNumber(val){
	    while (/(\d+)(\d{3})/.test(val.toString())){
	      val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
	    }
	    return val;
	  }
	
	var buildBirds = function(){
	
		var weight_grams = weight * gramx;
	
			
		var main_berries = function(count,div){
			var $berry;
			for (var i = 1; i < count+1; i++){
				$berry = $('<div />').addClass('berry');
				div.append($berry);
				if (i!=0 && i%100 == 0) {
					div.append($('<br />'));
				}
			}
		}
		
		
		
		
		var churn_butter = function(weight,bird,text_div,butter_div) {
			var sticks = (weight_grams * x[bird].fat)/butter_fat;
				sticks = sticks.toFixed(2),
				sticksNoZeroes = parseFloat(sticks),
				butter_counter = 0;
			
			text_div.text(sticksNoZeroes);
			
			var butter,
				butter_width = 64;
			
			for (var i = sticks; i > 0; i-- ) {
				butter = $('<div />').addClass('butter');
				
				if (i < 1) {
					butter.css('width',(butter_width * i) + 'px');
				} else {
					butter.css('width','64px')
				}
				
				butter_div.append(butter);
				butter_counter++;
				if (butter_counter % 5 == 0) {
					butter_div.append($('<br />'));
				}
				
				
			}
						
				
		};
		
		var make_blueberries = function(weight,bird,text_div,text2_div,berry_div) {
			var blues = Math.round((weight_grams * x[bird].berries)/blueberry_wt);
			
			text_div.text(commaSeparateNumber(blues));
			
			var pints = Math.round(blues/bperpint);
			text2_div.text(commaSeparateNumber(pints) + ' pints');
			
			for (var i = 1; i < pints+1; i++){
				$berry = $('<div />').addClass('pint');
				berry_div.append($berry);
			}
			
		};
		
		main_berries(264,$('#mistletoe'));
		churn_butter(weight_grams,'phainopepla',$('#phainopepla-butter-fat'),$('#phainopepla-butter'));
		make_blueberries(weight_grams,'phainopepla',$('#phainopepla-blueberry-text'),$('#phainopepla-blueberry-text-2'),$('#phainopepla-blueberries'));
		main_berries(228,$('#cedar-berries'));
		churn_butter(weight_grams,'cedar',$('#cedar-butter-fat'),$('#cedar-butter'));
		make_blueberries(weight_grams,'cedar',$('#cedar-blueberry-text'),$('#cedar-blueberry-text-2'),$('#cedar-blueberries'));
		
		
		
	};
	
	$('#frug-weight-collect form').on('submit',function(){
		var input_val = $('#frug-weight').val();
				
		if ((!input_val) || (input_val == '') || (isNaN(input_val))) {
			alert('Please enter a number');
		} else {
			weight = input_val;
			$('#frug-weight-collect').fadeOut(400,function(){
				$('#'+bird).fadeIn();
			});
			
			buildBirds();
		}
		
		return false;
	});
	
	$('.frug-bird-infographic button').on('click',function(){
		var bird = $(this).data('bird');
		$('.frug-bird-infographic:visible').fadeOut(400,function(){
			$('#'+bird).fadeIn(400);
		});
	});
	
	
});