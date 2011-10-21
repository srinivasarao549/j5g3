
(function ($)
{
var 
	particles,
	mouseX = 0,
	mouseY = 0,
	lastX = 0, 
	lastY = 0,
	PI2 = Math.PI * 2,
	sprites = null,

	onclick = function(evt)
	{
		mouseX = evt.offsetX;
		mouseY = evt.offsetY;
	},

	update = function()
	{
		var dist = Math.sqrt((lastX - mouseX) * (lastX - mouseX) + (lastY - mouseY) * (lastY - mouseY));
		
		for (var i = 0; i < dist; i++)
		{
			var size = 4 + Math.random() * 44;
			var duration = (200-size) * 3;
			var moveDistance = 4 + Math.random() * (80-size);
			var moveDirection = Math.random() * PI2;
			
			var startX = lastX + i * (mouseX - lastX) / dist;
			var startY = lastY + i * (mouseY - lastY) / dist;
			var goalX  = startX + (moveDistance * Math.cos(moveDirection));
			var goalY  = startY + (moveDistance * Math.sin(moveDirection));
			var startAngle = Math.random() * PI2;
			var endAngle = startAngle + (-PI2 + Math.random() * PI2);

			var image = new j5g3.Clip({
				frames: [[ sprites[Math.random() * 5] ]], x: startX, y:startY,
				scaleX: size,
				scaleY: size
			}),
			tween = $.tween({ target: image, to: {x: goalX, y: goalY}, 'duration': duration })
			;

			$.root.add(image, tween);
		}

		lastX = mouseX;
		lastY = mouseY;
	}
;

	particles = 'particles';

	var p = new j5g3.Clip();

	sprites = [
		new j5g3.Sprite({source: { image: particles, x: 0}}),
		new j5g3.Sprite({source: { image: particles, x: 32}}),
		new j5g3.Sprite({source: { image: particles, x: 64}}),
		new j5g3.Sprite({source: { image: particles, x: 96}}),
		new j5g3.Sprite({source: { image: particles, x: 128}}),
		new j5g3.Sprite({source: { image: particles, x: 160}})
	];

	$.root.add(p).add(update);
	$.run();						

})
