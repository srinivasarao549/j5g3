Emitter = 

/**
 * @class Particle Emitter
 *
 * @extends j5g3.Clip
 */
j5g3.Emitter = Clip.extend(/**@scope j5g3.Emitter.prototype */ {

	paint: function()
	{
	var 
		clip = $.clip(),
		frames = clip.__frames = [], 
		i = this.__life
	;
		while(i--)
			frames.push([ this.__source ]);

		frames.push([ $.action(function() { 
			clip.remove();
		}) ]);

		this.add(clip);
		this.__on_emit(clip);

		Draw.Container.apply(this);
	}

}).properties({
	source: null, life: 10, on_emit: function() { }
}),
