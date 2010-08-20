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
	    Clip,
	    Class,
	    DisplayObject,
	    Draw,
	    Image,
	    Property,
	    Range,
	    Rect,
	    Sprite,
	    Spritesheet,
	    Text,
	    Util,

	    canvas,
	    _extend,
	    _typeof,
	    context,

/* core.js defines $ */
