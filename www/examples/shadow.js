
(function ($)
{
var
	/* Generates Random X */
	rx = function() { return $.rand(640); },
	ry = function() { return $.rand(480); },

	shadows = $.spritesheet('skeleton-shadow').grid(9,8),
	ss = $.spritesheet('skeleton').grid(9,8),
	ts = $.spritesheet('terrain').grid(12, 12, 1),

	/* Creates Shadow */
	shadow = function(s)
	{
	var 
		x = rx(), y = ry(),
		sh = shadows.clip(s).align_children('origin top').pos(x,y-9)
	;
		    action = $.action(function() {
		    	var dx = (320-world.x())-sh.x(), 
			    dy = (240-world.y())-sh.y(), 
			    a  = Math.atan(dx/dy),
			    h  = Math.abs(Math.cos(a))
			;

			sh
			  .scaleY(dy>0 ? 1 : -1)
			  .rotation(dy>0 ? -a : a)
			  .alpha(1-Math.abs(dy/h)/300)
			;
		    }),
		    clip   = $.clip([[ sh, ss.clip(s).pos(x,y).align_children('origin top'), action ]])
		;

		return clip;
	},

	map = [
		[ 118, 140, 140, 140, 140, 140, 140, 140, 140, 140, 140, 140, 119 ],
		[ 129, 125, 125, 125, 125, 125, 125, 125, 125, 125, 125, 125, 127 ],
		[ 129, 125, 125, 125, 125, 125, 125, 125, 125, 125, 125, 125, 127 ],
		[ 129, 125, 125, 125, 125, 125, 125, 125, 125, 125, 125, 125, 127 ],
		[ 129, 125, 125, 125, 125, 125, 125, 125, 125, 125, 125, 125, 127 ],
		[ 129, 125, 125, 125, 125, 125, 125, 125, 125, 125, 125, 125, 127 ],
		[ 129, 125, 125, 125, 125, 125, 125, 125, 125, 125, 125, 125, 127 ],
		[ 129, 125, 125, 125, 125, 125, 125, 125, 125, 125, 125, 125, 127 ],
		[ 129, 125, 125, 125, 125, 125, 125, 125, 125, 125, 125, 125, 127 ],
		[ 130, 116, 116, 116, 116, 116, 116, 116, 116, 116, 116, 116, 131 ]
	],

	light   = $.image('light'),
	player  = new Skeleton(),

	enemies = $.clip([[ shadow(0), shadow(18), shadow(36), shadow(54) ]]),
	terrain = $.map({ 'map': map, sprites : ts.sprites(), tw: 48, th: 48 }),

	world = $.clip([[terrain, enemies]]),

	keyboard,

	input = function()
	{
		if (keyboard[37]) world.move(3, 0);
		if (keyboard[38]) world.move(0, 3); 
		if (keyboard[39]) world.move(-3, 0); 
		if (keyboard[40]) world.move(0,-3);  
	},

	frames = player.pos(310, 220).frames(),
	lb = $.image('lightbulb').pos(-9, -48).scale(0.5,0.5)
;
	frames[0].push(lb);
	frames[1].push(lb);

	$.root.add([world, player, light, input]);

	$.run();
	$.Input.Keyboard.capture();
	keyboard = $.Input.Key;
})
