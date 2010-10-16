/**
 * j5g3 v@VERSION - Javascript Game Engine 
 * http://hackerhosting.com/j5g3
 *
 * Copyright 2010, Giancarlo Bellido
 *
 * Dual licensed under the MIT or GPL Version 2
 * http://jquery.org/license
 *
 * Date: @DATE
 */

(function(window, document, undefined) {

	var VERSION = "@VERSION",
	    Action,
	    Animate,
	    // Requires js-class library.
	    Class,
	    Clip,
	    Collision,
	    DisplayObject,
	    Dot,
	    Draw,
	    Emitter,
	    Image,
	    Physics,
	    Range,
	    Rect,
	    Shape,
	    Sprite,
	    Spritesheet,
	    Text,
	    Tween,
	    Util,
	    J5G3,

	    canvas,
	    _extend,
	    _typeof,
	    context,

/* core.js defines $ */
