/*
 * j5g3 Sprite
 *
 * properties
 *
 */
j5g3.Sprite = function(properties)
{
	j5g3.DisplayObject.apply(this, [ properties ]);

	this.paint = j5g3.Engine.algorithms.drawSprite;
}
