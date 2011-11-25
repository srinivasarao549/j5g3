
(function ($)
{
	var ball = $.image('ball'),
	    F = $.physics({ target: ball }),
	    accel = function() { 

		// Access property directly for better perfomance.
	    	if (ball.__y>430)
		{
			ball.y(430);

			// Apply a force in ball if it hits the ground
			F.force(0, -F.vy()*1.9, 0, 0);
		}

		// Apply gravity force every frame.
		F.force(0, 0.98, 0, 0);
	    }
	;

	$.root.add([ ball, F, accel ]);
	$.run();
})
