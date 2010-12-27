/**
 * @preserve
 * j5g3 v@VERSION - Javascript Game Engine 
 * http://hackerhosting.com/j5g3
 *
 * Copyright 2010, Giancarlo F Bellido
 *
 * j5g3 is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * j5g3 is distributed in the hope that it will be useful
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the 
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Foobar. If not, see <http://www.gnu.org/licenses/>.
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
