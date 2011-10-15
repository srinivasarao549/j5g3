
f = function(klass)
{
	return function(properties) { return new klass(properties); }
}
;

/* CLASSES */
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
