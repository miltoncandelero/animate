/*!
 * @pixi/animate - v2.0.5
 * Compiled Thu, 23 Feb 2023 12:30:05 UTC
 *
 * @pixi/animate is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 * 
 * Copyright 2023, undefined, All Rights Reserved
 */import{Assets as et}from"@pixi/assets";import{Texture as rt}from"@pixi/core";import{Spritesheet as it}from"@pixi/spritesheet";import{EventEmitter as nt}from"@pixi/utils";import{ColorMatrixFilter as N}from"@pixi/filter-color-matrix";import{Container as ot}from"@pixi/display";import{Graphics as M}from"@pixi/graphics";import{Sprite as O}from"@pixi/sprite";import{Ticker as at}from"@pixi/ticker";import{settings as ht}from"@pixi/settings";import{Application as lt}from"@pixi/app";import{Text as ct}from"@pixi/text";let k=null;var y;(e=>{function t(d){return d=d.substr(1),d.length===3&&(d=d.replace(/([a-f0-9])/g,"$1$1")),parseInt(d,16)}e.hexToUint=t;function s(d,p,m){const f=d.length;if(f<p+m&&(d.length=p+m,f<p))if(d.fill)d.fill(!1,f,p);else for(let _=f;_<p;++_)d[_]=!1;if(d.fill)d.fill(!0,p,p+m);else{const _=d.length;for(let u=p;u<_;++u)d[u]=!0}}e.fillFrames=s;const r={X:"x",Y:"y",A:"sx",B:"sy",C:"kx",D:"ky",R:"r",L:"a",T:"t",F:"c",V:"v"};function i(d,p){switch(d){case"c":{const m=p.split(",");return m.forEach((f,_,u)=>{u[_]=parseFloat(f)}),m}case"t":return p;case"v":return!!parseInt(p,10);default:return parseFloat(p)}}const n={D:"d",P:"p"},h=/(\-?\d*\.?\d*)([a-zA-Z]+)/;function o(d){const p={d:0,p:{}};let m=0,f="",_=!1,u;for(;m<=d.length;){const g=d[m];if(!_&&(n[u]||n[g]))u==="d"&&(p.d=i(u,f),u=null),g==="P"?(_=!0,++m):(u=n[g],++m),f="";else if(g==="E"){let T=d.indexOf(";",m);T<0&&(T=d.length);const x=d.substring(m+1,T);if(h.test(x)){const[,H,Y]=h.exec(x);_?u&&(p.p[u]=i(u,f),p.p.e||(p.p.e={}),p.p.e[u]={s:parseFloat(H),n:Y},u=null,f=""):p.e={s:parseFloat(H),n:Y}}m=T+1}else r[g]?(u&&(p.p[u]=i(u,f)),u=r[g],f="",m++):g?(f+=g,m++):(u&&(p.p[u]=i(u,f)),f="",u=null,m++)}return p}function l(d){const p={};let m=0,f="",_=!1,u,g={};for(;m<=d.length;){const T=d[m];if(r[T])_||(_=!0,p[f]=g),u&&(g[u]=i(u,f)),u=r[T],f="",m++;else if(T==="W"){_||(_=!0,p[f]=g),u&&(g[u]=i(u,f),f="",u=null);let x=d.indexOf(" ",m);x<0&&(x=d.length),g.tw=o(d.substring(m+1,x)),m=x}else!T||T===" "?(m++,u&&(g[u]=i(u,f)),f="",u=null,g={},_=!1):(f+=T,m++)}return p}e.deserializeKeyframes=l;function a(d){const p=[],m=d.split(`
`),f=/^[a-z]{1,2}$/;for(let _=0;_<m.length;_++){const u=m[_].split(" ");for(let g=0;g<u.length;g++){const T=u[g];T[0]!=="#"&&!f.test(T)&&(u[g]=parseFloat(T))}p.push(u)}return p}e.deserializeShapes=a;function c(d){if(d.isMovieClip){const p=d;return p._timedChildTimelines.forEach(m=>{p.children.indexOf(m.target)===-1&&(k==null||k.add(m.target))}),!0}return!1}e.addMovieClips=c;function b(d,p,m){k||(k=d.plugins.prepare,k.registerFindHook(c)),k==null||k.upload(p).then(m)}e.upload=b})(y||(y={}));const $=2;function V(e,t){const s=typeof t=="function"?t:t==null?void 0:t.complete;let r="",i=null,n,h=!1;const{version:o}=e;typeof o=="number"&&(Math.floor(o)!==Math.floor($)?console.warn(`Asset version is not the major version expected of ${Math.floor($)} - it may not load properly`,e):o>$&&console.warn("Asset has been published with a newer version than PixiAnimate expects. It may not load properly.",e)),t&&typeof t!="function"&&(r=t.basePath||"",i=t.parent,n=t.metadata,h=!!t.createInstance);function l(){const c=h&&typeof e.stage=="function"?new e.stage:null;i&&c&&i.addChild(c),s&&s(c)}const a=e.assets||{};if(a&&Object.keys(a).length){const c=[];r&&(r+="/");for(const b in a){let d=null;n&&(n[b]?d=n[b]:n.default&&(d=n.default)),c.push(et.load({alias:[b],src:r+a[b],data:d}).then(p=>{if(p){if(p instanceof it)e.spritesheets.push(p);else if(p instanceof rt)e.textures[b]=p;else if(Array.isArray(p)||typeof p=="string"){let m=p;typeof m=="string"&&(m=y.deserializeShapes(m));for(let f=0;f<m.length;f++){const _=m[f];for(let u=0;u<_.length;u++){const g=_[u];typeof g=="string"&&g[0]==="#"&&(_[u]=y.hexToUint(g))}}e.shapes[b]=m}}}))}Promise.all(c).then(l)}else l()}const G=new nt;function S(e,t,s){return e+(t-e)*s}const P=Math.PI,w=P*2;function dt(e,t,s){return Math.abs(t-e)>P&&(t>e?e+=w:t+=w),e+(t-e)*s}function J(e,t,s){Math.abs(t-e)>P&&(t>e?e+=w:t+=w);const r=e+(t-e)*s;return r>P?r-w:r<-P?r+w:r}function ut(e,t,s){const r=e>>16&255,i=e>>8&255,n=e&255,h=t>>16&255,o=t>>8&255,l=t&255;let a=r+(h-r)*s;a<0?a=0:a>255&&(a=255);let c=i+(o-i)*s;c<0?c=0:c>255&&(c=255);let b=n+(l-n)*s;return b<0?b=0:b>255&&(b=255),a<<16|c<<8|b}const v=[];function pt(e,t,s){return v[0]=e[0]+(t[0]-e[0])*s,v[1]=e[1]+(t[1]-e[1])*s,v[2]=e[2]+(t[2]-e[2])*s,v[3]=e[3]+(t[3]-e[3])*s,v[4]=e[4]+(t[4]-e[4])*s,v[5]=e[5]+(t[5]-e[5])*s,v}const mt={x:S,y:S,sx:S,sy:S,kx:J,ky:J,r:dt,a:S,t:ut,v:null,c:pt,m:null,g:null};function z(e,t,s){switch(t){case"x":e.transform.position.x=s;break;case"y":e.transform.position.y=s;break;case"sx":e.transform.scale.x=s;break;case"sy":e.transform.scale.y=s;break;case"kx":e.transform.skew.x=s;break;case"ky":e.transform.skew.y=s;break;case"r":e.transform.rotation=s;break;case"a":e.alpha=s;break;case"t":e.i(s);break;case"c":e.setColorTransform(...s);break;case"v":e.visible=s;break;case"m":e.ma(s);break}}function L(e){return t=>Math.pow(t,e)}function D(e){return t=>1-Math.pow(1-t,e)}function R(e){return t=>(t*=2)<1?.5*Math.pow(t,e):1-.5*Math.abs(Math.pow(2-t,e))}const E=1,j=.3,B=.3*1.5,q={quadIn:L(2),quadOut:D(2),quadInOut:R(2),cubicIn:L(3),cubicOut:D(3),cubicInOut:R(3),quartIn:L(4),quartOut:D(4),quartInOut:R(4),quintIn:L(5),quintOut:D(5),quintInOut:R(5),sineIn:e=>1-Math.cos(e*P/2),sineOut:e=>Math.sin(e*P/2),sineInOut:e=>-.5*(Math.cos(P*e)-1),backIn:e=>e*e*((1.7+1)*e-1.7),backOut:e=>--e*e*((1.7+1)*e+1.7)+1,backInOut:e=>(e*=2)<1?.5*(e*e*((2.5925+1)*e-2.5925)):.5*((e-=2)*e*((2.5925+1)*e+2.5925)+2),circIn:e=>-(Math.sqrt(1-e*e)-1),circOut:e=>Math.sqrt(1- --e*e),circInOut:e=>(e*=2)<1?-.5*(Math.sqrt(1-e*e)-1):.5*(Math.sqrt(1-(e-=2)*e)+1),bounceIn:e=>1-q.bounceOut(1-e),bounceOut:e=>e<1/2.75?7.5625*e*e:e<2/2.75?7.5625*(e-=1.5/2.75)*e+.75:e<2.5/2.75?7.5625*(e-=2.25/2.75)*e+.9375:7.5625*(e-=2.625/2.75)*e+.984375,bounceInOut:e=>e<.5?q.bounceIn(e*2)*.5:q.bounceOut(e*2-1)*.5+.5,elasticIn:e=>{if(e===0||e===1)return e;const t=j/w*Math.asin(1/E);return-(E*Math.pow(2,10*(e-=1))*Math.sin((e-t)*w/j))},elasticOut:e=>{if(e===0||e===1)return e;const t=j/w*Math.asin(1/E);return E*Math.pow(2,-10*e)*Math.sin((e-t)*w/j)+1},elasticInOut:e=>{const t=B/w*Math.asin(1/E);return(e*=2)<1?-.5*(E*Math.pow(2,10*(e-=1))*Math.sin((e-t)*w/B)):E*Math.pow(2,-10*(e-=1))*Math.sin((e-t)*w/B)*.5+1}};function Z(e){if(!e)return null;if(typeof e=="function")return e;if(e.n==="classic"){const t=e.s/100;return s=>(t+1)*s+-t*s*s}return q[e.n]}class A{constructor(t,s,r,i,n,h){var o;if(this.target=t,this.startProps=s,this.endProps={},this.duration=n,this.startFrame=i,this.endFrame=i+n,this.ease={},this.isTweenlessFrame=!r,r)for(const l in r)l!=="e"&&(this.endProps[l]=r[l],(o=r.e)!=null&&o[l]?this.ease[l]=Z(r.e[l]):this.ease[l]=h);for(const l in s)this.endProps.hasOwnProperty(l)||(this.endProps[l]=s[l])}setPosition(t){if(t>=this.endFrame){this.setToEnd();return}if(this.isTweenlessFrame){this.setToEnd();return}const s=(t-this.startFrame)/this.duration,r=this.target,i=this.startProps,n=this.endProps;for(const h in n){const o=h,l=mt[o];let a=s;this.ease[h]&&(a=this.ease[h](s)),l?z(r,o,l(i[o],n[o],a)):z(r,o,i[o])}}setToEnd(){const t=this.endProps,s=this.target;for(const r in t)z(s,r,t[r])}}class U extends Array{constructor(){super()}static create(t){const s=Object.create(U.prototype);return s.target=t,s._currentProps={},s}addTween(t,s,r,i){this.extendLastFrame(s-1);const n=Object.assign({},this._currentProps);for(const o in t){const l=o;if(!Object.hasOwnProperty.call(this._currentProps,o)){const a=n[l]=this.getPropFromShorthand(l);for(let c=this.length-1;c>=0;--c)this[c].startProps[l]=a,this[c].endProps[l]=a}}const h=new A(this.target,n,t,s,r,i);s===this[this.length-1].startFrame?this[this.length-1]=h:this.push(h),Object.assign(this._currentProps,h.endProps)}addKeyframe(t,s,r=0){if(this.length&&this[this.length-1].startFrame>=s){for(let i=this.length-1;i>=0;--i){const n=this[i];if(n.startFrame===s){Object.assign(n.startProps,t),n.endProps=Object.assign({},n.startProps,n.endProps);for(let h=i+1;h<this.length;++h){const o=this[h];o.startProps=Object.assign({},t,o.startProps),o.endProps=Object.assign({},o.startProps,o.endProps)}break}else if(n.startFrame<s&&n.endFrame>s&&n.isTweenlessFrame){n.endFrame=s-1;const h=Object.assign({},n.endProps,t),o=new A(this.target,h,null,s,r);this.splice(i,0,o);for(let l=i+1;l<this.length;++l){const a=this[l];a.startProps=Object.assign({},t,a.startProps),a.endProps=Object.assign({},a.startProps,a.endProps)}break}else if(n.endFrame<s){const h=Object.assign({},n.endProps,t),o=new A(this.target,h,null,s,r);this.splice(i,0,o);for(let l=i+1;l<this.length;++l){const a=this[l];a.startProps=Object.assign({},t,a.startProps),a.endProps=Object.assign({},a.startProps,a.endProps)}break}}Object.assign(this._currentProps,t,this._currentProps)}else{this.extendLastFrame(s-1);const i=Object.assign({},this._currentProps,t),n=new A(this.target,i,null,s,r);this.push(n),Object.assign(this._currentProps,n.endProps)}}extendLastFrame(t){if(this.length){const s=this[this.length-1];s.endFrame<t&&(s.isTweenlessFrame?(s.endFrame=t,s.duration=t-s.startFrame):this.addKeyframe(this._currentProps,s.endFrame+1,t-(s.endFrame+1)))}}getPropFromShorthand(t){const s=this.target;switch(t){case"x":return s.position.x;case"y":return s.position.y;case"sx":return s.scale.x;case"sy":return s.scale.y;case"kx":return s.skew.x;case"ky":return s.skew.y;case"r":return s.rotation;case"a":return s.alpha;case"v":return s.visible;case"m":return s.mask}return null}destroy(){this._currentProps=null,this.length=0}}class Q extends ot{constructor(){super(...arguments),this.ac=super.addChild,this.re=this.setRenderable,this.t=super.setTransform,this.ma=this.setMask,this.a=this.setAlpha,this.i=this.setTint,this.c=this.setColorTransform}setRenderable(t){return this.renderable=!!t,this}setMask(t){return t&&!(t instanceof M)&&!(t instanceof O)?(typeof console!="undefined"&&console.warn&&console.warn("Warning: Masks can only be PIXI.Graphics or PIXI.Sprite objects."),this):(this.mask=t,this)}setAlpha(t){return this.alpha=t,this}setTint(t){typeof t=="string"&&(t=y.hexToUint(t));const s=t>>16&255,r=t>>8&255,i=t&255;return this.setColorTransform(s/255,0,r/255,0,i/255,0)}setColorTransform(t,s,r,i,n,h){const o=this.colorTransformFilter;return o.matrix[0]=t,o.matrix[4]=s,o.matrix[6]=r,o.matrix[9]=i,o.matrix[12]=n,o.matrix[14]=h,this.filters=[o],this}set colorTransformFilter(t){this._colorTransformFilter=t}get colorTransformFilter(){return this._colorTransformFilter||new N}}const W=at.shared,F=class extends Q{constructor(t,s,r,i,n){if(super(),this.isMovieClip=!0,this.am=this.addTimedMask,this.tw=this.addTween,this.at=this.addTimedChild,this.aa=this.addAction,this.ps=this.playSound,t=t===void 0?{}:t,typeof t=="number"?t={mode:t||F.INDEPENDENT,duration:s||0,loop:r===void 0?!0:r,labels:n||{},framerate:i||0,startPosition:0}:t=Object.assign({mode:F.INDEPENDENT,startPosition:0,loop:!0,labels:{},duration:0,framerate:0},t),this.mode=t.mode,this.startPosition=t.startPosition,this.loop=!!t.loop,this.currentFrame=0,this._labels=[],this._labelDict=t.labels,t.labels){for(const h in t.labels){const o={label:h,position:t.labels[h]};this._labels.push(o)}this._labels.sort((h,o)=>h.position-o.position)}this.selfAdvance=!0,this.paused=!1,this.actionsEnabled=!0,this.autoReset=!0,this._synchOffset=0,this._prevPos=-1,this._t=0,this._framerate=t.framerate,this._duration=0,this._totalFrames=t.duration,this._timelines=[],this._timedChildTimelines=[],this._depthSorted=[],this._actions=[],this._beforeUpdate=null,this.parentStartPosition=0,this.mode===F.INDEPENDENT&&(this._tickListener=this._tickListener.bind(this),this._onAdded=this._onAdded.bind(this),this._onRemoved=this._onRemoved.bind(this),this.on("added",this._onAdded),this.on("removed",this._onRemoved)),t.framerate&&(this.framerate=t.framerate),this.advance=this.advance,this._updateTimeline=this._updateTimeline,this._setTimelinePosition=this._setTimelinePosition,this._goto=this._goto}_onAdded(){this._framerate||(this.framerate=this.parentFramerate),W.add(this._tickListener,null)}_tickListener(t){if(this.paused||!this.selfAdvance){this._prevPos<0&&this._goto(this.currentFrame);return}const s=t/ht.TARGET_FPMS/1e3;this.advance(s)}_onRemoved(){W.remove(this._tickListener,null)}get labels(){return this._labels}get labelsMap(){return this._labelDict}get currentLabel(){const t=this._labels;let s=null;for(let r=0,i=t.length;r<i&&t[r].position<=this.currentFrame;++r)s=t[r].label;return s}get elapsedTime(){return this._t}set elapsedTime(t){this._t=t}get framerate(){return this._framerate}set framerate(t){t>0?(this._framerate?this._t*=this._framerate/t:this._t=this.currentFrame/t,this._framerate=t,this._duration=t?this._totalFrames/t:0):this._t=this._framerate=this._duration=0}get totalFrames(){return this._totalFrames}_autoExtend(t){this._totalFrames<t&&(this._totalFrames=t)}_parseProperties(t){typeof t.t=="string"?t.t=y.hexToUint(t.t):typeof t.v=="number"&&(t.v=!!t.v)}_getChildTimeline(t){for(let r=this._timelines.length-1;r>=0;--r)if(this._timelines[r].target===t)return this._timelines[r];const s=U.create(t);return this._timelines.push(s),s}addTimedMask(t,s){for(const r in s)this.addKeyframe(t,{m:s[r]},parseInt(r,10));return this._setTimelinePosition(this.currentFrame,this.currentFrame,!0),this}addTween(t,s,r,i,n){const h=this._getChildTimeline(t);return this._parseProperties(s),h.addTween(s,r,i,n),this._autoExtend(r+i),this}addKeyframe(t,s,r){const i=this._getChildTimeline(t),{tw:n}=s;return delete s.tw,this._parseProperties(s),i.addKeyframe(s,r),this._autoExtend(r),n&&this.addTween(t,n.p,r,n.d,Z(n.e)),this}addTimedChild(t,s,r,i){var n,h;s===void 0&&(s=0),(r===void 0||r<1)&&(r=this._totalFrames||1),t instanceof F&&t.mode===F.SYNCHED&&(t.parentStartPosition=s);let o;for(let l=this._timedChildTimelines.length-1;l>=0;--l)if(this._timedChildTimelines[l].target===t){o=this._timedChildTimelines[l];break}if(o||(o=[],o.target=t,this._timedChildTimelines.push(o)),y.fillFrames(o,s,r),this._totalFrames<s+r&&(this._totalFrames=s+r),i){typeof i=="string"&&(i=y.deserializeKeyframes(i));let l=!1;for(const a in i)if(i[a].kx||i[a].ky){l=!0;break}if(l)for(const a in i)i[a].r!==void 0&&(i[a].kx=i[a].kx||i[a].r*-1,i[a].ky=i[a].ky||i[a].r,delete i[a].r),((h=(n=i[a].tw)==null?void 0:n.p)==null?void 0:h.r)!==void 0&&(i[a].tw.p.kx=i[a].tw.p.kx||i[a].tw.p.r*-1,i[a].tw.p.ky=i[a].tw.p.ky||i[a].tw.p.r,delete i[a].tw.p.r);for(const a in i)this.addKeyframe(t,i[a],parseInt(a,10));this._getChildTimeline(t).extendLastFrame(s+r-1)}return this._setTimelinePosition(s,this.currentFrame,!0),this}addAction(t,s){if(typeof s=="string"){const i=this._labelDict[s];if(i===void 0)throw new Error(`The label '${s}' does not exist on this timeline`);s=i}const r=this._actions;return r.length<=s&&(r.length=s+1),this._totalFrames<s&&(this._totalFrames=s),r[s]?r[s].push(t):r[s]=[t],this}playSound(t,s){return G.emit("play",t,!!s,this),this}play(){this.paused=!1}stop(){this.paused=!0}gotoAndPlay(t){this.paused=!1,this._goto(t)}gotoAndStop(t){this.paused=!0,this._goto(t)}get parentFramerate(){let t=this,s=t._framerate;for(;(t=t.parent)&&!s;)t.mode===F.INDEPENDENT&&(s=t._framerate);return s||F.DEFAULT_FRAMERATE}advance(t){this._framerate||(this.framerate=this.parentFramerate),t&&(this._t+=t),this._t>this._duration&&(this._t=this.loop?this._t%this._duration:this._duration),this.currentFrame=Math.floor(this._t*this._framerate+1e-8),this.currentFrame>=this._totalFrames&&(this.currentFrame=this._totalFrames-1);let s;this._beforeUpdate&&(s=this._beforeUpdate(this)),this._updateTimeline(),s&&s()}_goto(t){const s=typeof t=="string"?this._labelDict[t]:t;s!==void 0&&(this._prevPos=NaN,this.currentFrame=s,this._framerate||(this.framerate=this.parentFramerate),this._framerate>0?this._t=s/this._framerate:this._t=0,this._updateTimeline())}_reset(){this._prevPos=-1,this._t=0,this.currentFrame=0}_updateTimeline(){const t=this.mode!==F.INDEPENDENT;t&&(this.currentFrame=this.startPosition+(this.mode===F.SINGLE_FRAME?0:this._synchOffset),this.currentFrame>=this._totalFrames&&(this.currentFrame%=this._totalFrames)),this._prevPos!==this.currentFrame&&(this._setTimelinePosition(this._prevPos,this.currentFrame,t?!1:this.actionsEnabled),this._prevPos=this.currentFrame)}_setTimelinePosition(t,s,r){if(t!==s&&r){let l;isNaN(t)?l=s:l=t>=this._totalFrames-1?0:t+1;const a=[];if(s<l){for(let c=l;c<this._actions.length;++c)this._actions[c]&&a.push(c);for(let c=0;c<=s;++c)this._actions[c]&&a.push(c)}else for(let c=l;c<=s;++c)this._actions[c]&&a.push(c);if(a.length){const c=this.currentFrame;for(let b=0;b<a.length;++b){const d=a[b];if(this._setTimelinePosition(d,d,!0),this.currentFrame!==c||d===s)return;if(this.paused){this.currentFrame=d;return}}}}const i=this._timelines;for(let l=i.length-1;l>=0;--l){const a=i[l];for(let c=0,b=a.length;c<b;++c){const d=a[c];if(s>=d.startFrame&&s<=d.endFrame){d.setPosition(s);break}}}const n=this._timedChildTimelines,h=this._depthSorted;for(let l=0,a=n.length;l<a;++l){const c=n[l].target,b=n[l][s];b?(h.push(c),c.parent!==this&&(this.addChild(c),c instanceof F&&c.mode===F.INDEPENDENT&&c.autoReset&&c._reset())):!b&&c.parent===this&&this.removeChild(c)}for(let l=0,a=h.length;l<a;l++){const c=h[l];this.children.indexOf(c)!==l&&this.addChildAt(c,l)}h.length=0;const o=this.children;for(let l=0,a=o.length;l<a;++l){const c=o[l];c instanceof F&&c.mode===F.SYNCHED&&(c._synchOffset=s-c.parentStartPosition,c._updateTimeline())}if(r&&this._actions&&this._actions[s]){const l=this._actions[s];for(let a=0;a<l.length;++a)l[a].call(this)}}destroy(t){this._tickListener&&(W.remove(this._tickListener,null),this._tickListener=null);const s=[],r=this._timelines;if(r)for(let n=0;n<r.length;n++){const h=r[n];s.push(h.target),h.destroy()}const i=this._timedChildTimelines;if(i)for(let n=0;n<i.length;n++){const h=i[n];s.indexOf(h.target)<0&&s.push(h.target),h.length=0}for(let n=0;n<s.length;n++)this.children.indexOf(s[n])<0&&s[n].destroy(t);s.length=0,this._actions=null,this._timelines=null,this._depthSorted=null,this._timedChildTimelines=null,this._beforeUpdate=null,this._labels=null,this._labelDict=null,super.destroy(t)}};let I=F;I.INDEPENDENT=0,I.SINGLE_FRAME=1,I.SYNCHED=2,I.DEFAULT_FRAMERATE=24;class ft extends lt{constructor(){super(...arguments),this.sound=G,this.instance=null}load(t,s,r){return V(t,{parent:this.stage,createInstance:!0,complete:i=>{this.instance=i,s&&s(this.instance)},basePath:r})}destroy(t,s){this.instance&&(this.instance.destroy(!0),this.instance=null),super.destroy(t,s)}}const _t=[];class C{constructor(){this._update=this.update.bind(this),this.init(null,0,0,!1,null)}init(t,s,r,i,n){this.instance=t,this.loop=i,this.start=s,this.end=r,this.callback=n,t&&(t.loop=!1,t.gotoAndStop(s),t._beforeUpdate=this._update)}destroy(){this.instance._beforeUpdate=null,this.init(null,0,0,!1,null),C._pool.push(this)}update(t){let s;return t.currentFrame>=this.end&&(t.currentFrame=this.end,this.loop?(t._updateTimeline(),t.gotoAndPlay(this.start)):(t.stop(),this.callback&&(s=this.callback),this.stop())),s}stop(){tt._internalStop(this)}get progress(){const t=(this.instance.currentFrame-this.start)/(this.end-this.start);return Math.max(0,Math.min(1,t))}static get _pool(){return _t}static create(t,s,r,i,n){let h;return this._pool.length?h=this._pool.pop():h=new C,h.init(t,s,r,i,n),h}}const gt=[];class tt{static get _timelines(){return gt}static get STOP_LABEL(){return"_stop"}static get LOOP_LABEL(){return"_loop"}static play(t,s,r){let i=!1,n,h;if(!s||typeof s=="function")n=0,h=t.totalFrames-1,s&&typeof s=="function"&&(r=s,s=null);else{if(n=t.labelsMap[s],h=t.labelsMap[s+this.STOP_LABEL],h===void 0&&(h=t.labelsMap[s+this.LOOP_LABEL],i=!0),n===void 0)throw new Error(`No start label matching "${s}"`);if(h===void 0)throw new Error(`No end label matching "${s}"`)}return this.fromTo(t,n,h,i,r)}static to(t,s,r){return this.fromTo(t,t.currentFrame,s,!1,r)}static fromTo(t,s,r,i,n){if(typeof s=="string"){const o=s;if(s=t.labelsMap[o],s===void 0)throw new Error(`No start label matching "${o}"`)}if(typeof r=="string"){const o=r;if(r=t.labelsMap[o],r===void 0)throw new Error(`No end label matching "${o}"`)}if(s<0)throw new Error("Start frame is out of bounds");if(r>=t.totalFrames)throw new Error("End frame is out of bounds");if(s>=r)throw new Error("End frame is before start frame");this.stop(t),i=!!i;const h=C.create(t,s,r,i,n);return this._timelines.push(h),t.currentFrame!==s?t.gotoAndPlay(s):t.play(),h}static stop(t){for(let s=0,r=this._timelines.length;s<r;s++){const i=this._timelines[s];if(i.instance===t){this._internalStop(i);break}}}static stopAll(){for(let t=this._timelines.length-1;t>=0;t--)this._internalStop(this._timelines[t])}static _internalStop(t){this._timelines.splice(this._timelines.indexOf(t),1),t.instance.stop(),t.destroy()}}class bt extends O{constructor(){super(...arguments),this.re=this.setRenderable,this.t=super.setTransform,this.ma=this.setMask,this.a=this.setAlpha,this.i=this.setTint,this.c=this.setColorTransform}setRenderable(t){return this.renderable=!!t,this}setMask(t){return t&&!(t instanceof M)&&!(t instanceof O)?(typeof console!="undefined"&&console.warn&&console.warn("Warning: Masks can only be PIXI.Graphics or PIXI.Sprite objects."),this):(this.mask=t,this)}setAlpha(t){return this.alpha=t,this}setTint(t){return typeof t=="string"&&(t=y.hexToUint(t)),this.tint=t,this}setColorTransform(t,s,r,i,n,h){const o=this.colorTransformFilter;return o.matrix[0]=t,o.matrix[4]=s,o.matrix[6]=r,o.matrix[9]=i,o.matrix[12]=n,o.matrix[14]=h,this.filters=[o],this}set colorTransformFilter(t){this._colorTransformFilter=t}get colorTransformFilter(){return this._colorTransformFilter||new N}}class Tt extends M{constructor(t){super(t),this.d=this.drawCommands,this.cp=super.closePath,this.bh=super.beginHole,this.eh=super.endHole,this.m=super.moveTo,this.l=super.lineTo,this.q=super.quadraticCurveTo,this.b=super.bezierCurveTo,this.f=super.beginFill,this.dr=super.drawRect,this.rr=super.drawRoundedRect,this.rc=super.drawRoundedRect,this.dc=super.drawCircle,this.ar=super.arc,this.at=super.arcTo,this.de=super.drawEllipse,this.re=this.setRenderable,this.t=super.setTransform,this.ma=this.setMask,this.a=this.setAlpha,this.i=this.setTint,this.s=super.lineStyle}drawCommands(t){let s;const r=[];let i=0;for(;i<=t.length;){const n=t[i++];n===void 0||this[n]?(s&&(this[s].apply(this,r),r.length=0),s=n):r.push(n)}return this}s(...t){return super.lineStyle(...t)}lf(t){return console.warn("Linear gradient fills are not supported"),this.f(t[0])}rf(t){return console.warn("Radial gradient fills are not supported"),this.f(t[0])}bf(){return console.warn("Bitmap fills are not supported"),this.f(0)}sd(){return console.warn("Dashed strokes are not supported"),this}bs(){return console.warn("Bitmap strokes are not supported"),this}ls(){return console.warn("Linear gradient strokes are not supported"),this}rs(){return console.warn("Radial gradient strokes are not supported"),this}setRenderable(t){return this.renderable=!!t,this}setMask(t){return t&&!(t instanceof M)&&!(t instanceof O)?(typeof console!="undefined"&&console.warn&&console.warn("Warning: Masks can only be PIXI.Graphics or PIXI.Sprite objects."),this):(this.mask=t,this)}setAlpha(t){return this.alpha=t,this}setTint(t){typeof t=="string"&&(t=y.hexToUint(t));const s=t>>16&255,r=t>>8&255,i=t&255;return this.setColorTransform(s/255,0,r/255,0,i/255,0)}setColorTransform(t,s,r,i,n,h){const o=this.colorTransformFilter;return o.matrix[0]=t,o.matrix[4]=s,o.matrix[6]=r,o.matrix[9]=i,o.matrix[12]=n,o.matrix[14]=h,this.filters=[o],this}c(t,s,r,i,n,h){return this.setColorTransform(t,s,r,i,n,h)}set colorTransformFilter(t){this._colorTransformFilter=t}get colorTransformFilter(){return this._colorTransformFilter||new N}}var X=(e=>(e[e.center=0]="center",e[e.right=1]="right",e[e.left=-1]="left",e))(X||{});const st={o:"font",z:"fontSize",f:"fontFamily",y:"fontStyle",g:"fontWeight",i:"fill",a:"align",s:"stroke",t:"strokeThickness",w:"wordWrap",d:"wordWrapWidth",l:"lineHeight",h:"dropShadow",c:"dropShadowColor",n:"dropShadowAngle",b:"dropShadowBlur",p:"padding",x:"textBaseline",j:"lineJoin",m:"miterLimit",e:"letterSpacing"};function K(e,t){return e===void 0?t:e}class Ft extends ct{constructor(){super(...arguments),this.g=this.setAlign,this.ss=this.setStyle,this.sh=this.setShadow,this.re=this.setRenderable,this.t=super.setTransform,this.ma=this.setMask,this.a=this.setAlpha,this.i=this.setTint,this.c=this.setColorTransform}setAlign(t){return typeof t=="string"&&(t=X[t]),this.style.align=X[t]||"left",this.anchor.x=(t+1)/2,this}setStyle(t){for(const s in st)t[s]!==void 0&&(t[st[s]]=t[s],delete t[s]);return this.style=t,this}setShadow(t,s,r){const i=this.style;return i.dropShadow=!0,t&&typeof t=="number"&&(t=`#${t.toString(16)}`),i.dropShadowColor=K(t,i.dropShadowColor),i.dropShadowAngle=K(s,i.dropShadowAngle),i.dropShadowDistance=K(r,i.dropShadowDistance),this}setRenderable(t){return this.renderable=!!t,this}setMask(t){return t&&!(t instanceof M)&&!(t instanceof O)?(typeof console!="undefined"&&console.warn&&console.warn("Warning: Masks can only be PIXI.Graphics or PIXI.Sprite objects."),this):(this.mask=t,this)}setAlpha(t){return this.alpha=t,this}setTint(t){typeof t=="string"&&(t=y.hexToUint(t));const s=t>>16&255,r=t>>8&255,i=t&255;return this.setColorTransform(s/255,0,r/255,0,i/255,0)}setColorTransform(t,s,r,i,n,h){const o=this.colorTransformFilter;return o.matrix[0]=t,o.matrix[4]=s,o.matrix[6]=r,o.matrix[9]=i,o.matrix[12]=n,o.matrix[14]=h,this.filters=[o],this}set colorTransformFilter(t){this._colorTransformFilter=t}get colorTransformFilter(){return this._colorTransformFilter||new N}}const wt="2.0.5";export{tt as Animator,C as AnimatorTimeline,Q as Container,Tt as Graphics,I as MovieClip,ft as Scene,bt as Sprite,Ft as Text,U as Timeline,A as Tween,wt as VERSION,V as load,G as sound,y as utils};
//# sourceMappingURL=pixi-animate.mjs.map