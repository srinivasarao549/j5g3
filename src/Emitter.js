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
		clip = $.clip({ parent: this }),
		frames = clip.__frames = [], 
		to_remove= this._toRemove || (this._toRemove = []),
		i = this.__life
	;
		while(i--)
			frames.push([ this.__source ]);

		frames.push([ $.action(function() { 
			to_remove.push(clip); 
		}) ]);

		this.add(clip);
		this.__on_emit(clip);

		Draw.Container.apply(this);

		while (i = to_remove.pop())
			i.remove();
	},

	_toRemove: null

}).properties({
	source: null, life: 10, on_emit: function() { }
}),
