
Sokoban.Stats = j5g3.GDK.Element.extend({

	setup: function()
	{
	var 
		me = this
		time = this.time  = j5g3.text('Time: 0').pos(20, 80)
	;

		this.__frames = [[
			this.level = j5g3.text('Level: ').pos(20, 20),
			this.moves = j5g3.text('Moves: 0').pos(20, 40),
			this.pushes= j5g3.text('Pushes: 0').pos(20, 60),
			time,
			j5g3.action(function() { 
				var t = (new Date) - me.start_time;
				time.text('Time: ' + Math.floor(t/1000));
			})
		]]

		this.draw = j5g3.Draw.Void;
		this.fillStyle('white').font('12px Arial');
		this.reset();
	},

	reset: function()
	{
		this.start_time = new Date();
		this._push  = 0;
		this._moves = 0;
		this.addMoves(0);
		this.addPushes(0);
		this.setLevel(Sokoban.currentLevel*1+1);
	},

	addMoves: function(n) { this.moves.text('Moves: ' + (this._moves += n)); },

	addPushes: function(n) { this.pushes.text('Pushes: ' + (this._push  += n)); },

	setLevel: function(n) { this.level.text('Level: ' + n); }

});

