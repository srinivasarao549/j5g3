
function game($, doc)
{
var
	ss = $.spritesheet('ss').grid(20,10),

	Gorilla = $.GDK.User.extend({
		
		init: function(p)
		{
			this._super(p);

			this.spritesheet(ss);
			this.states({
				idle: [ 60, 61, 62, 63, 64 ],
				shoot: [ 20, 21, 22, 23, 24, 23, 22, 21 ]
			});

			this.__frames[0][0].scaleT(3);
			this.stop();
		}

	}),

	gorilla = (new Gorilla()).pos(100,100).scaleT(2.5),
	txt = $.text("hello").fillStyle('white')
;

	$.id('loading').style.display = 'none';
	$.canvas.style.display = '';

	$.root.add([gorilla, txt]);

	$.run();
}
