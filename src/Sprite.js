/*
 * j5g3 Sprite
 *
 * Properties:
 *
 * source     Object    { image: HTML_Image_Spritesheet, x: xpos, y: ypos, w: sprite_width, h: sprite_height }
 *
 */
Class(
	Sprite = function(properties)
	{
		_extend(this, properties);
	},
	DisplayObject, { }, { paint: Draw.Sprite }
);
