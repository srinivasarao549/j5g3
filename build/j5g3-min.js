(function(u,F,p){var q,r,g,v,j,n,o,A,k,B,w,s,C,D,E,l,x,h,m,f,e=u.j5g3=new (function(){var a=this;this.run=function(){setInterval(this.gameLoop,this._p.fps)};this.gameLoop=function(){a.background.draw();a.root.draw()};this.fps=function(b){if(b===p)return 1E3/this._p.fps;this._p.fps=1E3/b;return this};this.start=function(b){b=typeof b=="function"?{start:b}:b;e.Property.define(a.constructor,{canvas:null,backgroundStyle:"black",width:640,height:480});h(a,b);if(a._p.canvas===null)a._p.canvas=e.id("screen");
a._p.fps=31;x=a._p.canvas;a.background=new w({fillStyle:a.backgroundStyle(),width:a.width(),height:a.height()});a.root=new r({width:a.width(),height:a.height()});x.width=a.width();x.height=a.height();f=x.getContext("2d");b.start(e,F)};this.invalidate=function(){return this};this.id=function(b){return F.getElementById(b)}});u={Easing:{None:function(a,b,c){var d=this.from();b=(b-d[a])/this.duration();return d[a]+b*c},RegularOut:function(){return 0}}};v={Point:function(a,b){var c=this.x(),d=this.y();
return a>=c&&a<=c+this.width()&&b>=d&&b<=d+this.height()},Circle:function(a){var b=this.x()-a.x();a=this.y()-a.y();var c=this.width();if(Math.abs(b)>c||Math.abs(a)>c)return false;return b*b+a*a<=c*c},AABB:function(a){var b=this.x(),c=this.y(),d=a.x(),t=a.y();return b+this.width()>=d&&b<=d+a.width()&&c+this.height()>t&&c<=t+a.height()}};k=function(a){return function(b){return b===p?this._p[a]:(this._p[a]=b,this.invalidate())}};k.get=function(a,b){return function(){return a[b]}};k.define=function(a,
b){for(var c in b)a.prototype[c]=k(c);a.properties=b;return a};h=k.extend=function(a,b){a._p={};var c=a.constructor.properties,d;if(b)for(d in c)a._p[d]=b[d]||c[d];else for(d in c)a._p[d]=c[d];return a._p};l={extend:function(a,b){for(var c in b)a[c]=b[c];return a},inherit:function(a,b){for(var c in b)a[c]=a[c]||b[c];return a},clone:function(a){var b={};for(var c in a)b[c]=a[c];return b},Class:function(a,b,c,d){l.extend(a.prototype,new b);k.define(a,c);l.inherit(c,b.properties);l.extend(a.prototype,
d);return a}};g=l.Class;m=l.getType=function(a){var b=typeof a;if(b=="object"){if(a instanceof Array)return"array";if(a instanceof HTMLAudioElement)return"audio";if(a instanceof HTMLElement)return"DOM";if(a._p)return"j5g3"}return b};n={Image:function(){f.drawImage(this._p.source,0,0)},Sprite:function(){var a=this.source(),b=this.width(),c=this.height();f.drawImage(a.image,a.x,a.y,a.w,a.h,0,0,b?b:a.w,c?c:a.h)},Container:function(){var a=this.frame(),b;for(b=0;b<a.length;b++)a[b].draw(f)},Text:function(){f.fillText(this.text(),
0,0)}};g(j=function(a){h(this,a);this._dirty=true},Object,{source:null,parent:null,x:0,y:0,width:null,height:null,rotation:0,scaleX:1,scaleY:1,alpha:1},{begin:function(){f.save();f.globalAlpha*=this.alpha();f.translate(this.x(),this.y());f.scale(this.scaleX(),this.scaleY());f.rotate(this.rotation())},end:function(){f.restore()},draw:function(){this.begin();this.paint();this.end()},invalidate:function(){this._dirty=true;return this},isDirty:function(){return this._dirty},align:function(a,b){switch(a){case "center":this.x(b.width()/
2);break;case "left":this.x(0);break;case "right":this.x(b.width()-this.width());break;case "middle":this.y(b.height()/2);break}return this},collides:v.Circle,pos:function(a,b){this._p.x=a;this._p.y=b;return this.invalidate()},size:function(a,b){this._p.width=a;this._p.height=b;return this.invalidate()},scale:function(a,b){this.scaleX(a);return this.scaleY(b)},remove:function(){this.parent().remove_child(this)},visible:function(){return this._p.alpha>0}});g(r=function(a){h(this,a);if(!this._p.frames)this._p.frames=
[[]];this._frame=0;this._playing=true},j,{frames:null},{frame:function(){i=this.frames()[this._frame];this._playing&&this.nextFrame();return i},totalFrames:function(){return this.frames().length},currentFrame:function(){return this._p._frame},nextFrame:function(){this._frame=this._frame<this.totalFrames()-1?this._frame+1:0},paint:n.Container,stop:function(){this._playing=false},play:function(){this._playing=true},add:function(a){switch(m(a)){case "function":a=new q(a);break;case "string":a=new o({source:a});
break;case "object":a=new o(a);break;case "array":for(var b=0;b<a.length;b++)this.add(a[b]);return this;case "audio":a={parent:k("parent"),draw:function(){a.play()}};break}a.parent(this);b=this.frames();b[b.length-1].push(a);return this},gotoFrame:function(a){this._frame=a;return this},gotoAndPlay:function(a){this.gotoFrame(a);this.play();return this},gotoAndStop:function(a){this.gotoFrame(a);this.stop();return this},alignChildren:function(a){var b=this.frame();for(var c in b)b[c].align&&b[c].align(a,
this);return this},at:function(a,b){var c=this.frame(),d;for(d=0;d<c.length;d++)if(c[d].visible()&&v.Point.apply(c[d],[a,b]))return c[d]},remove_child:function(a){var b=this.frames(),c,d;for(c=0;c<b.length;c++)if(d=b[c].indexOf(a)){b.splice(d,1);return this.invalidate()}}});g(o=function(a){switch(m(a)){case "string":a={source:e.id(a)};break;case "DOM":a={source:a};break}h(this,a);this._p.source&&this.source(this._p.source)},j,{},{paint:n.Image,source:function(a){if(a){this._p.source=typeof a=="string"?
e.id(a):a;if(this._p.width===null)this._p.width=this._p.source.width;if(this._p.height===null)this._p.height=this._p.source.height;this.invalidate();return this}return this._p.source}});g(B=function(a,b){if(typeof a!="object")a={start:a,end:b};h(this,a)},Object,{start:0,end:0},{to_a:function(){for(var a=this._p,b=a.start,c=[];b<a.end;b++)c.push(b);return c}});g(w=function(a){h(this,a)},j,{fillStyle:null},{paint:function(){if(this._p.fillStyle)f.fillStyle=this._p.fillStyle;f.fillRect(this._p.x,this._p.y,
this._p.width,this._p.height)}});g(A=function(a){h(this,a)},Object,{obj:null,v:null,m:1,parent:null},{draw:function(){var a=this._p.obj,b=this._p.v;a.x(a.x()+b[0]);a.y(a.y()+b[1])},force:function(a,b){var c=this._p.m,d=this._p.v;d[0]=(c*d[0]+a)/c;d[1]=(c*d[1]+b)/c;return this},impulse:function(){},invalidate:function(){}});g(s=function(a){h(this,a)},j,{},{paint:n.Sprite});g(C=function(a){switch(m(a)){case "string":case "DOM":case "j5g3":a={source:a}}switch(m(a.source)){case "string":case "DOM":a.source=
new o(a.source);break}if(a.width===p&&a.source)a.width=a.source.width();if(a.height===p&&a.source)a.height=a.source.height();a=h(this,a);a.sprites=a.sprites||[]},Object,{width:0,height:0,source:null,sprites:p,cols:1,rows:1,type:"grid"},{clip:function(){return this.clip_array(arguments)},clip_array:function(a){var b=this.sprites(),c=[],d;for(d=0;d<a.length;d++)c.push([b[a[d]]]);return new r({frames:c})},clip_range:function(a){return this.clip_array(a.to_a())},cut:function(a,b,c,d){a=new s(m(a)=="object"?
{width:a.w,height:a.h,source:{image:this.source().source(),x:a.x,y:a.y,w:a.w,h:a.h}}:{width:c,height:d,source:{image:this.source().source(),x:a,y:b,w:c,h:d}});this._p.sprites.push(a);return a},grid:function(a,b){var c=this._p.sprites=[],d=this.width()/a,t=this.height()/b,y,z,H=this.source().source();for(y=0;y<b;y++)for(z=0;z<a;z++)c.push(new s({source:{image:H,x:z*d,y:y*t,w:d,h:t}}));return this}});var G;g(D=function(a){if(typeof a=="string")a={text:a};h(this,a)},j,{text:"",fillStyle:"white",font:null},
{begin:function(){G.apply(this);if(this._p.fillStyle)f.fillStyle=this._p.fillStyle;if(this._p.font)f.font=this._p.font},paint:n.Text,width:function(){this.begin();var a=f.measureText(this.text());this.end();return a.width}});G=j.prototype.begin;g(E=function(a){if(m(a)=="j5g3")a={target:a};this.draw=this.start;h(this,a)},Object,{auto_remove:false,repeat:Infinity,duration:100,parent:null,is_playing:false,from:null,target:null,to:null,t:0,on_stop:null,on_remove:null,visible:false},{pause:function(){this._olddraw=
this.draw;this.draw=function(){};return this},resume:function(){this.draw=this._olddraw?this._olddraw:this.start;return this},rewind:function(){this._p.repeat-=1;return this.t(0)},stop:function(){this.pause();this.rewind();this._p.on_stop&&this._p.on_stop();return this},easing:u.Easing.None,remove:function(){this.parent().remove_child(this);this._p.on_remove&&this._p.on_remove();return this},_calculate:function(){var a=this.target(),b,c=this.to(),d=this.t();for(b in c)a[b](this.easing(b,c[b],d));
if(d<this.duration())this.t(d+1);else if(this.auto_remove())this.remove();else this.repeat()?this.rewind():this.stop()},start:function(){var a=this.to(),b,c=this.target();if(this._p.from===null){this._p.from={};for(b in a)this._p.from[b]=c[b]()}this.draw=this._calculate},draw:null,invalidate:function(){return this}});q=function(a){this.draw=typeof a=="function"?a:a.code;this.parent=function(){}};q.rotate=function(a){return function(){var b=a.rotation();a.rotation(b<6.1?b+0.1:0)}};var i=function(a){return function(b){return new a(b)}};
e.Animate=u;e.Draw=n;e.Property=k;e.Util=l;e.Collision=v;e.Action=q;e.Class=g;e.Clip=r;e.DisplayObject=j;e.Image=o;e.Range=B;e.Rect=w;e.Sprite=s;e.Spritesheet=C;e.Text=D;e.Tween=E;e.Physics=A;e.action=i(q);e.clip=i(r);e.image=i(o);e.range=function(a,b){return new B(a,b)};e.rect=i(w);e.sprite=i(s);e.spritesheet=i(C);e.text=i(D);e.tween=i(E);e.physics=i(A)})(this,document);
