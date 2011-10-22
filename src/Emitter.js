Emitter = 

/**
 * @class Particle Emitter
 * 
 * @extends j5g3.Clip
 */
j5g3.Emitter = Clip.extend(/**@scope j5g3.Emitter.prototype */ {
	
	paint: function()
	{
		var clip = $.clip();
		clip.add(this.source());
		clip.frames().length = this.life();
		clip.frames().push([Action.remove]);
		this.add(clip);
		if (this.__on_emit)
			this.__on_emit(clip);
	}

}).properties({
	source: null, life: 10, on_emit: null
}),
