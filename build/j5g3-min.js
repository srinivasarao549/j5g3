var j5g3={extend:function(d,c){for(var e in c){d[e]=c[e]}return d},inherits:function(d,b,c){b.apply(d,c)},property:function(b,c){b[c]=function(d){if(d!==undefined){b.invalidate();b._p[c]=d;return b}return b._p[c]};return b[c]},properties:function(d,c){var b;for(b in c){j5g3.property(d,c[b])}},init:function(b){return j5g3.Engine.initialize(b)}};j5g3.Action=function(b){this.draw=(typeof b=="function")?b:b.code};j5g3.Action.rotate=function(b){return function(){var c=b.rotation();b.rotation(c<6.1?c+0.1:0)}};j5g3.Easing={RegularOut:function(){return 0}};j5g3.Engine={canvas:null,root:null,algorithms:{drawImage:function(b){b.drawImage(this.source(),0,0)},drawSprite:function(c){var e=this.source(),b=this.width(),d=this.height();c.drawImage(e.image,e.x,e.y,e.w,e.h,0,0,b?b:e.w,d?d:e.h)},drawContainer:function(c){var d=this.frame();for(var b in d){d[b].draw(c)}}},onClick:function(){},initialize:function(b){if(b){this.canvas=b.canvas;this.fps=b.fps}if(!this.canvas){this.canvas=document.getElementById("screen")}this.canvas.width=640;this.canvas.height=480;if(!this.fps){this.fps=100}this.background=new j5g3.Rect({width:640,height:480});this.root=new j5g3.Clip({width:640,height:480});this.canvas.addEventListener("click",this.onClick,false);return this},getContext:function(){return this.canvas.getContext("2d")},gameLoop:function(){var b=this.getContext();this.background.draw(b);this.root.draw(b)},run:function(){setInterval("j5g3.Engine.gameLoop()",this.fps)}};j5g3.Util={getType:function(c){var b=typeof(c);if(b=="object"){if(c instanceof Array){b="array"}}return b}};j5g3.DisplayObject=function(b){this._p={x:0,y:0,width:null,height:null,rotation:0,scaleX:1,scaleY:1,alpha:1};j5g3.extend(this._p,b);this._dirty=false;this.begin=function(c){c.save();c.globalAlpha*=this._p.alpha;c.translate(this.x(),this.y());c.scale(this.scaleX(),this.scaleY());c.rotate(this.rotation())};this.end=function(c){c.restore()};this.draw=function(c){this.begin(c);this.paint(c);this.end(c)};this.source=function(){return this._p.source};this.invalidate=function(){this._dirty=true};this.isDirty=function(){return this._dirty};j5g3.properties(this,["alpha","width","height","x","y","scaleX","scaleY","rotation"]);this.align=function(d,c){switch(d){case"center":this.x(c.width()/2);break;case"left":this.x(0);break;case"right":this.x(c.width()-this.width());break;case"middle":this.y(c.height()/2);break}};this.collidesWith=function(h){var e=this.x()-h.x();var d=this.y()-h.y();var c=this.width();if(Math.abs(e)>c||Math.abs(d)>c){return false}var g=e*e+d*d;if(g>c*c){return false}return true}};j5g3.Sprite=function(b){j5g3.DisplayObject.apply(this,[b]);this.paint=j5g3.Engine.algorithms.drawSprite};j5g3.Image=function(b){j5g3.DisplayObject.apply(this,[b]);this.paint=j5g3.Engine.algorithms.drawImage;this.source=function(c){if(c){if(typeof(c)=="string"){this._p.source=new Image;this._p.source.src=c}else{this._p.source=c}if(this._p.width===null){this._p.width=this._p.source.width}if(this._p.height===null){this._p.height=this._p.source.height}this.invalidate();return this}return this._p.source};if(this._p.source){this.source(this._p.source)}};j5g3.Rect=function(b){j5g3.DisplayObject.apply(this,[b]);this.fillStyle=function(c){return c?(this.invalidate(),(this._p.fillStyle=c),this):this._p.fillStyle};this.paint=function(c){if(this._p.fillStyle){c.fillStyle=this._p.fillStyle}c.fillRect(this._p.x,this._p.y,this._p.width,this._p.height)}};j5g3.Text=function(b){j5g3.DisplayObject.apply(this,[b]);this.text=function(){return this._p.text};this.paint=function(c){if(this._p.fillStyle){c.fillStyle=this._p.fillStyle}c.fillText(this.text(),0,0)}};j5g3.Clip=function(b){j5g3.DisplayObject.apply(this,[b]);if(!this._p.frames){this._p.frames=[[]]}this._frame=0;this._playing=true;this.frames=function(c){return c?(this.invalidate(),(this._p.frames=c),this):this._p.frames};this.frame=function(){f=this.frames()[this._frame];if(this._playing){this.nextFrame()}return f};this.totalFrames=function(){return this.frames().length};this.currentFrame=function(){return _frame};this.nextFrame=function(){this._frame=(this._frame<this.totalFrames()-1)?this._frame+1:0};this.paint=j5g3.Engine.algorithms.drawContainer;this.stop=function(){this._playing=false};this.play=function(){this._playing=true};this.add=function(d){switch(j5g3.Util.getType(d)){case"function":d=new j5g3.Action({code:d});break;case"string":d=new j5g3.Image({source:d});break;case"array":for(var c in d){this.add(d[c])}return this}this.frames()[this._frame].push(d);return this};this.gotoFrame=function(c){this._frame=c;return this};this.gotoAndPlay=function(c){this.gotoFrame(c);this.play();return this};this.gotoAndStop=function(c){this.gotoFrame(c);this.stop();return this};this.alignChildren=function(e){var d=this.frame();for(var c in d){if(d[c].align){d[c].align(e,this)}}return this};this.animateTo=function(k,g,l,d){var c=this.frames();for(var h=1;h<l;h++){c[h]=c[h-1];for(var e in c[h-1]){c[h][e][k]=d.apply(c[0][e][k],g,h)}}}};j5g3.Matrix=function(b){this._elements=(arguments.length>1)?[arguments]:b;this.add=function(c){return this.map(function(d,e,g){return d+c.e(e,g)})};this.augment=function(d){var c=this;return j5g3.Matrix.Func(this.rows(),this.cols()+d.cols(),function(e,g){return(g>=c.cols())?d.e(e,g-c.cols()):c.e(e,g)})};this.col=function(e){var c=[];for(var d=0;d<this.rows();d++){c.push(this.e(d,e))}return new j5g3.Matrix([c])};this.cols=function(){return this._elements[0].length};this.determinant=function(){if(this.rows()==2){return this.e(0,0)*this.e(1,1)-this.e(0,1)*this.e(1,0)}var c=0};this.diagonal=function(){a=[];for(var c=0;c<this.rows();c++){a.push(this.e(c,c))}return new j5g3.Matrix([a])};this.duplicate=function(){return new j5g3.Matrix(this._elements.slice(0))};this.e=function(d,c){return this._elements[d][c]};this.each=function(e){for(var d=0;d<this.rows();d++){for(var g=0;g<this.rows();g++){e(this.e(d,g),d,g)}}};this.eq=function(e){for(var d=0;d<this.rows();d++){for(var c=0;c<this.cols();c++){if(this.e(d,c)!=e.e(d,c)){return false}}}return true};this.gaussian=function(){var k=this.cols();var j=this.rows();var e,l,h,g;var d=this._elements.slice(0);for(l=0;l<k-1;l++){for(h=0;h<j;h++){e=this.e(h,l)/this.e(l,l);if(h!=l){for(g=0;g<k;g++){d[h][g]=this.e(h,g)-e*this.e(l,g)}}}}for(g=0;g<j;g++){d[g][k-1]/=d[g][g];d[g][g]=1}return new j5g3.Matrix(d)};this.inverse=function(){var c=this.augment(new j5g3.Matrix.I(this.rows()));c=c.gaussian();return c};this.is_singular=function(){return this.determinant===0};this.is_square=function(){return this.rows()==this.cols()};this.map=function(d){var c=[];this.each(function(e,g,h){if(!c[g]){c[g]=[]}c[g][h]=d(e,g,h)});return new j5g3.Matrix(c)};this.max=function(){var c;this.each(function(d){if(d>c){c=d}});return c};this.min=function(){var c;this.each(function(d){if(d<c){c=d}});return c};this.multiply=function(){};this.round=function(){return this.map(function(c){return Math.round(c)})};this.row=function(c){return new j5g3.Matrix([this._elements[c]])};this.rows=function(){return this._elements.length};this.slice=function(e,h){var g=this.rows();for(var d=e;d<g;d++){this._elements[d]=this._elements[d].slice(h)}};this.substract=function(c){return this.map(function(d,e,g){return d-c.e(e,g)})};this.to_right_triangular=function(){};this.to_str=function(g){if(g===undefined){g=4}var e=g+3;var d="";var i=function(l){var c=l.toPrecision(g);if(c.length<e){for(var k=0;k<=e-c.length;k++){c+=" "}}return c};for(var h=0;h<this.rows();h++){d+="[ ";for(var j=0;j<this.cols();j++){d+=i(this.e(h,j))+" "}d+="]\n"}return d};this.trace=function(){};this.transpose=function(){}};j5g3.Matrix.Func=function(h,c,e){var d=[];for(var g=0;g<h;g++){d[g]=[];for(var b=0;b<c;b++){d[g].push(e(g,b))}}return new j5g3.Matrix(d)};j5g3.Matrix.Diagonal=function(){var b=arguments;return j5g3.Matrix.Func(arguments.length,arguments.length,function(c,d){return c==d?b[d]:0})};j5g3.Matrix.I=function(b){return j5g3.Matrix.Func(b,b,function(c,d){return c==d?1:0})};j5g3.Matrix.Random=function(c,b){return j5g3.Matrix.Func(c,b===undefined?c:b,function(){return Math.random()})};j5g3.Matrix.Zero=function(c,b){return j5g3.Matrix.Func(c,b,function(){return 0})};