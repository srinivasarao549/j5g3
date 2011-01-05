var f = function(klass)
{
	return function(properties) { return new klass(properties); }
};

/* MODULES */
$.Animate = Animate;
$.Draw = Draw;
$.Util = Util;
$.Collision = Collision;

/* CLASSES */
$.Action = Action;
$.Clip   = Clip;
$.DisplayObject = DisplayObject;
$.Dot    = Dot;
$.Emitter = Emitter;
$.Image = Image;
$.Range = Range;
$.Rect = Rect;
$.Shape = Shape;
$.Sprite = Sprite;
$.Spritesheet = Spritesheet;
$.Text = Text;
$.Tween = Tween;
$.Physics = Physics;
$.Map = Map;

$.action = f(Action);
$.clip   = f(Clip);
$.dot    = f(Dot);
$.emitter= f(Emitter);
$.image  = f(Image);
$.range  = function(a, b) { return new Range(a, b); };
$.rect   = f(Rect);
$.sprite = f(Sprite);
$.spritesheet = f(Spritesheet);
$.text   = f(Text);
$.tween  = f(Tween);
$.physics= f(Physics);
$.map    = f(Map);


})(this, document);
