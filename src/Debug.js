/*
 * Debug Module for j5g3
 */

(function($, undefined)
{
	var Debug = $.Debug = { };

	$.Action.klass = 'Action';
	$.Clip.klass   = 'Clip';
	$.DisplayObject.klass = 'DisplayObject';
	$.Draw.klass = 'Draw';
	$.Image.klass = 'Image';
	$.Property.klass = 'Property';
	$.Rect.klass = 'Rect';
	$.Sprite.klass = 'Sprite';
	$.Spritesheet.klass = 'Spritesheet';
	$.Text.klass = 'Text';
	$.Util.klass = 'Util';

	/* Add Image validation foor Draw */

	$.Debug.DrawImage = $.Draw.Image;
	$.Draw.Image = function(context) {
		if (!this._p.source)
			console.log ("Invalid Image.");
		else
			$.Debug.DrawImage.appy(this, [ context ]);
	};
})(j5g3);



