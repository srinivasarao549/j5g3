
(function ($)
{
	var update = function() 
	{
			var 
			    t = new Date,
			    pi = Math.PI,
			    _secs = t.getSeconds() + t.getMilliseconds() / 1000,
			    _mins = t.getMinutes() + _secs / 60,
			    _hours= t.getHours() + _mins / 60
			;

			hour.rotation(pi + pi / 6  * _hours);
			mins.rotation(pi + pi / 30 * _mins);
			secs.rotation(pi + pi / 30 * _secs);
	},
	clock = $.clip( [[ $.image({ source: 'clock', x: -175, y: -175 }) ]]),
	hour  = $.clip( [[ $.image({ source: 'hour', x: -10, y: 210, scaleY: -1}) ]] ),
	mins  = $.clip( [[ $.image({ source: 'min', x: -10, y: 220, scaleY: -1}) ]] ),
	secs  = $.clip( [[ $.image({ source: 'sec', x: -10, y: 190, scaleY: -1}) ]] )
	;

	$.root.add([ clock, hour, mins, secs, update ])
		 .align_children('center')
		 .align_children('middle')
	;

	$.background.fillStyle('white');
	
	$.fps(60).run();
})
