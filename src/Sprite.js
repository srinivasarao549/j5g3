/*
 * j5g3 Sprite
 *
 * Properties:
 *
 * source     Object    { image: HTML_Image_Spritesheet, x: xpos, y: ypos, w: sprite_width, h: sprite_height }
 *
 */
Sprite = DisplayObject.extend({

	init: function(properties)
	{
		_extend(this, properties);
	},
	paint: Draw.Sprite
}),
