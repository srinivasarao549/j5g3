var f = function(klass)
{
	return function(properties) { return new klass(properties); }
};

/* MODULES */
$.Animate = Animate;
$.Draw = Draw;
$.Property = Property;
$.Util = Util;
$.Collision = Collision;

/* CLASSES */
$.Action = Action;
$.Clip   = Clip;
$.DisplayObject = DisplayObject;
$.Image = Image;
$.Range = Range;
$.Rect = Rect;
$.Sprite = Sprite;
$.Spritesheet = Spritesheet;
$.Text = Text;
$.Tween = Tween;
$.Physics = Physics;

$.action = f(Action);
$.clip   = f(Clip);
$.image  = f(Image);
$.range  = f(Range);
$.rect   = f(Rect);
$.sprite = f(Sprite);
$.spritesheet = f(Spritesheet);
$.text   = f(Text);
$.tween  = f(Tween);
$.physics= f(Physics);

})(this, document);
