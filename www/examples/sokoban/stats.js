
game.Stats = j5g3.Clip.extend({

	init: function(p)
	{
		var time = this.time  = j5g3.text('Time: 0').pos(40, 60);

		this.__frames = [[
			this.moves = j5g3.text('Moves: 0').pos(40, 20),
			this.pushes= j5g3.text('Pushes: 0').pos(40, 40),
			time,
			j5g3.action(function() { 
				var t = (new Date) - start_time;
				time.text('Time: ' + Math.floor(t/1000));
			})
		]]
		this.fillStyle('white').font('12px Arial');
		this._moves = 0;
		this._push  = 0;

		this._super(p);
	},

	addMoves: function(n) { this.moves.text('Moves: ' + (this._moves += n)); },

	addPushes: function(n) { this.pushes.text('Pushes: ' + (this._push  += n)); }

});
