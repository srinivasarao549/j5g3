(function(o,t,k){var y="0.1",d,z,a,x,n,E,u,C,e,m,A,l,s,D,w,q,j,c,h,p,b,g=o.j5g3=new (function(){var G={version:y},F=this,H=function(){return b},f=function(I){g.Property.define(F.constructor,{canvas:null,backgroundStyle:"black",width:640,height:480});h(F,I);if(F._p.canvas===null){F._p.canvas=g.id("screen")}F._p.fps=31;c=F._p.canvas;F.background=new l({fillStyle:F.backgroundStyle(),width:F.width(),height:F.height()});F.root=new a({width:F.width(),height:F.height()});c.width=F.width();c.height=F.height();I.start(g,t)};this.run=function(){setInterval(this.gameLoop,this._p.fps)};this.gameLoop=function(){b=c.getContext("2d");F.background.draw();F.root.draw()};this.fps=function(I){if(I===k){return 1000/this._p.fps}this._p.fps=1000/I;return this};this.start=function(I){f(typeof(I)=="function"?{start:I}:I)};this.invalidate=function(){return this};this.id=function(I){return t.getElementById(I)}});z={Easing:{None:function(I,H,F){var G=this.from(),f=(H-G[I])/this.duration();return G[I]+f*F},RegularOut:function(){return 0}}};n={Point:function(f,H){var G=this.x(),F=this.y();return(f>=G&&f<=G+this.width())&&(H>=F&&H<=F+this.height())},Circle:function(f){var H=this.x()-f.x(),G=this.y()-f.y(),F=this.width();if(Math.abs(H)>F||Math.abs(G)>F){return false}var I=H*H+G*G;return(I<=F*F)},AABB:function(f){var G=this.x(),F=this.y(),I=f.x(),H=f.y();return(G+this.width()>=I&&G<=I+f.width())&&(F+this.height()>H&&F<=H+f.height())}};m=function(f){return function(F){return F===k?this._p[f]:(this._p[f]=F,this.invalidate())}};m.get=function(F,f){return function(G){return F[f]}};m.define=function(G,F){for(var f in F){G.prototype[f]=m(f)}G.properties=F;return G};h=m.extend=function(H,G){H._p={};var F=H.constructor.properties,f;if(G){for(f in F){H._p[f]=G[f]||F[f]}}else{for(f in F){H._p[f]=F[f]}}return H._p};j={extend:function(F,f){for(var G in f){F[G]=f[G]}return F},inherit:function(F,f){for(var G in f){F[G]=F[G]||f[G]}return F},clone:function(F){var f={};for(var G in F){f[G]=F[G]}return f},Class:function(f,H,G,F){j.extend(f.prototype,new H);m.define(f,G);j.inherit(G,H.properties);j.extend(f.prototype,F);return f}};x=j.Class;p=j.getType=function(F){var f=typeof(F);if(f=="object"){if(F instanceof Array){return"array"}if(F instanceof HTMLAudioElement){return"audio"}if(F instanceof HTMLElement){return"DOM"}if(F._p){return"j5g3"}}return f};u={Image:function(){b.drawImage(this._p.source,0,0)},Sprite:function(){var G=this.source(),f=this.width(),F=this.height();b.drawImage(G.image,G.x,G.y,G.w,G.h,0,0,f?f:G.w,F?F:G.h)},Container:function(){var F=this.frame(),f;for(f=0;f<F.length;f++){F[f].draw(b)}},Text:function(){b.fillText(this.text(),0,0)}};x(E=function(f){h(this,f);this._dirty=true},Object,{source:null,parent:null,x:0,y:0,width:null,height:null,rotation:0,scaleX:1,scaleY:1,alpha:1},{begin:function(){b.save();b.globalAlpha*=this.alpha();b.translate(this.x(),this.y());b.scale(this.scaleX(),this.scaleY());b.rotate(this.rotation())},end:function(){b.restore()},draw:function(){this.begin();this.paint();this.end()},invalidate:function(){this._dirty=true;return this},isDirty:function(){return this._dirty},align:function(F,f){switch(F){case"center":this.x(f.width()/2);break;case"left":this.x(0);break;case"right":this.x(f.width()-this.width());break;case"middle":this.y(f.height()/2);break}return this},collides:n.Circle,pos:function(f,F){this._p.x=f;this._p.y=F;return this.invalidate()},remove:function(){var G=this.parent().frames(),F,f;for(F=0;F<G.length;F++){if(f=G[F].indexOf(this)){G.splice(f,1);return this.invalidate()}}}});x(a=function(f){h(this,f);if(!this._p.frames){this._p.frames=[[]]}this._frame=0;this._playing=true},E,{frames:null},{frame:function(){B=this.frames()[this._frame];if(this._playing){this.nextFrame()}return B},totalFrames:function(){return this.frames().length},currentFrame:function(){return this._p._frame},nextFrame:function(){this._frame=(this._frame<this.totalFrames()-1)?this._frame+1:0},paint:u.Container,stop:function(){this._playing=false},play:function(){this._playing=true},add:function(G){switch(p(G)){case"function":G=new d(G);break;case"string":G=new C({source:G});break;case"object":G=new C(G);break;case"array":for(var F=0;F<G.length;F++){this.add(G[F])}return this;case"audio":G={parent:m("parent"),draw:function(){G.play()}};break}G.parent(this);var H=this.frames();H[H.length-1].push(G);return this},gotoFrame:function(f){this._frame=f;return this},gotoAndPlay:function(f){this.gotoFrame(f);this.play();return this},gotoAndStop:function(f){this.gotoFrame(f);this.stop();return this},alignChildren:function(G){var F=this.frame();for(var f in F){if(F[f].align){F[f].align(G,this)}}return this},at:function(f,H){var G=this.frame(),F;for(F=0;F<G.length;F++){if(n.Point.apply(G[F],[f,H])){return G[F]}}}});x(C=function(f){switch(p(f)){case"string":case"DOM":f={source:f};break}h(this,f);if(this._p.source){this.source(this._p.source)}},E,{},{paint:u.Image,source:function(f){if(f){if(typeof(f)=="string"){this._p.source=new o.Image;this._p.source.src=f}else{this._p.source=f}if(this._p.width===null){this._p.width=this._p.source.width}if(this._p.height===null){this._p.height=this._p.source.height}this.invalidate();return this}return this._p.source}});x(A=function(F,f){if(typeof F!="object"){F={start:F,end:f}}h(this,F)},Object,{start:0,end:0},{to_a:function(){var G=this._p,F=G.start,f=[];for(;F<G.end;F++){f.push(F)}return f}});x(l=function(f){h(this,f)},E,{fillStyle:null},{paint:function(){if(this._p.fillStyle){b.fillStyle=this._p.fillStyle}b.fillRect(this._p.x,this._p.y,this._p.width,this._p.height)}});x(e=function(f){h(this,f)},Object,{obj:null,v:null,m:1},{draw:function(){var F=this._p.obj,f=this._p.v;F.x(F.x()+f[0]);F.y(F.y()+f[1])},force:function(I,H,F,J){var f=this._p.m,G=this._p.v;G[0]=(f*G[0]+I)/f;G[1]=(f*G[1]+H)/f;return this},impulse:function(){},invalidate:function(){}});x(s=function(f){h(this,f)},E,{},{paint:u.Sprite});x(D=function(f){switch(p(f)){case"string":case"DOM":case"j5g3":f={source:f}}switch(p(f.source)){case"string":case"DOM":f.source=new C(f.source);break}if(f.width===k&&f.source){f.width=f.source.width()}if(f.height===k&&f.source){f.height=f.source.height()}var F=h(this,f);F.sprites=F.sprites||[]},Object,{width:0,height:0,source:null,sprites:k,cols:1,rows:1,type:"grid"},{clip:function(f){return this.clip_array(arguments)},clip_array:function(G){var f=this.sprites(),F=[];for(i=0;i<G.length;i++){F.push([f[G[i]]])}return new a({frames:F})},clip_range:function(f){return this.clipArray(f.to_a())},cut:function(f,I,F,H){var G=new s(p(f)=="object"?{width:r.w,height:r.h,source:{image:this.source().source(),x:r.x,y:r.y,w:r.w,h:r.h}}:{width:F,height:H,source:{image:this.source().source(),x:f,y:I,w:F,h:H}});this._p.sprites.push(G);return G},grid:function(f,L){var H=this._p.sprites=[],F=this.width()/f,G=this.height()/L,I,K,J=this.source().source();for(I=0;I<L;I++){for(K=0;K<f;K++){H.push(new s({source:{image:J,x:K*F,y:I*G,w:F,h:G}}))}}return this}});var v;x(w=function(f){if(typeof f=="string"){f={text:f}}h(this,f)},E,{text:"",fillStyle:"white",font:null},{begin:function(){v.apply(this,[b]);if(this._p.fillStyle){b.fillStyle=this._p.fillStyle}if(this._p.font){b.font=this._p.font}},paint:u.Text,width:function(){var f=c.getContext("2d");this.begin(f);var F=f.measureText(this.text());return F.width}});v=E.prototype.begin;x(q=function(f){if(p(f)=="j5g3"){f={target:f}}h(this,f)},Object,{auto_emove:true,duration:100,parent:null,is_playing:false,from:null,target:null,to:null,t:0},{pause:function(){this._p.isPlaying=false},resume:function(){this._p.isPlaying=true},stop:function(){this.pause();this.rewind()},easing:z.Easing.None,_calculate:function(){var G=this.target(),F,H=this.to(),f=this.t();for(F in H){G[F](this.easing(F,H[F],f))}if(f<this.duration()){this.t(f+1)}else{this.t(0)}},restart:function(){},draw:function(){var G=this.to(),f,F=this.target();if(this._p.from===null){this._p.from={};for(f in G){this._p.from[f]=F[f]()}}this.draw=this._calculate},invalidate:function(){return this}});d=function(f){this.draw=(typeof f=="function")?f:f.code;this.parent=function(){}};d.rotate=function(f){return function(){var F=f.rotation();f.rotation(F<6.1?F+0.1:0)}};var B=function(f){return function(F){return new f(F)}};g.Animate=z;g.Draw=u;g.Property=m;g.Util=j;g.Collision=n;g.Action=d;g.Clip=a;g.DisplayObject=E;g.Image=C;g.Range=A;g.Rect=l;g.Sprite=s;g.Spritesheet=D;g.Text=w;g.Tween=q;g.Physics=e;g.action=B(d);g.clip=B(a);g.image=B(C);g.range=B(A);g.rect=B(l);g.sprite=B(s);g.spritesheet=B(D);g.text=B(w);g.tween=B(q);g.physics=B(e)})(this,document);