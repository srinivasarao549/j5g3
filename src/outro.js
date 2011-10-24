
/** @ignore */
f = function(klass)
{
	return function(properties) { return new klass(properties); }
}
;

/* CLASSES */
j5g3.action = f(Action);
j5g3.clip   = f(Clip);
j5g3.dot    = f(Dot);
j5g3.emitter= f(Emitter);
j5g3.image  = f(Image);
j5g3.range  = function(a, b) { return new Range(a, b); };
j5g3.rect   = f(Rect);
j5g3.sprite = f(Sprite);
j5g3.spritesheet = f(Spritesheet);
j5g3.text   = f(Text);
j5g3.tween  = f(Tween);
j5g3.physics= f(Physics);
j5g3.map    = f(Map);

j5g3.version= VERSION;


})(this, document);
