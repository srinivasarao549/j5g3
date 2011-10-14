/**
 * Character Definition file for skeleton
 *
 * This file defines the basic animation and movements of our Skeleton character. It is 
 * intended to be reused between all our demo's.
 */

(function(window, $) {

/** Returns a Standard Character Clip */
window.Skeleton = function()
{

var
	ss   = $.spritesheet('skeleton').grid(9, 8),

	// Up, Right, Down, Left
	walk = $.clip([
		[ss.clip(36, 37, 38, 39, 40, 41, 42)],
		[ss.clip(54, 55, 56, 57, 58, 59, 60)],
		[ss.clip(0, 1, 2, 3, 4, 5, 6)],
		[ss.clip(18, 19, 20, 21, 22, 23, 24)]
	]),
	
	attack = $.clip([
		[ss.clip(45, 46, 47, 48, 49, 50, 51, 52, 53)],
		[ss.clip(63, 64, 65, 66, 67, 68, 69, 70, 71)],
		[ss.clip(9, 10, 11, 12, 13, 14, 15, 16, 17)],
		[ss.clip(18, 19, 20, 21, 22, 23, 24, 25, 26)]
	]),

	sit = $.clip([
		[ss.clip(43)],
		[ss.clip(61)],
		[ss.clip(7)],
		[ss.clip(25)]
	]),

	dead = $.clip([
		[ss.clip(44)],
		[ss.clip(62)],
		[ss.clip(8)],
		[ss.clip(26)]
	]),

	idle = $.clip([
		[ss.clip(36)],
		[ss.clip(54)],
		[ss.clip(0)],
		[ss.clip(18)]
	]),

	keyboard = $.Input.Key,

	onkeydown = $.action(function(evt)
	{
		if (keyboard[37]) left();
		else if (keyboard[38]) up();
		else if (keyboard[39]) right();
		else if (keyboard[40]) down();
		else clip.go(0);
	}),

	clip = $.clip({ frames: [ [ idle.stop(), onkeydown ], [ walk.stop() , onkeydown], [ attack.stop(), onkeydown ], [ sit.stop(), onkeydown ], [ dead.stop(), onkeydown ] ] })
		.stop()
	,

	all = function(method, val)
	{
		idle[method](val); walk[method](val); attack[method](val); sit[method](val); dead[method](val);
	},

	dir  = function(f) { all('go', f); }, 

	left = function() { clip.go(1); dir(3); },
	right= function() { clip.go(1); dir(1); },
	up   = function() { clip.go(1); dir(0); },
	down = function() { clip.go(1); dir(2); }
;

	all('width', 64); all('height', 64);
	return clip.align_children('origin');
}

})(this, this.j5g3);
