(function(window)
{
	function Star(o)
	{
		var self = this;
		var interval;
		
		self.div = document.createElement('div');
		self.div.className = 'shining_star';
		$(self.div).css({'left' : o.left , 'top' : o.top});
		
		interval = setTimeout(shine, 4000);
		
		function shine()
		{
			$(self.div).css({'opacity' : 0.3, scale : 1, rotate : 0}).
			transition({'opacity' : 1, scale : 1.5, rotate : 180, duration : 1000}, function()
			{
				$(self.div).delay(300).transition({'opacity' : 0.3, scale : 1, rotate : 360, duration : 1000});
			});
			
			interval = setTimeout(shine, 4000);
		}
	}	
	
	window.Star = Star;
	
})(window)