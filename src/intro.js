/**
 * @license
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
 * @author Giancarlo Bellido
 *
 */

(

/**
 * @suppress {missingProperties}
 * @param {Window} window
 * @param document
 * @param {undefined=} undefined
 */
function(window, document, undefined) {

var 
	/** @const @constant */ VERSION = "@VERSION",

	/* Frames per Second */
	__fps = 31,

	canvas,
	context,
	/* This is used by the cache mechanism. It is a canvas element. */
	cache,

	j5g3,

/* core.js defines $ */
