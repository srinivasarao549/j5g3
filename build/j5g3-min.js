(function(h,F,s){var o,y,j,p,t,k,m,n,z,A,u,q,B,C,D,E,v,g,l,f,e=h.j5g3=new (function(){var a=this,b=arguments.callee,c=31;this.run=function(){setInterval(this.gameLoop,c)};this.gameLoop=function(){a.background.draw();a.root.draw()};this.fps=function(d){return d===s?1E3/c:(c=1E3/d,this)};this.start=function(d){d=typeof d=="function"?{start:d}:d;j.properties.apply(b,[{canvas:null,backgroundStyle:"black",width:640,height:480}]);g(a,d);a.canvas()===null&&a.canvas(e.id("screen"));v=a.canvas();a.background=
new u({fillStyle:a.backgroundStyle(),width:a.width(),height:a.height()});a.root=new p({width:a.width(),height:a.height()});v.width=a.width();v.height=a.height();f=v.getContext("2d");d.start(e,F)};this.invalidate=function(){return this};this.id=function(d){return F.getElementById(d)}});h.Class=function(){};h.Class.extend=function(a){var b,c=a.init?a.init:function(){this.__super.apply(this,arguments)};c.prototype=new this;for(b in a)if(this[b]!=a[b])c.prototype[b]=a[b];c.properties=h.Class.properties;
c.extend=h.Class.extend;c.prototype.__super=this;return c};h.property=function(a){var b="__"+a;return function(c){return c===s?this[b]:(this[b]=c,this)}};h.property.read=function(a){var b="__"+a;return function(){return this[b]}};h.Class.properties=function(a){var b;for(b in a)if(a[b]!==this[b]){this.prototype[b]=h.property(b);this.prototype["__"+b]=a[b]}return this};j=h.Class;y={Easing:{None:function(a,b,c){var d=this.from();b=(b-d[a])/this.duration();return d[a]+b*c},RegularOut:function(){return 0}}};
t={Point:function(a,b){var c=this.x(),d=this.y();return a>=c&&a<=c+this.width()&&b>=d&&b<=d+this.height()},Circle:function(a){var b=this.x()-a.x();a=this.y()-a.y();var c=this.width();if(Math.abs(b)>c||Math.abs(a)>c)return false;return b*b+a*a<=c*c},AABB:function(a){var b=this.x(),c=this.y(),d=a.x(),r=a.y();return b+this.width()>=d&&b<=d+a.width()&&c+this.height()>r&&c<=r+a.height()}};g=function(a,b){var c;for(c in b)a["__"+c]=b[c];return a};E={extend:function(a,b){for(var c in b)a[c]=b[c];return a},
inherit:function(a,b){for(var c in b)a[c]=a[c]||b[c];return a},clone:function(a){var b={};for(var c in a)b[c]=a[c];return b}};l=E.getType=function(a){var b=typeof a;if(b=="object"){if(a instanceof Array)return"array";if(a instanceof HTMLAudioElement)return"audio";if(a instanceof HTMLElement)return"DOM";if(a.init)return"j5g3"}return b};m={Image:function(){f.drawImage(this.__source,0,0)},Sprite:function(){var a=this.source(),b=this.width(),c=this.height();f.drawImage(a.image,a.x,a.y,a.w,a.h,0,0,b?b:
a.w,c?c:a.h)},Container:function(){var a=this.frame(),b;for(b=0;b<a.length;b++)a[b].draw(f)},Text:function(){f.fillText(this.text(),0,0)}};k=j.extend({init:function(a){g(this,a);this._dirty=true},begin:function(){f.save();f.globalAlpha*=this.alpha();f.translate(this.x(),this.y());f.scale(this.scaleX(),this.scaleY());f.rotate(this.rotation())},end:function(){f.restore()},draw:function(){this.begin();this.paint();this.end()},invalidate:function(){this._dirty=true;return this},is_dirty:function(){return this._dirty},
align:function(a,b){switch(a){case "center":this.x(b.width()/2);break;case "left":this.x(0);break;case "right":this.x(b.width()-this.width());break;case "middle":this.y(b.height()/2);break}return this},collides:t.Circle,pos:function(a,b){this.__x=a;this.__y=b;return this.invalidate()},size:function(a,b){this.__width=a;this.__height=b;return this.invalidate()},scale:function(a,b){this.scaleX(a);return this.scaleY(b)},remove:function(){this.parent().remove_child(this)},visible:function(){return this.__alpha>
0}}).properties({source:null,parent:null,x:0,y:0,width:null,height:null,rotation:0,scaleX:1,scaleY:1,alpha:1});p=k.extend({init:function(a){g(this,a);if(!this.__frames)this.__frames=[[]];this._frame=0;this._playing=true},frame:function(){var a=this.frames()[this._frame];this._playing&&this.nextFrame();return a},nextFrame:function(){this._frame=this._frame<this.__frames.length-1?this._frame+1:0},paint:m.Container,stop:function(){this._playing=false},play:function(){this._playing=true},add:function(a){switch(l(a)){case "function":a=
new o(a);break;case "string":a=new n({source:a});break;case "object":a=new n(a);break;case "array":for(var b=0;b<a.length;b++)this.add(a[b]);return this;case "audio":a={parent:h.property("parent"),draw:function(){a.play()}};break}a.parent(this);b=this.frames();b[b.length-1].push(a);return this},go:function(a){this._frame=a;return this},alignChildren:function(a){for(var b=this.frame(),c=b.length;c--;)b[c].align&&b[c].align(a,this);return this},at:function(a,b){var c=this.frame(),d;for(d=0;d<c.length;d++)if(c[d].visible()&&
t.Point.apply(c[d],[a,b]))return c[d]},remove_child:function(a){var b=this.frames(),c,d;for(c=0;c<b.length;c++)if(d=b[c].indexOf(a)){b.splice(d,1);return this.invalidate()}}}).properties({frames:null});n=k.extend({init:function(a){switch(l(a)){case "string":a={source:e.id(a)};break;case "DOM":a={source:a};break}g(this,a);this.__source&&this.source(this.__source)},paint:m.Image,source:function(a){if(a){this.__source=typeof a=="string"?e.id(a):a;this.__width===null&&this.width(this.__source.width);
this.__height===null&&this.height(this.__source.height);this.invalidate();return this}return this.__source}});A=j.extend({init:function(a,b){if(typeof a!="object")a={start:a,end:b};g(this,a)},to_a:function(){for(var a=this.__start,b=[],c=this.end();a<c;a++)b.push(a);return b}}).properties({start:0,end:0});u=k.extend({init:function(a){g(this,a)},paint:function(){if(this.__fillStyle)f.fillStyle=this.__fillStyle;f.fillRect(this.__x,this.__y,this.__width,this.__height)}}).properties({fillStyle:null});
z=j.extend({init:function(a){g(this,a)},draw:function(){var a=this.__obj,b=this.__v;a.x(a.x()+b[0]);a.y(a.y()+b[1])},force:function(a,b){var c=this.__m,d=this.__v;d[0]=(c*d[0]+a)/c;d[1]=(c*d[1]+b)/c;return this},impulse:function(){},invalidate:function(){}}).properties({obj:null,v:null,m:1,parent:null});q=k.extend({init:function(a){g(this,a)},paint:m.Sprite});B=j.extend({init:function(a){switch(l(a)){case "string":case "DOM":case "j5g3":a={source:a}}switch(l(a.source)){case "string":case "DOM":a.source=
new n(a.source);break}if(a.width===s&&a.source)a.width=a.source.width();if(a.height===s&&a.source)a.height=a.source.height();a=g(this,a);a.__sprites=a.__sprites||[]},clip:function(){return this.clip_array(arguments)},clip_array:function(a){var b=this.sprites(),c=[],d;for(d=0;d<a.length;d++)c.push([b[a[d]]]);return new p({frames:c})},clip_range:function(a){return this.clip_array(a.to_a())},cut:function(a,b,c,d){a=new q(l(a)=="object"?{width:a.w,height:a.h,source:{image:this.source().source(),x:a.x,
y:a.y,w:a.w,h:a.h}}:{width:c,height:d,source:{image:this.source().source(),x:a,y:b,w:c,h:d}});this.__sprites.push(a);return a},grid:function(a,b){var c=this.__sprites=[],d=this.width()/a,r=this.height()/b,w,x,H=this.source().source();for(w=0;w<b;w++)for(x=0;x<a;x++)c.push(new q({source:{image:H,x:x*d,y:w*r,w:d,h:r}}));return this}}).properties({width:0,height:0,source:null,sprites:null,cols:1,rows:1,type:"grid"});var G;C=k.extend({init:function(a){if(typeof a=="string")a={text:a};g(this,a)},begin:function(){G.apply(this);
if(this.__fillStyle)f.fillStyle=this.__fillStyle;if(this.__font)f.font=this.__font},paint:m.Text,width:function(){this.begin();var a=f.measureText(this.text());this.end();return a.width}}).properties({text:"",fillStyle:"white",font:null});G=k.prototype.begin;D=j.extend({init:function(a){if(l(a)=="j5g3")a={target:a};this.draw=this.start;g(this,a)},pause:function(){this._olddraw=this.draw;this.draw=function(){};return this},resume:function(){this.draw=this._olddraw?this._olddraw:this.start;return this},
rewind:function(){this.__repeat-=1;return this.t(0)},stop:function(){this.pause();this.rewind();this.__on_stop&&this.__on_stop();return this},easing:y.Easing.None,remove:function(){this.parent().remove_child(this);this.__on_remove&&this.__on_remove();return this},_calculate:function(){var a=this.target(),b,c=this.to(),d=this.t();for(b in c)a[b](this.easing(b,c[b],d));if(d<this.duration())this.t(d+1);else if(this.auto_remove())this.remove();else this.repeat()?this.rewind():this.stop()},start:function(){var a=
this.to(),b,c=this.target();if(this.__from===null){this.__from={};for(b in a)this.__from[b]=c[b]()}this.draw=this._calculate},draw:null,invalidate:function(){return this}}).properties({auto_remove:false,repeat:Infinity,duration:100,parent:null,is_playing:false,from:null,target:null,to:null,t:0,on_stop:null,on_remove:null,visible:false});o=j.extend({init:function(a){this.draw=l(a)=="function"?a:a.code},parent:function(){}});o.rotate=function(a){return function(){var b=a.rotation();a.rotation(b<6.1?
b+0.1:0)}};var i=function(a){return function(b){return new a(b)}};e.Animate=y;e.Draw=m;e.Util=E;e.Collision=t;e.Action=o;e.Clip=p;e.DisplayObject=k;e.Image=n;e.Range=A;e.Rect=u;e.Sprite=q;e.Spritesheet=B;e.Text=C;e.Tween=D;e.Physics=z;e.action=i(o);e.clip=i(p);e.image=i(n);e.range=function(a,b){return new A(a,b)};e.rect=i(u);e.sprite=i(q);e.spritesheet=i(B);e.text=i(C);e.tween=i(D);e.physics=i(z)})(this,document);
