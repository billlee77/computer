try{
document.domain=""+XN.env.domain+"";
}
catch(e){
try{
XN={env:{shortSiteName:"\u4eba\u4eba",siteName:"\u4eba\u4eba\u7f51",domain:window.location.hostname.split(".").reverse().slice(0,2).reverse().join(".")}};
document.domain=XN.env.domain;
}
catch(e){
}
}
function isUndefined(_1){
return typeof _1=="undefined";
}
function isString(_2){
return typeof _2=="string";
}
function isElement(_3){
return _3&&_3.nodeType==1;
}
function isFunction(_4){
return typeof _4=="function";
}
function isObject(_5){
return typeof _5=="object";
}
function isArray(_6){
return Object.prototype.toString.call(_6)==="[object Array]";
}
function isNumber(_7){
return typeof _7=="number";
}
function $extend(_8,_9){
if(!_9){
return _8;
}
for(var p in _9){
_8[p]=_9[p];
}
return _8;
}
(function(){
var _b={};
$element=function(_c){
_c=_c.toLowerCase();
if(!_b[_c]){
_b[_c]=document.createElement(_c);
}
return $(_b[_c].cloneNode(false));
};
})();
function $(id){
var el;
if(isString(id)||isNumber(id)){
el=document.getElementById(id+"");
}else{
el=id;
}
if(!el){
return null;
}
if(!el._extendLevel){
XN.element.extend(el);
}
return el;
}
xn_getEl=$;
if(!Function.prototype.bind){
Function.prototype.bind=function(_f){
var _10=this;
return function(){
_10.apply(_f,arguments);
};
};
}
ge=getEl=$;
$xElement=$element;
$X=$;
if(typeof XN=="undefined"){
XN={};
}
$extend(XN,{namespace:function(){
var a=arguments,o=null,i,j,d;
for(i=0;i<a.length;i++){
d=a[i].split(".");
o=XN;
for(j=(d[0]=="XN")?1:0;j<d.length;j++){
o[d[j]]=o[d[j]]||{};
o=o[d[j]];
}
}
return o;
}});
XN.namespace("ui");
XN.namespace("util");
XN.namespace("app");
XN.namespace("page");
XN.namespace("config");
XN.APP=XN.App=XN.app;
XN.PAGE=XN.Page=XN.page;
XN.CONFIG=XN.Config=XN.config;
XN.DEBUG_MODE=false;
XN.debug={log:function(){
},on:function(){
XN.DEBUG_MODE=true;
if(window.console&&console.log){
XN.debug.log=function(s){
console.log(s);
};
}
},off:function(){
XN.debug.log=function(){
};
}};
XN.log=function(s){
XN.debug.log(s);
};
XN.DEBUG=XN.Debug=XN.debug;
XN.debug.On=XN.debug.on;
XN.debug.Off=XN.debug.off;
XN.namespace("env");
$extend(XN.env,{domain_reg:XN.env.domain.replace(/\./g,"\\."),staticRoot:"http://s.xnimg.cn/",CDNstaticRoot:"http://xnimg.cn/",swfRoot:"http://static.xiaonei.com/",wwwRoot:"http://"+XN.env.domain+"/"});
XN.ENV=XN.Env=XN.env;
XN.array={toQueryString:function(a,key){
var rt=[],t;
for(var k in a){
t=a[k];
if(isFunction(t)){
continue;
}
if(isObject(t)){
rt.push(arguments.callee(t,k));
}else{
if(/^\d+$/.test(k)){
rt.push((key||k)+"="+encodeURIComponent(t));
}else{
rt.push(k+"="+encodeURIComponent(t));
}
}
}
return rt.join("&");
},each:function(a,_1e){
if(!a){
return;
}
if(!isUndefined(a.length)||!isUndefined(a[0])){
for(var i=0,j=a.length;i<j;i++){
if(_1e.call(a,i,a[i])===false){
break;
}
}
}else{
for(var key in a){
if(!isFunction(a[key])){
if(_1e.call(a,key,a[key])===false){
break;
}
}
}
}
},include:function(a,_23){
var r=false;
XN.array.each(a,function(i,v){
if(v===_23){
r=true;
return false;
}
});
return r;
},build:function(o){
var rt=[];
for(var i=0,j=o.length;i<j;i++){
rt.push(o[i]);
}
return rt;
}};
XN.ARRAY=XN.Array=XN.array;
XN.string={nl2br:function(str){
return str.replace(/([^>])\n/g,"$1<br />");
},trim:function(str){
return str.replace(/^\s+|\s+$/g,"");
},ltrim:function(str){
return str.replace(/^\s+/,"");
},rtrim:function(str){
return str.replace(/\s+$/,"");
},strip:function(str){
return XN.string.trim(str);
},stripTags:function(str){
return str.replace(/<\/?[^>]+>/igm,"");
},escapeHTML:function(str){
return str.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
},unescapeHTML:function(str){
return str.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&nbsp;/g," ").replace(/&quot;/g,"\"").replace(/&amp;/g,"&");
},include:function(str,key){
return str.indexOf(key)>-1;
},startsWith:function(str,key){
return str.indexOf(key)===0;
},endsWith:function(str,key){
var d=str.length-key.length;
return d>=0&&str.lastIndexOf(key)===d;
},isBlank:function(str){
return /^\s*$/.test(str);
},isEmail:function(str){
return /^[A-Z_a-z0-9-\.]+@([A-Z_a-z0-9-]+\.)+[a-z0-9A-Z]{2,4}$/.test(str);
},isMobile:function(str){
return /^((\(\d{2,3}\))|(\d{3}\-))?((1[345]\d{9})|(18\d{9}))$/.test(str);
},isUrl:function(str){
return /^(http:|ftp:)\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"])*$/.test(str);
},isIp:function(str){
return /^(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5]).(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5]).(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5]).(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5])$/.test(str);
},isNumber:function(str){
return /^\d+$/.test(str);
},isZip:function(str){
return /^[1-9]\d{5}$/.test(str);
},isEN:function(str){
return /^[A-Za-z]+$/.test(str);
},isJSON:function(str){
if(!isString(str)||str===""){
return false;
}
str=str.replace(/\\./g,"@").replace(/"[^"\\\n\r]*"/g,"");
return (/^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/).test(str);
},getQuery:function(key,url){
url=url||window.location.href;
if(url.indexOf("#")!==-1){
url=url.substring(0,url.indexOf("#"));
}
var rts=[],rt;
var _47=new RegExp("(^|\\?|&)"+key+"=([^&]*)(?=&|#|$)","g");
while((rt=_47.exec(url))!=null){
rts.push(decodeURIComponent(rt[2]));
}
if(rts.length==0){
return null;
}
if(rts.length==1){
return rts[0];
}
return rts;
},setQuery:function(key,_49,url){
url=url||window.location.href;
var _4b="";
if(!/^http/.test(url)){
return url;
}
if(url.indexOf("#")!==-1){
_4b=url.substring(url.indexOf("#"));
}
url=url.replace(_4b,"");
url=url.replace(new RegExp("(^|\\?|&)"+key+"=[^&]*(?=&|#|$)","g"),"");
_49=isArray(_49)?_49:[_49];
for(var i=_49.length-1;i>=0;i--){
_49[i]=encodeURIComponent(_49[i]);
}
var p=key+"="+_49.join("&"+key+"=");
return url+(/\?/.test(url)?"&":"?")+p+_4b;
}};
XN.String=XN.STRING=XN.string;
XN.string.isNum=XN.string.isNumber;
window.isJSON=XN.string.isJSON;
(function(){
runOnceFunc={};
XN.func={empty:function(){
},runOnce:function(_4e){
if(runOnceFunc[_4e]){
return null;
}
runOnceFunc[_4e]=true;
return _4e();
}};
})();
XN.FUNC=XN.Func=XN.func;
(function(){
XN.browser={IE:!!(window.attachEvent&&!window.opera),IE6:navigator.userAgent.indexOf("MSIE 6.0")>-1,IE7:navigator.userAgent.indexOf("MSIE 7.0")>-1,IE8:navigator.userAgent.indexOf("MSIE 8.0")>-1,Opera:!!window.opera,WebKit:navigator.userAgent.indexOf("AppleWebKit/")>-1,Gecko:navigator.userAgent.indexOf("Gecko")>-1&&navigator.userAgent.indexOf("KHTML")==-1,copy:function(o){
function onfail(){
if(isElement(o)){
o.select();
}
}
var str;
if(isElement(o)){
str=o.value;
}else{
str=o;
}
if(window.clipboardData&&clipboardData.setData){
if(clipboardData.setData("text",str)){
return true;
}
}else{
XN.DO.alert({message:"\u60a8\u7684\u6d4f\u89c8\u5668\u4e0d\u652f\u6301\u811a\u672c\u590d\u5236,\u8bf7\u5c1d\u8bd5\u624b\u52a8\u590d\u5236",callBack:function(){
onfail();
}});
return false;
}
XN.DO.alert({message:"\u60a8\u7684\u6d4f\u89c8\u5668\u8bbe\u7f6e\u4e0d\u5141\u8bb8\u811a\u672c\u8bbf\u95ee\u526a\u5207\u677f",callBack:function(){
onfail();
}});
return false;
}};
})();
XN.BROWSER=XN.Browser=XN.browser;
XN.cookie={get:function(_51){
var _52=_51+"=";
var ca=document.cookie.split(";");
for(var i=0;i<ca.length;i++){
var c=ca[i];
while(c.charAt(0)==" "){
c=c.substring(1,c.length);
}
if(c.indexOf(_52)==0){
return decodeURIComponent(c.substring(_52.length,c.length));
}
}
return null;
},set:function(_56,_57,_58,_59,_5a,_5b){
var _5c;
if(isNumber(_58)){
var _5d=new Date();
_5d.setTime(_5d.getTime()+(_58*24*60*60*1000));
_5c=_5d.toGMTString();
}else{
if(isString(_58)){
_5c=_58;
}else{
_5c=false;
}
}
document.cookie=_56+"="+encodeURIComponent(_57)+(_5c?";expires="+_5c:"")+(_59?";path="+_59:"")+(_5a?";domain="+_5a:"")+(_5b?";secure":"");
},del:function(_5e,_5f,_60,_61){
XN.cookie.set(_5e,"",-1,_5f,_60,_61);
}};
XN.COOKIE=XN.Cookie=XN.cookie;
(function(){
var _62=XN.browser;
XN.event={isCapsLockOn:function(e){
var c=e.keyCode||e.which;
var s=e.shiftKey;
if(((c>=65&&c<=90)&&!s)||((c>=97&&c<=122)&&s)){
return true;
}
return false;
},element:function(e){
var n=e.target||e.srcElement;
return _68.resolveTextNode(n);
},relatedTarget:function(e){
var t=e.relatedTarget;
if(!t){
if(e.type=="mouseout"||e.type=="mouseleave"){
t=e.toElement;
}else{
if(e.type=="mouseover"){
t=e.fromElement;
}
}
}
return _68.resolveTextNode(t);
},resolveTextNode:function(n){
try{
if(n&&3==n.nodeType){
return n.parentNode;
}
}
catch(e){
}
return n;
},pointerX:function(_6c){
return _6c.pageX||(_6c.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft));
},pointerY:function(_6d){
return _6d.pageY||(_6d.clientY+(document.documentElement.scrollTop||document.body.scrollTop));
},isStrictMode:document.compatMode!="BackCompat",pageHeight:function(){
return this.isStrictMode?Math.max(document.documentElement.scrollHeight,document.documentElement.clientHeight):Math.max(document.body.scrollHeight,document.body.clientHeight);
},pageWidth:function(){
return this.isStrictMode?Math.max(document.documentElement.scrollWidth,document.documentElement.clientWidth):Math.max(document.body.scrollWidth,document.body.clientWidth);
},winWidth:function(){
return this.isStrictMode?document.documentElement.clientWidth:document.body.clientWidth;
},winHeight:function(){
return this.isStrictMode?document.documentElement.clientHeight:document.body.clientHeight;
},scrollTop:function(){
if(XN.browser.WebKit){
return window.pageYOffset;
}
return this.isStrictMode?document.documentElement.scrollTop:document.body.scrollTop;
},scrollLeft:function(){
if(XN.browser.WebKit){
return window.pageXOffset;
}
return this.isStrictMode?document.documentElement.scrollLeft:document.body.scrollLeft;
},stop:null,addEvent:null,delEvent:null,enableCustomEvent:function(obj){
$extend(obj,{addEvent:function(_6f,_70){
if(!this._customEventListeners){
this._customEventListeners={};
}
var _71=this._customEventListeners;
if(isUndefined(_71[_6f])){
_71[_6f]=[];
}
_71[_6f].push(_70);
return this;
},delEvent:function(_72,_73){
var _74=this._customEventListeners[_72];
if(_74){
for(var i=_74.length-1;i>=0;i--){
if(_74[i]==_73){
_74[i]=null;
break;
}
}
}
return this;
},fireEvent:function(_76){
if(!this._customEventListeners||!this._customEventListeners[_76]){
return;
}
var _77=this._customEventListeners[_76],ars=XN.array.build(arguments);
ars.shift();
for(var i=0,j=_77.length;i<j;i++){
if(_77[i]){
try{
_77[i].apply(this,ars);
}
catch(ox){
if(XN.DEBUG_MODE){
throw ox;
}
}
}
}
}});
return obj;
}};
var _68=XN.event;
if(_62.IE){
_68.stop=function(_7b){
_7b.returnValue=false;
_7b.cancelBubble=true;
};
}else{
_68.stop=function(_7c){
_7c.preventDefault();
_7c.stopPropagation();
};
}
var _7d=function(_7e,_7f){
var p=_7e.relatedTarget;
while(p&&p!=_7f){
try{
p=p.parentNode;
}
catch(error){
p=_7f;
}
}
return p!==_7f;
};
if(window.attachEvent&&!_62.Opera){
_68.addEvent=function(_81,_82,_83){
_81=$(_81);
if(_82=="keypress"){
_82="keydown";
}
if(_82=="input"){
_82="propertychange";
}
_81.attachEvent("on"+_82,_83);
return _81;
};
_68.delEvent=function(_84,_85,_86){
_84=$(_84);
if(_85=="keypress"){
_85="keydown";
}
if(_85=="input"){
_85="propertychange";
}
_84.detachEvent("on"+_85,_86);
return _84;
};
}else{
if(window.addEventListener){
_68.addEvent=function(_87,_88,_89,_8a){
_87=$(_87);
if(_88=="mouseleave"){
_87.onmouseleave=function(e){
e=e||window.event;
if(_7d(e,_87)&&_89){
_89.call(_87,e);
}
};
_87.addEventListener("mouseout",_87.onmouseleave,_8a);
return _87;
}
if(_88=="keypress"&&_62.WebKit){
_88="keydown";
}
_87.addEventListener(_88,_89,_8a);
return _87;
};
_68.delEvent=function(_8c,_8d,_8e,_8f){
_8c=$(_8c);
if(_8d=="mouseleave"){
_8c.removeEventListener("mouseout",_8c.onmouseleave,_8f);
return _8c;
}
if(_8d=="keypress"&&_62.WebKit){
_8d="keydown";
}
_8c.removeEventListener(_8d,_8e,_8f);
return _8c;
};
}
}
})();
XN.EVENT=XN.Event=XN.event;
(function(){
var _90=XN.event;
var _91=XN.array;
var _92=XN.browser;
var _93=false;
var _94=[];
function runHooks(){
if(!_94){
return;
}
XN.array.each(_94,function(i,v){
try{
v();
}
catch(e){
if(XN.DEBUG_MODE){
throw e;
}
}
});
}
var _97=null;
function createShadow(_98,_99){
_98=_98||0.3;
_99=_99||2000;
var el=$element("div");
_97=el;
el.setStyle(["position:absolute;","top:0;","left:0;","background:#000;","z-index:"+_99+";","opacity:"+_98+";","filter:alpha(opacity="+(_98*100)+");"].join(""));
el.innerHTML=["<iframe width=\"100%\" height=\"100%\" frameBorder=\"0\" style=\"position:absolute;top:0;left:0;z-index:1;\"></iframe>","<div style=\"position:absolute;top:0;left:0;width:100%;height:100%;background-color:#000000;z-index:2;height:expression(this.parentNode.offsetHeight);\"></div>"].join("");
function resize(){
el.hide();
el.style.height=XN.event.pageHeight()+"px";
el.style.width=XN.event.pageWidth()+"px";
el.show();
}
resize();
XN.event.addEvent(window,"resize",function(e){
if(_97&&_97.style.display!="none"){
try{
resize();
}
catch(e){
}
}
});
document.body.appendChild(el);
}
XN.dom={disable:function(_9c,_9d){
if(!_97){
createShadow(_9c,_9d);
}
},enable:function(){
if(_97){
_97.remove();
_97=null;
}
},insertAfter:function(_9e,_9f){
_9e=$(_9e);
_9f=$(_9f);
var _a0=_9f.parentNode;
if(_a0.lastChild==_9f){
_a0.appendChild(_9e);
}else{
_a0.insertBefore(_9e,_9f.nextSibling);
}
},getElementsByClassName:function(_a1,_a2,_a3){
var c=($(_a2)||document).getElementsByTagName(_a3||"*")||document.all;
var _a5=[];
var _a6=new RegExp("(^|\\s)"+_a1+"(\\s|$)");
_91.each(c,function(i,v){
if(_a6.test(v.className)){
_a5.push(v);
}
});
return _a5;
},ready:function(f){
_93?f():_94.push(f);
},preloadImg:function(src){
src=isArray(src)?src:[src];
_91.each(src,function(i,v){
new Image().src=v;
});
}};
if(_92.WebKit){
var _ad=setInterval(function(){
if(/loaded|complete/.test(document.readyState)){
_93=true;
runHooks();
clearInterval(_ad);
}
},10);
}else{
if(document.addEventListener){
document.addEventListener("DOMContentLoaded",function(){
_93=true;
runHooks();
},false);
}else{
var _ad=setInterval(function(){
try{
document.body.doScroll("left");
clearInterval(_ad);
_93=true;
runHooks();
}
catch(e){
}
},20);
}
}
})();
XN.DOM=XN.Dom=XN.dom;
XN.dom.readyDo=XN.dom.ready;
XN.dom.ready(function(){
$=ge=getEl=xn_getEl;
});
XN.namespace("config");
XN.config.jumpOut=true;
XN.dom.ready(function(){
if(XN.config.parentDomain||(!XN.config.jumpOut)){
return;
}
try{
top.location.href.indexOf("x");
}
catch(e){
try{
top.location=self.location;
}
catch(e){
}
}
});
(function(){
var _ae={};
var _af={};
function hasLoad(_b0){
return !!getFile(_b0);
}
function getFile(_b1){
return _ae[encodeURIComponent(_b1)];
}
function mark(_b2){
var obj={};
obj.file=_b2;
obj.isLoad=true;
obj.isLoaded=true;
_ae[encodeURIComponent(_b2)]=obj;
}
function addFile(_b4){
var obj={};
obj.file=_b4;
obj.isLoaded=false;
XN.EVENT.enableCustomEvent(obj);
obj.addEvent("load",function(){
this.isLoaded=true;
});
_ae[encodeURIComponent(_b4)]=obj;
var el=$element("script");
el.type="text/javascript";
el.src=_b4;
obj.element=el;
if(XN.Browser.IE){
el.onreadystatechange=function(){
if((this.readyState=="loaded"||this.readyState=="complete")&&!this.hasLoad){
this.hasLoad=true;
getFile(_b4).fireEvent("load");
}
};
}else{
el.onload=function(){
getFile(_b4).fireEvent("load");
};
}
document.getElementsByTagName("head")[0].appendChild(el);
}
function loadFile(_b7,_b8){
var _b9=false,_ba=false;
if(isObject(_b7)){
_b9=(_b7.type=="js");
_ba=(_b7.type=="css");
_b7=_b7.file;
}
_b7=getFullName(_b7);
if(/\.js(\?|$)/.test(_b7)||_b9){
if(!hasLoad(_b7)){
addFile(_b7);
}
if(!_b8){
return;
}
if(getFile(_b7).isLoaded){
_b8.call(getFile(_b7));
}else{
getFile(_b7).addEvent("load",_b8);
}
}else{
if(/\.css(\?|$)/.test(_b7)||_ba){
if(hasLoad(_b7)){
return;
}
mark(_b7);
var el=$element("link");
el.rel="stylesheet";
el.type="text/css";
el.href=_b7;
document.getElementsByTagName("head")[0].appendChild(el);
if(_b8){
_b8.call(getFile(_b7));
}
}
}
}
function getFullName(_bc){
XN.func.runOnce(loadVersion);
if(!_af[_bc]){
return _bc;
}
return _af[_bc].file;
}
function getVersion(_bd){
var _be;
if(_be=new RegExp("("+XN.env.staticRoot+")"+"(a?\\d+)/([^?]*)").exec(_bd)){
_af[_be[1]+_be[3]]={file:_bd,version:_be[2]};
}else{
if(_be=new RegExp("(.*)\\?ver=(d+)(..*)").exec(_bd)){
_af[_be[1]]={file:_bd,version:_be[2]};
}
}
}
XN.getFileVersion=function(_bf){
XN.array.each(_bf,function(i,v){
getVersion(v);
});
};
XN.loadFile=function(_c2,_c3){
loadFile(_c2,_c3);
};
XN.loadFiles=function(_c4,_c5){
var f=_c4.length;
function isAllLoad(){
f--;
if(f===0&&_c5){
_c5();
}
}
XN.array.each(_c4,function(i,v){
XN.loadFile(v,isAllLoad);
});
};
XN.getVersion=function(_c9){
getVersion(_c9);
};
function loadVersion(){
XN.array.each(document.getElementsByTagName("script"),function(i,v){
if(v.src){
mark(v.src);
getVersion(v.src);
}
if(v.getAttribute("vsrc")){
getVersion(v.getAttribute("vsrc"));
}
});
XN.array.each(document.getElementsByTagName("link"),function(i,v){
if(v.rel&&v.rel=="stylesheet"){
mark(v.href);
getVersion(v.href);
}
if(v.getAttribute("vhref")){
getVersion(v.getAttribute("vhref"));
}
});
XN.log("load file version:");
XN.log(_af);
}
XN.dynamicLoad=function(_ce){
XN.array.each(_ce.funcs,function(i,_d0){
window[_d0]=function(){
var ars=arguments;
window[_d0]=null;
if(_ce.file){
_ce.files=[_ce.file];
}
XN.loadFiles(_ce.files,function(){
window[_d0].apply(null,ars);
if(_ce.callBack){
_ce.callBack.call(null);
}
});
};
});
};
XN.namespace("img");
XN.img.getVersion=function(_d2){
XN.func.runOnce(loadVersion);
if(!_af[_d2]){
return "";
}
return _af[_d2].version;
};
XN.img.getFullName=function(_d3){
return getFullName(_d3);
};
})();
(function(){
var _d4=XN.event.addEvent;
var _d5=XN.event.delEvent;
var _d6=XN.browser;
XN.element={clear:function(_d7){
_d7=$(_d7);
_d7.innerHTML="";
return _d7;
},hover:function(_d8,_d9,_da){
_d8=$(_d8);
_da=_da?$(_da):_d8;
_d4(_d8,"mouseover",function(){
_da.addClass(_d9);
},false);
_d4(_d8,"mouseleave",function(){
_da.delClass(_d9);
},false);
return _d8;
},scrollTo:function(_db,_dc){
_db=$(_db);
_dc=_dc||"normal";
switch(_dc){
case "slow":
XN.EFFECT.scrollTo(_db);
break;
default:
window.scrollTo(0,_db.realTop());
break;
}
return _db;
},visible:function(_dd){
_dd=$(_dd);
return _dd.style.display!="none"&&_dd.style.visibility!="hidden";
},toggleClass:function(_de,_df){
if(_e0.hasClassName(_de,_df)){
_e0.delClass(_de,_df);
}else{
_e0.addClass(_de,_df);
}
return $(_de);
},hasClassName:function(_e1,_e2){
return new RegExp("(^|\\s+)"+_e2+"(\\s+|$)").test($(_e1).className);
},addClass:function(_e3,_e4){
_e3=$(_e3);
if(_e0.hasClassName(_e3,_e4)){
return _e3;
}
_e3.className+=" "+_e4;
return _e3;
},delClass:function(_e5,_e6){
_e5=$(_e5);
_e5.className=_e5.className.replace(new RegExp("(^|\\s+)"+_e6+"(\\s+|$)","g")," ");
return _e5;
},show:function(_e7,_e8){
_e7=$(_e7);
if(_e7.style.display!="none"){
return;
}
_e8=_e8||"normal";
switch(_e8){
case "normal":
_e7.style.display="";
break;
case "fade":
XN.EFFECT.fadeIn(_e7,function(e){
e.style.display="";
});
break;
case "slide":
XN.EFFECT.slideOpen(_e7);
break;
case "delay":
setTimeout(function(){
_e7.style.display="";
},2000);
break;
}
return _e7;
},hide:function(_ea,_eb){
_ea=$(_ea);
if(_ea.style.display=="none"){
return;
}
_eb=_eb||"normal";
switch(_eb){
case "normal":
_ea.style.display="none";
break;
case "fade":
XN.EFFECT.fadeOut(_ea,function(e){
e.style.display="none";
});
break;
case "slide":
XN.EFFECT.slideClose(_ea);
break;
case "delay":
setTimeout(function(){
_ea.style.display="none";
},2000);
break;
}
return _ea;
},remove:function(_ed){
var _ed=$(_ed);
_ed.parentNode.removeChild(_ed);
return _ed;
},setStyle:function(_ee,_ef){
var _ee=$(_ee);
_ee.style.cssText+=";"+_ef;
return _ee;
},getStyle:function(_f0,_f1){
_f0=$(_f0);
_f1=_f1=="float"?"cssFloat":_f1;
var _f2=_f0.style[_f1];
if(!_f2){
var css=document.defaultView.getComputedStyle(_f0,null);
_f2=css?css[_f1]:null;
}
if(_f1=="opacity"){
return _f2?parseFloat(_f2):1;
}
return _f2=="auto"?null:_f2;
},addEvent:function(){
_d4.apply(null,arguments);
return arguments[0];
},delEvent:function(){
_d5.apply(null,arguments);
return arguments[0];
},addChild:function(_f4,_f5){
_f4=$(_f4);
if(isString(_f5)){
var _f6=(_f5.substring(0,1)=="#")?$(_f5.substring(1,_f5.length)):_f5;
if(isString(_f6)){
_f4.innerHTML+=_f6;
}else{
_f4.appendChild(_f6);
}
}else{
if(isElement(_f5)){
_f4.appendChild(_f5);
}else{
if(_f5.iAmUIelement){
_f4.appendChild($(_f5.frame));
}else{
if(_f5.iAmXmlhttp){
_f5.fillTo=_f4;
_f4.startLoading();
}
}
}
}
return _f4;
},delChild:function(_f7,_f8){
_f8=$(_f8);
_f8.remove();
return $(_f7);
},setContent:function(_f9,c){
_f9=$(_f9);
_f9.innerHTML="";
_f9.addChild(c);
return _f9;
},getPosition:function(_fb,_fc){
_fc=$(_fc)||document.body;
_fb=$(_fb);
var rl=0;
var rt=0;
var p=_fb;
try{
while(p&&p!=_fc){
rl+=p.offsetLeft;
rt+=p.offsetTop;
p=p.offsetParent;
}
}
catch(e){
}
return {"left":rl,"top":rt};
},realLeft:function(_100,p){
return _e0.getPosition(_100,p||null).left;
},realTop:function(_102,p){
return _e0.getPosition(_102,p||null).top;
},appendHTML:function(_104,str,_106){
_104=$(_104);
var f=document.createDocumentFragment();
var t=$element("div");
t.innerHTML=str;
while(t.firstChild){
f.appendChild(t.firstChild);
}
var tmp=XN.array.build(f.childNodes);
_104.appendChild(f);
if(_106){
return tmp;
}
return _104;
},startLoading:function(_10a,msg){
_10a=$(_10a);
_10a.innerHTML="<center><img src=\""+XN.ENV.staticRoot+"img/indicator.gif\" />"+(msg||"\u52a0\u8f7d\u4e2d...")+"</center>";
return _10a;
},stopLoading:function(_10c){
_10c=$(_10c);
return _10c;
},eval_inner_JS:function(el){
var js=$(el).getElementsByTagName("script");
XN.array.each(js,function(i,s){
if(s.src){
XN.loadFile(s.src);
}else{
var _111="__inner_js_out_put = [];\n";
_111+=s.innerHTML.replace(/document\.write/g,"__inner_js_out_put.push");
eval(_111);
if(__inner_js_out_put.length!==0){
var tmp=document.createDocumentFragment();
$(tmp).appendHTML(__inner_js_out_put.join(""));
s.parentNode.insertBefore(tmp,s);
}
}
});
}};
XN.element.extend=function(_113){
if(_113._extendLevel){
return _113;
}
var _114=_e0.extend.cache;
for(var m in _e0){
if(!(m in _113)){
_113[m]=_114.findOrStore(_e0[m]);
}
}
return _113;
};
XN.element.extend.cache={findOrStore:function(_116){
return this[_116]=this[_116]||function(){
return _116.apply(null,[this].concat(XN.array.build(arguments)));
};
}};
var _e0=XN.element;
if(_d6.IE){
XN.element.getStyle=function(_117,_118){
_117=$(_117);
_118=(_118=="float"||_118=="cssFloat")?"styleFloat":_118;
var _119=_117.style[_118];
if(!_119&&_117.currentStyle){
_119=_117.currentStyle[_118];
}
if(_118=="opacity"){
if(_119=(_117.getStyle("filter")||"").match(/alpha\(opacity=(.*)\)/)){
if(_119[1]){
return parseFloat(_119[1])/100;
}
}
return 1;
}
if(_119=="auto"){
if((_118=="width"||_118=="height")&&(_117.getStyle("display")!="none")){
return _117["offset"+(_118=="width"?"Width":"Height")]+"px";
}
return null;
}
return _119;
};
}
if(document.addEventListener){
XN.element.setOpacity=function(_11a,_11b){
_11a=$(_11a);
_11a.style.opacity=_11b;
return _11a;
};
}else{
XN.element.setOpacity=function(_11c,_11d){
_11c=$(_11c);
_11c.style.zoom=1;
_11c.style.filter="Alpha(opacity="+Math.ceil(_11d*100)+")";
return _11c;
};
}
})();
XN.ELEMENT=XN.Element=XN.element;
XN.namespace("net");
XN.net.proxys={};
XN.net.sendForm=function(_11e){
XN.log("send form");
_11e.data=XN.FORM.serialize(_11e.form);
return new XN.net.xmlhttp(_11e);
};
XN.net.xmlhttp=function(_11f){
var This=this;
if(!XN.net.cache){
XN.net.cache=new XN.util.cache();
}
var ars=arguments;
if(ars.length>1){
this.url=ars[0]||null;
this.data=ars[1]||"";
this.onSuccess=ars[2];
$extend(this,ars[3]);
init(window);
return this;
}
$extend(this,_11f);
var _122;
if(this.useCache&&(_122=XN.net.cache.get(this.url+encodeURIComponent(this.data)))){
this.transport={};
this.transport.responseText=_122;
setTimeout(function(){
This._onComplete();
This._onSuccess();
},0);
return this;
}
function getDomain(link){
var a=$element("a");
a.href=link;
return a.hostname;
}
if(/^http/.test(this.url)){
var cd=getDomain(window.location.href);
var nd=getDomain(this.url);
if(cd!=nd){
if(XN.net.proxys[nd]){
init(XN.net.proxys[nd]);
return This;
}else{
var _127=$element("iframe").hide();
document.body.appendChild(_127);
_127.src="http://"+nd+"/ajaxproxy.htm";
XN.event.addEvent(_127,"load",function(){
try{
init(_127.contentWindow);
XN.net.proxys[nd]=_127.contentWindow;
}
catch(e){
}
});
return This;
}
}else{
init(window);
}
}else{
init(window);
}
function init(w){
This.transport=This.getTransport(w);
if(This.url&&This.url!==""){
This.send(This.method);
}
}
};
XN.net.xmlhttp.prototype={url:null,data:"",onSuccess:null,onFailure:null,onError:null,fillTo:null,method:"post",asynchronous:true,transport:null,headers:null,iAmXmlhttp:true,useCache:false,abort:function(){
this.transport.abort();
},send:function(_129){
var _url;
if(_129=="get"&&this.data!==""){
_url=this.url+(/\?/.test(this.url)?"&":"?")+this.data;
}else{
_url=this.url;
}
if(this.asynchronous){
this.transport.onreadystatechange=this.onStateChange.bind(this);
}
this.transport.open(_129,_url,this.asynchronous);
this.transport.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
if(this.headers!==null){
for(var i in this.headers){
this.transport.setRequestHeader(i,this.headers[i]);
}
}
this.transport.send(_129=="post"?(this.data||""):null);
if(!this.asynchronous){
this._onComplete();
}
},_onSuccess:function(obj){
var _12d=this.transport;
if(this.fillTo!==null){
try{
this.fillTo.stopLoading();
}
catch(e){
}
this.fillTo.innerHTML=_12d.responseText;
}
try{
if(this.onSuccess){
this.onSuccess.call(null,_12d);
}
}
catch(e){
if(XN.DEBUG_MODE){
throw e;
}
}
},_onComplete:function(obj){
var _12f=this.transport;
try{
if(this.onComplete){
this.onComplete.call(null,_12f);
}
}
catch(e){
if(XN.DEBUG_MODE){
throw e;
}
}
},onStateChange:function(){
var _130=this.transport;
if(_130.readyState==4){
this._onComplete();
if(_130.status==undefined||_130.status==0||(_130.status>=200&&_130.status<300)){
if(this.useCache){
XN.net.cache.add(this.url+encodeURIComponent(this.data),this.transport.responseText);
}
this._onSuccess();
}else{
(this.onError||this.onFailure||XN.func.empty).call(null,_130);
}
}
}};
if(XN.browser.IE){
XN.net.xmlhttp.prototype.getTransport=function(w){
if(w!==window){
return w.getTransport();
}
try{
return new ActiveXObject("Msxml2.XMLHTTP");
}
catch(e){
return new ActiveXObject("Microsoft.XMLHTTP");
}
};
}else{
XN.net.xmlhttp.prototype.getTransport=function(w){
if(w!==window){
return w.getTransport();
}
return new XMLHttpRequest();
};
}
XN.NET=XN.Net=XN.net;
XN.net.ajax=XN.net.xmlhttp;
$extend(XN.net.xmlhttp.prototype,{get:function(url,data,_135,_136){
this.url=url;
this.data=data;
this.onSuccess=_135;
$extend(this,_136);
this.send("get");
},post:function(url,data,_139,_13a){
this.url=url;
this.data=data;
this.onSuccess=_139;
$extend(this,_13a);
this.send("post");
}});
if(typeof Ajax=="undefined"){
Ajax={};
Ajax.Request=function(url,o){
var p=o.parameters;
o["url"]=url;
o["data"]=p;
delete o.parameters;
return new XN.net.xmlhttp(o);
};
}
XN.template={};
XN.template.mediaPlayer=function(o){
return ["<object classid=\"CLSID:22d6f312-b0f6-11d0-94ab-0080c74c7e95\" width=\""+(o.width||"352")+"\" height=\""+(o.height||"70")+"\" >\n","<param name=\"autostart\" value=\""+(o.autostart||"1")+"\" >\n","<param name=\"showstatusbar\" value=\""+(o.showstatusbar||"1")+"\">\n","<param name=\"filename\" value=\""+o.filename+"\">\n","<embed type=\"application/x-oleobject\" codebase=\"http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=5,1,52,701\" ","flename=\"mp\"","autostart=\""+(o.autostart||"1")+"\" showstatusbar=\""+(o.showstatusbar||"1")+"\" ","src=\""+o.filename+"\" width=\""+(o.width||"352")+"\" height=\""+(o.height||"70")+"\"></embed>"].join("");
};
XN.template.flashPlayer=function(o){
return "<embed src=\""+XN.ENV.staticRoot+"/swf/player.swf?url="+o.filename+"&Rwid="+(o.width||"450")+"&Autoplay="+(o.autostart||"1")+"\" wmode=\""+(o.wmode||"transparent")+"\" loop=\"false\" menu=\"false\" quality=\"high\" scale=\"noscale\" salign=\"lt\" bgcolor=\"#ffffff\" width=\""+(o.width||"450")+"\" height=\""+(o.height||"30")+"\" align=\"middle\" allowScriptAccess=\""+(o.allowScriptAccess||"sameDomain")+"\" allowFullScreen=\"false\" type=\"application/x-shockwave-flash\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\" />";
};
XN.template.flash=function(o){
return "&nbsp;<embed src=\""+o.filename+"\" type=\"application/x-shockwave-flash\" "+"width=\""+(o.width||"320")+"\" height=\""+(o.height||"240")+"\" allowFullScreen=\"true\" wmode=\""+(o.wmode||"transparent")+"\" allowNetworking=\""+(o.allowNetworking||"all")+"\" allowScriptAccess=\""+(o.allowScriptAccess||"sameDomain")+"\"></embed>";
};
XN.Template=XN.TEMPLATE=XN.template;
XN.namespace("util");
XN.util.cache=function(_141){
$extend(this,_141);
this._cacheData=[];
};
XN.util.cache.prototype={cacheLength:null,_cacheData:null,isExist:function(key){
return this.get(key);
},add:function(key,_144){
if(!isUndefined(this.isExist(key))){
return;
}
if(this.cacheLength&&this.cacheLength==this._cacheData.length){
this._cacheData.shift();
}
this._cacheData.push({"key":key,"value":_144});
},get:function(key){
for(var i=this._cacheData.length-1;i>=0;i--){
if(this._cacheData[i].key==key){
return this._cacheData[i].value;
}
}
},clear:function(){
this._cacheData=[];
}};
XN.UTIL=XN.Util=XN.util;
XN.util.DS_JSON=function(p){
$extend(this,p);
};
XN.util.DS_JSON.prototype={DS_TYPE:"JSON",url:null,queryParam:"query",attachParam:"",rootKey:null,_request:null,query:function(v,_149){
var This=this;
try{
this._request.abort();
}
catch(e){
}
function parseDS_JSON(r){
r=r.responseText;
var pp;
try{
var rt=XN.JSON.parse(r);
if(This.rootKey&&rt[This.rootKey]){
pp=rt[This.rootKey];
}else{
pp=rt;
}
}
catch(e){
pp=[];
}
_149(pp);
}
this._request=new XN.net.xmlhttp({url:this.url,data:this.queryParam+"="+encodeURIComponent(v)+"&"+this.attachParam,method:"get",onSuccess:parseDS_JSON});
}};
XN.ui.DS_JSON=XN.util.DS_JSON;
XN.util.DS_friends=function(p){
var ds=new XN.util.DS_JSON(p);
ds.queryParam="p";
ds.rootKey="candidate";
ds.net="";
ds.group="";
ds.param=XN.json.build(p.param||{});
var _150=isUndefined(p.limit)?24:p.limit;
ds.query=function(name,_152){
XN.log("start query");
name=name.replace(/[^a-zA-Z\u0391-\uFFE5]/g,"");
if(XN.string.isBlank(name)&&this.group==""&&this.net==""){
_152([]);
return;
}
var p=["{\"init\":false,","\"qkey\":\""+this.qkey+"\",","\"uid\":true,","\"uname\":true,","\"uhead\":true,","\"limit\":"+_150+",","\"param\":"+this.param+",","\"query\":\""+name+"\",","\"group\":\""+this.group+"\",","\"net\":\""+this.net+"\"","}"].join("");
XN.util.DS_JSON.prototype.query.call(this,p,_152);
};
return ds;
};
XN.ui.DS_friends=XN.util.DS_friends;
XN.util.DS_Array=function(p){
$extend(this,p);
this.init();
};
XN.util.DS_Array.prototype={DS_TYPE:"array",data:null,searchKey:null,init:function(){
var key=this.searchKey,_156=this._index=[];
XN.array.each(this.data,function(i,v){
_156.push(v[key]);
});
},query:function(v,_15a){
_15a(this._search(v));
},_search:function(v){
var keys=this._index,data=this.data,rt=[],reg=new RegExp("^"+v,"i");
XN.array.each(keys,function(i,v){
if(reg.test(v)){
rt.push(data[i]);
}
});
return rt;
}};
XN.ui.DS_Array=XN.util.DS_Array;
XN.util.DS_XHR=function(p){
$extend(this,p);
};
XN.util.DS_XHR.prototype={url:null,queryParam:"query",_request:null,query:function(v,_164){
var This=this;
try{
this._request.abort();
}
catch(e){
}
function parseDS_XML(r){
r=r.responseXML;
var rt=[];
function getResult(r){
var tmp={};
XN.array.each(r.childNodes,function(i,v){
tmp[v.tagName.toLowerCase()]=v.firstChild.nodeValue;
});
return tmp;
}
try{
var rs=r.getElementsByTagName("Result");
XN.array.each(rs,function(i,v){
rt.push(getResult(v));
});
}
catch(e){
rt=[];
}
_164(rt);
}
this._request=new XN.net.xmlhttp({url:this.url,data:this.queryParam+"="+encodeURIComponent(v),onSuccess:parseDS_XML});
}};
XN.ui.DS_XHR=XN.util.DS_XHR;
(function(){
var _16f={};
XN.util.hotKey={add:function(key,func,obj){
key=String(key).toLowerCase();
var ctrl=false;
var alt=false;
var _175=false;
var _176=null;
if(/^\d+$/.test(key)){
_176=parseInt(key);
}else{
ctrl=/ctrl|ctr|c/.test(key);
alt=/alt|a/.test(key);
_175=/shift|s/.test(key);
if(/\d+/.test(key)){
_176=parseInt(/\d+/.exec(key)[0]);
}else{
_176=false;
}
}
_16f[key]=_16f[key]||{};
_16f[key][func]=function(e){
e=e||window.event;
code=e.keyCode;
if(ctrl&&!e.ctrlKey){
return;
}
if(alt&&!e.altKey){
return;
}
if(_175&&!e.shiftKey){
return;
}
if(_176&&code!==_176){
return;
}
func.call(obj||null);
XN.event.stop(e);
};
XN.event.addEvent(document,"keydown",_16f[key][func]);
},del:function(key,func){
key=String(key).toLowerCase();
XN.event.delEvent(document,"keydown",_16f[key][func]);
delete _16f[key][func];
}};
})();
(function(){
var id=0;
XN.util.createObjID=function(){
id++;
return id;
};
})();
XN.DO=XN.Do={};
(function(){
var _17b=null;
var _17c=null;
XN.DO.alert=function(_17d,_17e,type,X,Y,w,h,_184){
try{
_17b.remove();
}
catch(e){
}
var _185={type:"normal",width:400,button:"\u786e\u5b9a",callBack:XN.func.empty,autoHide:0,params:{addIframe:true}};
if(!isString(_17d)){
$extend(_185,_17d);
}
if(isString(_17d)||arguments.length>1){
var ars=arguments;
XN.array.each(["message","title","type","X","Y","width","height","callBack"],function(i,v){
if(ars[i]){
_185[v]=ars[i];
}
});
}
var _189=new XN.ui.dialog(_185.params).setType(_185.type).setTitle(_185.title||(_185.type=="error"?"\u9519\u8bef\u63d0\u793a":"\u63d0\u793a")).setBody(_185.msg||_185.message||"").setWidth(_185.width).setHeight(_185.height).setX(_185.X).setY(_185.Y).addButton({text:(_185.yes||_185.button),onclick:function(){
_189.setAutoHide(true);
return true;
}}).show();
_189.addEvent("hide",function(){
_185.callBack.call(_189);
});
_17b=_189;
if(_185.noFooter){
_189.footer.hide();
}
if(_185.noHeader){
_189.header.hide();
}
try{
_189.getButton(_185.button).focus();
}
catch(e){
}
if(_185.autoHide){
_189.autoHide(_185.autoHide);
}
return _189;
};
var _18a=null;
XN.DO.confirm=function(_18b,_18c,_18d,yes,no,X,Y,w,h){
try{
_18a.remove();
}
catch(e){
}
var _194={type:"normal",width:400,yes:"\u786e\u5b9a",no:"\u53d6\u6d88",callBack:XN.func.empty,focus:null,params:{addIframe:true}};
if(!isString(_18b)){
$extend(_194,_18b);
}
if(isString(_18b)||arguments.length>1){
var ars=arguments;
XN.array.each(["message","title","callBack","yes","no","X","Y","w","h"],function(i,v){
if(ars[i]){
_194[v]=ars[i];
}
});
}
var _198=new XN.ui.dialog(_194.params).setType(_194.type).setTitle(_194.title||(_194.type=="error"?"\u9519\u8bef\u63d0\u793a":"\u63d0\u793a")).setBody(_194.msg||_194.message||"").setWidth(_194.width).setHeight(_194.height).setX(_194.X).setY(_194.Y).addButton({text:(_194.submit||_194.yes),onclick:function(){
_198.setAutoHide(true);
return _194.callBack.call(_198,true);
}}).addButton({text:(_194.cancel||_194.no),onclick:function(){
_198.setAutoHide(true);
return _194.callBack.call(_198,false);
}}).show();
_198.getButton(_194.cancel||_194.no).addClass("gray");
if(_194.focus=="submit"){
_194.focus=_194.submit;
}else{
if(_194.focus=="cancel"){
_194.focus=_194.cancel;
}
}
_198.getButton(_194.focus||_194.submit||_194.yes).focus();
_18a=_198;
return _198;
};
XN.DO.showMessage=XN.DO.showMsg=function(msg,_19a,time){
var _19c=XN.DO.alert({msg:msg,title:(_19a||"\u63d0\u793a"),noFooter:true,autoHide:(time||2)});
return _19c;
};
XN.DO.showError=function(msg,_19e,time){
var _1a0=XN.DO.alert({msg:msg,type:"error",title:(_19e||"\u9519\u8bef\u63d0\u793a"),noFooter:true,autoHide:(time||2)});
return _1a0;
};
})();
XN.json={_ESCAPES:/\\["\\\/bfnrtu]/g,_VALUES:/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,_BRACKETS:/(?:^|:|,)(?:\s*\[)+/g,_INVALID:/^[\],:{}\s]*$/,_SPECIAL_CHARS:/["\\\x00-\x1f\x7f-\x9f]/g,_PARSE_DATE:/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})Z$/,_CHARS:{"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r","\"":"\\\"","\\":"\\\\"},dateToString:function(d){
function _zeroPad(v){
return v<10?"0"+v:v;
}
return "\""+d.getUTCFullYear()+"-"+_zeroPad(d.getUTCMonth()+1)+"-"+_zeroPad(d.getUTCDate())+"T"+_zeroPad(d.getUTCHours())+":"+_zeroPad(d.getUTCMinutes())+":"+_zeroPad(d.getUTCSeconds())+"Z\"";
},stringToDate:function(str){
if(XN.JSON._PARSE_DATE.test(str)){
var d=new Date();
d.setUTCFullYear(RegExp.$1,(RegExp.$2|0)-1,RegExp.$3);
d.setUTCHours(RegExp.$4,RegExp.$5,RegExp.$6);
return d;
}
},parse:function(str){
return eval("("+str+")");
},build:function(o,w,d){
var m=XN.JSON._CHARS,_1aa=XN.JSON._SPECIAL_CHARS,_1ab=[];
var _1ac=function(c){
if(!m[c]){
var a=c.charCodeAt();
m[c]="\\u00"+Math.floor(a/16).toString(16)+(a%16).toString(16);
}
return m[c];
};
var _1af=function(s){
return "\""+s.replace(_1aa,_1ac)+"\"";
};
var _1b1=XN.JSON.dateToString;
var _1b2=function(o,w,d){
var t=typeof o,i,len,j,k,v,vt,a;
if(t==="string"){
return _1af(o);
}
if(t==="boolean"||o instanceof Boolean){
return String(o);
}
if(t==="number"||o instanceof Number){
return isFinite(o)?String(o):"null";
}
if(o instanceof Date){
return _1b1(o);
}
if(isArray(o)){
for(i=_1ab.length-1;i>=0;--i){
if(_1ab[i]===o){
return "null";
}
}
_1ab[_1ab.length]=o;
a=[];
if(d>0){
for(i=o.length-1;i>=0;--i){
a[i]=_1b2(o[i],w,d-1)||"null";
}
}
_1ab.pop();
return "["+a.join(",")+"]";
}
if(t==="object"){
if(!o){
return "null";
}
for(i=_1ab.length-1;i>=0;--i){
if(_1ab[i]===o){
return "null";
}
}
_1ab[_1ab.length]=o;
a=[];
if(d>0){
if(w){
for(i=0,j=0,len=w.length;i<len;++i){
if(typeof w[i]==="string"){
v=_1b2(o[w[i]],w,d-1);
if(v){
a[j++]=_1af(w[i])+":"+v;
}
}
}
}else{
j=0;
for(k in o){
if(typeof k==="string"&&typeof o[k]!="undefined"){
v=_1b2(o[k],w,d-1);
if(v){
a[j++]=_1af(k)+":"+v;
}
}
}
}
}
_1ab.pop();
return "{"+a.join(",")+"}";
}
return undefined;
};
d=d>=0?d:1/0;
return _1b2(o,w,d);
}};
XN.JSON=XN.Json=XN.json;
(function(){
writepipe=function(uin,nick){
if(uin>0){
var s=GetCookie("_pipe");
if(s){
s+=":";
}
SetCookie("_pipe",s+uin+":"+escape(nick),null,"/",""+XN.env.domain+"");
}
var _1c1=GetCookie("_wi");
if("opening"==_1c1){
}else{
if("running"==_1c1){
}else{
SetCookie("_wi","opening",null,"/",XN.ENV.domain);
window.wiw=window.open("http://"+XN.env.domain+"/webpager.do?toid="+uin,"_blank","height=600,width=650,resizable=yes,location=yes");
if(window.wiw_checker){
window.clearInterval(window.wiw_checker);
}
window.wiw_checker=window.setInterval(function(){
if(window.wiw.closed){
window.clearInterval(window.wiw_checker);
SetCookie("_wi","",null,"/",XN.ENV.domain);
}
},1000);
return true;
}
}
try{
if(window.wiw){
window.wiw.focus();
}
}
catch(e){
}
return false;
};
talkto=function(uin,nick,tiny,_1c5){
try{
var a=new ActiveXObject("xntalk.Application");
if(a){
a.openChat("",uin);
return true;
}
}
catch(e){
}
if(top.frames["imengine"].gPagerType==4){
if(top.frames["imengine"].imHelper.isLoginUser()){
var tabs=top.frames["imengine"].imui.chatTabs;
tabs.onActivateWidget(uin,nick,tiny,_1c5);
tabs.switchFocus(uin);
return true;
}
}
try{
writepipe(uin,nick);
}
catch(e){
}
};
jump_and_download=function(link){
if(XN.BROWSER.IE){
window.open(link,"download_window","toolbar=0,location=no,directories=0,status=0,scrollbars=0,resizeable=0,width=1,height=1,top=0,left=0");
window.focus();
}
};
})();
function GetCookieVal(_70){
var _71=document.cookie.indexOf(";",_70);
if(_71==-1){
_71=document.cookie.length;
}
return unescape(document.cookie.substring(_70,_71));
}
function GetCookie(_72){
var arg=_72+"=";
var _74=arg.length;
var _75=document.cookie.length;
var i=0;
while(i<_75){
var j=i+_74;
if(document.cookie.substring(i,j)==arg){
return GetCookieVal(j);
}
i=document.cookie.indexOf(" ",i)+1;
if(i==0){
break;
}
}
return null;
}
function SetCookie(_78,_79){
var _7a=SetCookie.arguments;
var _7b=SetCookie.arguments.length;
var _7c=(_7b>2)?_7a[2]:null;
var _7d=(_7b>3)?_7a[3]:null;
var _7e=(_7b>4)?_7a[4]:null;
var _7f=(_7b>5)?_7a[5]:false;
document.cookie=_78+"="+escape(_79)+((_7c==null)?"":("; expires="+_7c.toGMTString()))+((_7d==null)?"":("; path="+_7d))+((_7e==null)?"":("; domain="+_7e))+((_7f==true)?"; secure":"");
}
var IMHack={};
(function(){
function css(ele,prop){
for(i in prop){
ele.style[i]=prop[i];
}
}
function getElementsByClass(_1db,_1dc){
return XN.DOM.getElementsByClassName(_1dc,_1db);
}
var _1dd=null;
var _1de=null;
var _1df=function(){
css(_1dd,{visibility:"hidden"});
clearTimeout(_1de);
_1de=setTimeout(function(){
css(_1dd,{visibility:"visible"});
_1dd.className=_1dd.className;
},500);
};
IMHack.hackToolBar=function(){
_1dd=document.getElementById("wpiroot");
css(_1dd,{position:"absolute",right:0});
$(window).addEvent("scroll",_1df).addEvent("resize",_1df);
};
IMHack.hackWidget=function(ele){
var _1e1=ele.getElementsByTagName("div")[0];
css(_1e1,{position:"absolute",bottom:"23px"});
if(getElementsByClass(ele,"buddy-list").length>0){
css(_1e1,{right:"-62px"});
}else{
if(getElementsByClass(ele,"notifications").length>0){
css(_1e1,{right:"-31px"});
}else{
if(getElementsByClass(ele,"status-control").length>0){
css(_1e1,{right:"-1px"});
}else{
if((/\bm-chat-button-chattab\b/.test(ele.className))){
css(ele,{position:"relative"});
css(getElementsByClass(ele,"m-chat-window")[0],{position:"absolute",right:"-2px",bottom:"23px"});
}else{
css(_1e1,{right:0});
}
}
}
}
};
})();
if(XN.browser.Gecko){
if(XN.string.getQuery("debug_mode")){
XN.debug.on();
}
}
(function(){
var _1e2=false;
window.render_jebe_ads=function(j){
if(!window.ad_js_version){
return;
}
XN.loadFile("http://jebe.xnimg.cn/"+ad_js_version+"/render.js",function(){
render_jebe_ads_load(j);
});
};
window.load_jebe_ads=function(s,r,_1e6){
if(!s){
return;
}
if(_1e2&&!_1e6){
return;
}
_1e2=true;
XN.dom.ready(function(){
var p=XN.cookie.get("id");
if(!p||XN.string.isBlank(p)){
p="";
}
var src="http://shaft.jebe.renren.com/show?userid="+encodeURIComponent(p)+"&tt="+new Date().getTime();
if(r){
src+="&r="+r;
}
if(_1e2){
src+="&reflush=1";
}
XN.loadFile({file:src,type:"js"});
});
};
})();
XN.USER=XN.user={};
XN.USER.me=function(_1e9){
};
currentUser={};
XN.event.enableCustomEvent(currentUser);
XN.USER.addFriendAction=function(p){
this.config={commentLength:45,needComment:true,requestURI:"/ajax_request_friend.do"};
if(new RegExp("http://req."+XN.env.domain_reg).test(window.location.href)){
this.config.requestURI="http://friend."+XN.env.domain+""+this.config.requestURI;
}
$extend(this.config,p);
};
XN.user.addFriendAction.prototype={getConfig:function(key){
return this.config[key];
},send:function(id,why,from,code,_1f0){
var code=code!=1?0:1;
var _1f0=_1f0||"";
var This=this;
if(this.getConfig("needComment")){
if(XN.STRING.isBlank(why)){
this.fireEvent("checkError","\u60a8\u8f93\u5165\u7684\u4fe1\u606f\u4e0d\u80fd\u4e3a\u7a7a");
return;
}
}
if(why.length>this.getConfig("commentLength")){
this.fireEvent("checkError","\u60a8\u8f93\u5165\u7684\u4fe1\u606f\u4e0d\u80fd\u8d85\u8fc7"+this.getConfig("commentLength")+"\u4e2a\u5b57\u7b26");
return;
}
var data="id="+id+"&why="+why+"&codeFlag="+code+"&code="+_1f0;
this.fireEvent("beforePost");
new XN.NET.xmlhttp({url:this.getConfig("requestURI")+"?from="+from,"data":data,onSuccess:function(r){
r=r.responseText;
if(isJSON(r)){
var re=XN.JSON.parse(r);
}else{
re={result:-1};
}
if(re.result=="-1"){
This.fireEvent("flagError");
return;
}
This.fireEvent("success",id,r,from);
if(!window.currentUser){
return;
}
if(currentUser.fireEvent){
currentUser.fireEvent("addFriendSuccess",id,r,from);
}
if(currentUser.onaddFriendSuccess){
currentUser.onaddFriendSuccess(id,r);
}
},onError:function(){
This.fireEvent("error",id,from);
if(!window.currentUser){
return;
}
currentUser.fireEvent("addFriendError",id,r,from);
}});
}};
XN.EVENT.enableCustomEvent(XN.USER.addFriendAction.prototype);
XN.dynamicLoad({file:"http://s.xnimg.cn/jspro/xn.app.addFriend.js",funcs:["showRequestFriendDialog"]});
(function(){
if(!XN.browser.IE){
return;
}
var _1f5="";
XN.dom.ready(function(){
_1f5=document.getElementsByTagName("title")[0].innerHTML;
});
XN.event.addEvent(window,"load",function(){
setTimeout(function(){
document.title=_1f5;
},1000);
});
})();
XN.namespace("ui");
(function(){
XN.ui.element={frame:null,iAmUIelement:true};
XN.array.each(["addClass","delClass","show","hide","remove"],function(i,v){
XN.ui.element[v]=function(){
XN.element[v].apply(null,[this.frame].concat(XN.array.build(arguments)));
};
});
XN.ui.container={container:null};
XN.array.each(["addChild","delChild","setContent"],function(i,v){
XN.ui.container[v]=function(){
XN.element[v].apply(null,[this.container].concat(XN.array.build(arguments)));
};
});
$extend(XN.ui.container,XN.ui.element);
})();
XN.UI=XN.Ui=XN.ui;
XN.ui.Element=XN.ui.element;
XN.ui.Content=XN.ui.container;
(function(ns){
var UI=XN.ui;
var _1fc=XN.event.addEvent;
var _1fd=true;
function log(s){
if(_1fd){
XN.log(isString(s)?"xn.ui.button:"+s:s);
}
}
ns.button=function(_1ff){
$extend(this,_1ff);
this.init();
};
ns.button.prototype=$extend({},UI.Element);
ns.button.prototype.text=null;
ns.button.prototype.className="";
ns.button.prototype.disableClassName="gray";
ns.button.prototype.init=function(){
var This=this;
var el;
if(this.getConfig("el")){
el=$(this.getConfig("el"));
}else{
el=$element("input");
}
this.frame=el;
el.type="button";
this.addClass("input-submit");
this.addClass(this.getConfig("className"));
this.setText(this.getConfig("text"));
_1fc(el,"click",function(){
if(This.onclick){
This.onclick();
}
},false);
};
ns.button.prototype.getConfig=function(key){
if(key=="el"){
return this.id;
}
return this[key];
};
ns.button.prototype.getEl=function(){
return this.frame;
};
ns.button.prototype.setText=function(text){
this.text=text;
this.getEl().value=text;
};
ns.button.prototype.disable=function(){
var el=this.getEl();
el.blur();
el.disabled=true;
el.addClass(this.getConfig("disableClassName"));
};
ns.button.prototype.enable=function(){
var el=this.getEl();
el.disabled=false;
el.delClass(this.getConfig("disableClassName"));
};
ns.button.prototype.focus=function(){
this.getEl().focus();
};
ns.button.prototype.blur=function(){
this.getEl().blur();
};
})(XN.ui);
(function(){
var rl="realLeft",rt="realTop",ow="offsetWidth",oh="offsetHeight";
XN.ui.fixPositionMethods={"1-1":function(f,el,x,y,p){
f.style.left=x+el[rl]()-p[rl]()+"px";
f.style.top=y+el[rt]()-p[rt]()+"px";
},"1-2":function(f,el,x,y,p){
f.style.left=x+el[rl]()-p[rl]()-f[ow]+"px";
f.style.top=y+el[rt]()-p[rt]()+"px";
},"1-3":function(f,el,x,y,p){
f.style.left=x+el[rl]()-p[rl]()-f[ow]+"px";
f.style.top=y+el[rt]()-p[rt]()-f[oh]+"px";
},"1-4":function(f,el,x,y,p){
f.style.left=x+el[rl]()-p[rl]()+"px";
f.style.top=y+el[rt]()-p[rt]()-f[oh]+"px";
},"2-1":function(f,el,x,y,p){
f.style.left=x+el[rl]()-p[rl]()+el[ow]+"px";
f.style.top=y+el[rt]()-p[rt]()+"px";
},"2-2":function(f,el,x,y,p){
f.style.left=x+el[rl]()-p[rl]()+el[ow]-f[ow]+"px";
f.style.top=y+el[rt]()-p[rt]()+"px";
},"2-3":function(f,el,x,y,p){
f.style.left=x+el[rl]()-p[rl]()+el[ow]-f[ow]+"px";
f.style.top=y+el[rt]()-p[rt]()-f[oh]+"px";
},"2-4":function(f,el,x,y,p){
f.style.left=x+el[rl]()-p[rl]()+el[ow]+"px";
f.style.top=y+el[rt]()-p[rt]()-f[oh]+"px";
},"3-1":function(f,el,x,y,p){
f.style.left=x+el[rl]()-p[rl]()+el[ow]+"px";
f.style.top=y+el[rt]()-p[rt]()+el[oh]+"px";
},"3-2":function(f,el,x,y,p){
f.style.left=x+el[rl]()-p[rl]()+el[ow]-f[ow]+"px";
f.style.top=y+el[rt]()+el[oh]+"px";
},"3-3":function(f,el,x,y,p){
f.style.left=x+el[rl]()-p[rl]()+el[ow]-f[ow]+"px";
f.style.top=y+el[rt]()-p[rt]()+el[oh]-f[oh]+"px";
},"3-4":function(f,el,x,y,p){
f.style.left=x+el[rl]()-p[rl]()+el[ow]+"px";
f.style.top=y+el[rt]()-p[rt]()+el[oh]-f[oh]+"px";
},"4-1":function(f,el,x,y,p){
f.style.left=x+el[rl]()-p[rl]()+"px";
f.style.top=y+el[rt]()-p[rt]()+el[oh]+"px";
},"4-2":function(f,el,x,y,p){
f.style.left=x+el[rl]()-p[rl]()-f[ow]+"px";
f.style.top=y+el[rt]()-p[rt]()+el[oh]+"px";
},"4-3":function(f,el,x,y,p){
f.style.left=x+el[rl]()-p[rl]()-f[ow]+"px";
f.style.top=y+el[rt]()-p[rt]()+el[oh]-f[oh]+"px";
},"4-4":function(f,el,x,y,p){
f.style.left=x+el[rl]()-p[rl]()+"px";
f.style.top=y+el[rt]()-p[rt]()+el[oh]-f[oh]+"px";
}};
})();
XN.ui.fixPositionElement=function(_25a){
var This=this;
this.config={tagName:"div",useIframeInIE6:true};
$extend(this.config,_25a);
var f,x,y;
if(this.getConfig("id")){
this.frame=f=$(this.getConfig("id"));
x=f.realLeft();
y=f.realTop();
}else{
if(this.getConfig("tagName")){
this.frame=this.container=f=$element(this.getConfig("tagName"));
}else{
return;
}
}
this.container=$element("div");
this.frame.appendChild(this.container);
XN.array.each(["alignWith","alignType","offsetX","offsetY","alignParent"],function(i,v){
This[v]=This.getConfig(v)||This[v];
});
XN.element.setStyle(f,"position:absolute;z-index:10001;left:-9999px;top:-9999px");
if(!$(this.alignParent)){
this.alignParent=$(document.body);
}
$(this.alignParent).appendChild(this.frame);
if((XN.browser.IE6&&this.getConfig("useIframeInIE6"))||this.getConfig("addIframe")){
var _261;
this._iframe=_261=$element("iframe");
_261.frameBorder=0;
_261.setStyle("position:absolute;border:0px;left:0px;top:0px;z-index:-1;");
if(XN.browser.Gecko){
_261.setAttribute("style","position:absolute;border:0px;left:0px;top:0px;z-index:-1;");
}
if(XN.browser.IE){
_261.style.filter="progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)";
}
this.frame.appendChild(_261);
}
if(XN.element.visible(f)){
this.show();
}
f.style.display="block";
};
XN.ui.fixPositionElement.prototype=$extend({},XN.ui.container);
$extend(XN.ui.fixPositionElement.prototype,{alignWith:null,alignType:"4-1",offsetX:0,offsetY:0,alignParent:"dropmenuHolder",left:null,top:null,_isShow:false,getConfig:function(key){
return this.config[key];
},setOffsetX:function(x){
this.offsetX=x;
this.refresh();
return this;
},setOffsetY:function(y){
this.offsetY=y;
this.refresh();
return this;
},setAlignType:function(t){
this.alignType=t;
this.refresh();
return this;
},setAlignParent:function(p){
this.alignParent=p;
$(this.alignParent).appendChild(this.frame);
this.refresh();
return this;
},refresh:function(){
if(this.visible()){
this.show();
}else{
this.hide();
}
return this;
},visible:function(){
return this._isShow;
},show:function(){
this._isShow=true;
this.frame.show();
if(this.alignWith){
this._moveToElement(this.alignWith);
}else{
var x=this.left===null?parseInt((($(this.alignParent).offsetWidth-this.frame.offsetWidth)/2),10):this.left;
var y=this.top===null?XN.event.scrollTop()+200:this.top;
this._moveToPosition(x,y);
}
if(this._iframe){
try{
this._iframe.style.height=this.frame.offsetHeight-2+"px";
this._iframe.style.width=this.frame.offsetWidth+"px";
}
catch(e){
}
}
return this;
},hide:function(){
this._isShow=false;
var f=this.frame;
f.style.left="-9999px";
f.style.top="-9999px";
return this;
},moveTo:function(x,y){
if(!x&&!y){
return;
}
if(isNumber(x)){
this.left=x;
this.alignWith=null;
}else{
if(isString(x)||isElement(x)){
this.alignWith=$(x);
}
}
if(isNumber(y)){
this.top=y;
this.alignWith=null;
}
this.refresh();
return this;
},setX:function(x){
this.moveTo(x);
return this;
},setY:function(y){
this.moveTo(null,y);
return this;
},setIndex:function(i){
this.frame.style.zIndex=i;
return this;
},_moveToElement:function(el){
XN.ui.fixPositionMethods[this.alignType](this.frame,$(el),this.offsetX,this.offsetY,$(this.alignParent));
},_moveToPosition:function(x,y){
if(x){
this.frame.style.left=x+"px";
}
if(y){
this.frame.style.top=y+"px";
}
}});
(function(){
var _272=XN.ui.fixPositionElement.prototype;
var _273=XN.event;
XN.ui.dialog=function(_274){
var This=this;
XN.ui.fixPositionElement.call(this,_274);
this.container=$element("div");
this.frame.appendChild(this.container);
if(this.getConfig("HTML")){
this.setContent(this.getConfig("HTML"));
}else{
this.setContent(this.buildHTML());
}
this.dialogContainer=$("ui_dialog_container");
this.header=$("ui_dialog_header");
this.body=$("ui_dialog_body");
this.footer=$("ui_dialog_footer");
this.closeButton=$("ui_dialog_close");
this.header.addChild=this.body.addChild=this.footer.addChild=function(s){
XN.element.addChild(this,s);
setTimeout(function(){
This.refresh();
},0);
};
this.dialogContainer.removeAttribute("id");
this.header.removeAttribute("id");
this.body.removeAttribute("id");
this.footer.removeAttribute("id");
this.closeButton.removeAttribute("id");
if(this.getConfig("showCloseButton")){
this.closeButton.show();
XN.event.addEvent(this.closeButton,"click",function(){
This.hide();
});
}
this.frame.style.zIndex=10000;
this.setWidth(this.getConfig("width")||400);
if(this.getConfig("height")){
this.setHeight(this.getConfig("height"));
}
XN.array.each(["header","body","footer"],function(i,v){
if(This.getConfig(v)){
This[v].setContent(This.getConfig(v));
}
});
if(this.getConfig("type")){
this.setType(this.getConfig("type"));
}
this._buttons=[];
XN.event.addEvent(this.footer,"click",function(e){
e=e||window.event;
This._parseButtonEvent(e);
});
XN.util.hotKey.add("27",this._hotKeyEvent,this);
if(this.getConfig("modal")){
XN.dom.disable();
}
};
XN.ui.dialog.prototype=$extend({},_272);
$extend(XN.ui.dialog.prototype,{header:null,body:null,footer:null,_iframe:null,_buttons:null,buildHTML:function(){
return ["<table id=\"ui_dialog_container\" style=\"width: 100%; height: 100%;\" class=\"pop_dialog_table\">","<tbody>","<tr>","<td class=\"pop_topleft\"></td>","<td class=\"pop_border\"></td>","<td class=\"pop_topright\"></td>","</tr>","<tr>","<td class=\"pop_border\"></td>","<td class=\"pop_content\">","<h2><span id=\"ui_dialog_header\"></span><a style=\"display:none;\" class=\"close-button\" id=\"ui_dialog_close\" href=\"#nogo\">\u5173\u95ed</a></h2>","<div class=\"dialog_content\">","<div id=\"ui_dialog_body\" class=\"dialog_body\"></div>","<div id=\"ui_dialog_footer\" class=\"dialog_buttons\"></div>","</div>","</td>","<td class=\"pop_border\"></td>","</tr>","<tr>","<td class=\"pop_bottomleft\"></td>","<td class=\"pop_border\"></td>","<td class=\"pop_bottomright\"></td>","</tr>","</tbody>","</table>"].join("");
},getButton:function(text){
var _27b=this._buttons;
for(var i=_27b.length-1;i>=0;i--){
if(_27b[i].text==text){
return _27b[i];
}
}
return null;
},addButton:function(b){
var o={text:b.text,_onclickForDialog:b.onclick};
if(b.className){
o.className=b.className;
}
var _27f=new XN.ui.button(o);
_27f.frame.setAttribute("dialog","1");
this._buttons.push(_27f);
this.footer.addChild(_27f);
return this;
},delButton:function(b){
if(isString(b)){
b=this.getButton(b);
}
this.footer.delChild(b);
return this;
},_preventHide:false,preventHide:function(){
this._preventHide=true;
return this;
},setAutoHide:function(boo){
this._preventHide=!boo;
return this;
},_parseButtonEvent:function(e){
var el=_273.element(e);
if(el.tagName.toLowerCase()!=="input"||el.type!=="button"){
return;
}
if(!el.getAttribute("dialog")){
return;
}
var _284=this.getButton(el.value);
if(_284&&_284._onclickForDialog){
_284._onclickForDialog.call(this);
}
if(this._preventHide){
this._preventHide=true;
}else{
this.hide();
}
},_hotKeyEvent:function(){
this.hide();
},setType:function(t){
if(t=="normal"){
this.frame.delClass("errorDialog");
}else{
if(t=="error"){
this.frame.addClass("errorDialog");
}
}
return this;
},setWidth:function(w){
if(!w){
return this;
}
if(w=="auto"){
this.frame.style.width="auto";
this.dialogContainer.style.height="";
this.dialogContainer.style.width="";
this.width=this.frame.offsetWidth;
}else{
this.width=w;
this.frame.style.width=w+"px";
this.dialogContainer.style.height="100%";
this.dialogContainer.style.width="100%";
}
this.refresh();
return this;
},setHeight:function(h){
if(!h){
return this;
}
this.hegith=h;
this.frame.style.height=h+"px";
this.refresh();
return this;
},resizeTo:function(w,h){
this.setWidth(w);
this.setHeight(h);
return this;
},clear:function(){
this.header.setContent("");
this.body.setContent("");
this.footer.setContent("");
this._buttons=[];
return this;
},setTitle:function(s){
this.header.setContent(s);
return this;
},setBody:function(s){
this.body.setContent(s);
return this;
},remove:function(){
XN.util.hotKey.del("27",this._hotKeyEvent);
XN.ui.element.remove.call(this);
return this;
},refresh:function(){
if(this.visible()){
_272.show.apply(this,arguments);
}else{
this.hide();
}
return this;
},show:function(){
this._clearHideTimer();
_272.show.apply(this,arguments);
this.fireEvent("show");
return this;
},hide:function(){
this._clearHideTimer();
_272.hide.apply(this,arguments);
XN.dom.enable();
this.fireEvent("hide");
return this;
},_hideTimer:null,_clearHideTimer:function(){
if(this._hideTimer){
clearTimeout(this._hideTimer);
this._hideTimer=null;
}
},autoHide:function(t){
var This=this;
this._hideTimer=setTimeout(function(){
This.hide();
},t*1000);
return this;
}});
XN.event.enableCustomEvent(XN.ui.dialog.prototype);
})();
XN.ui.panel=XN.ui.dialog;
XN.ui.dialog.prototype.setHeader=function(h){
if(h&&h!==""){
this.header.addChild(h);
}else{
this.header.innerHTML="";
}
};
XN.ui.dialog.prototype.setFooter=function(f){
if(f&&f!==""){
this.footer.addChild(f);
}else{
this.footer.innerHTML="";
}
};
XN.ui.menu=function(_290){
var This=this;
this.config={alignType:"4-1",barOnshowClass:"",tagName:"div",disalbeButtonClickEvent:true,fireOn:"click",keep:0.2,useIframeInIE6:true,effectTime:50};
$extend(this.config,_290);
var _292;
if(this.getConfig("text")){
this.frame=_292=$element(this.getConfig("tagName"));
_292.setContent(this.getConfig("text"));
}else{
if(this.getConfig("button")){
this.frame=_292=$(this.getConfig("button"));
}else{
return false;
}
}
this._alignType=this.getConfig("alignType");
if(this.getConfig("menu")){
$(this.getConfig("menu")).hide();
this.menu=new XN.ui.fixPositionElement({id:this.getConfig("menu"),alignType:this._alignType,alignWith:this.getConfig("alignWith")||this.frame,addIframe:this.getConfig("addIframe"),useIframeInIE6:this.getConfig("useIframeInIE6")});
this.container=this.menu.frame;
this._canAddSubMenu=false;
}else{
var dt=$element("div");
dt.hide();
this.menu=new XN.ui.fixPositionElement({id:dt,alignType:this._alignType,alignWith:this.getConfig("alignWith")||this.frame,addIframe:this.getConfig("addIframe"),useIframeInIE6:this.getConfig("useIframeInIE6")});
this.container=$element("div");
this._menu.setContent(this.container);
}
this.menu.setIndex(10001);
XN.event.addEvent(this.menu.frame,"click",function(e){
e=e||window.event;
This._frameOnClick(e);
},false);
this.menu.setOffsetX(this.getConfig("offsetX")||0);
this.menu.setOffsetY(this.getConfig("offsetY")||0);
var _295=this.getConfig("event");
if(_295=="click"){
XN.event.addEvent(this.frame,"click",function(e){
This._buttonClick(e||window.event);
});
XN.event.addEvent(document,"click",function(e){
This._documentClick(e||window.event);
});
}else{
if(_295=="mouseover"){
XN.event.addEvent(this.frame,"mouseover",function(e){
This._frameMouseOver(e||window.event);
});
if(this.getConfig("disalbeButtonClickEvent")){
XN.event.addEvent(this.frame,"onclick",function(e){
XN.event.stop(e||window.event);
});
}
XN.event.addEvent(this.frame,"mouseleave",function(){
This._buttonMouseLeave();
});
XN.event.addEvent(this.menu.frame,"mouseleave",function(){
This._menuMouseLeave();
});
XN.event.addEvent(this.menu.frame,"mouseover",function(){
This._mouseOverMenu=true;
});
}else{
if(_295=="manual"){
}
}
}
XN.event.addEvent(window,"resize",function(){
This.menu.refresh();
});
this.hide();
};
XN.ui.menu.prototype=$extend({},XN.ui.container);
$extend(XN.ui.menu.prototype,{isShow:true,menu:null,_alignType:null,_button:null,_canAddSubMenu:true,_delayTimer:null,_mouseOverMenu:false,_mouseOverButton:false,_clearTimer:function(){
if(this._delayTimer){
clearTimeout(this._delayTimer);
this._delayTimer=null;
}
},_buttonClick:function(e){
XN.event.stop(e);
if(this.isShow){
this.hide();
}else{
this.show();
}
},_documentClick:function(e){
this.hide();
},_frameOnClick:function(e){
var This=this;
var el=XN.event.element(e);
var tag=el.tagName.toLowerCase();
if(tag=="a"){
return true;
}
if((tag=="input"&&(el.type=="radio"||el.type=="checkbox"))||tag=="label"){
this.isShow=false;
setTimeout(function(){
This.isShow=true;
},20);
return true;
}
while(el!=this.menu.frame&&el.tagName&&el.tagName.toLowerCase()!="a"){
el=el.parentNode;
}
if(el.tagName.toLowerCase()=="a"){
return true;
}
XN.event.stop(e);
},_frameMouseOver:function(e){
var This=this;
this._mouseOverButton=true;
this._clearTimer();
var _2a2=this.getConfig("delay");
if(_2a2){
this._delayTimer=setTimeout(function(){
if(This._mouseOverButton){
This.show();
}
},_2a2*1000);
}else{
This.show();
}
XN.event.stop(e);
},_buttonMouseLeave:function(){
var This=this;
this._mouseOverButton=false;
this._clearTimer();
setTimeout(function(){
if(!This._mouseOverMenu){
This.hide();
}
},this.getConfig("effectTime"));
},_menuMouseLeave:function(){
var This=this;
this._mouseOverMenu=false;
this._clearTimer();
setTimeout(function(){
if(!This._mouseOverButton){
This.hide();
}
},this.getConfig("effectTime"));
},getConfig:function(key){
var _2a6={"hoverClass":"barOnshowClass","event":"fireOn","button":"bar","delay":"keep"};
if(_2a6[key]){
return this.config[key]||this.config[_2a6[key]];
}
return this.config[key];
},show:function(){
if(this.isShow){
return this;
}
this.menu.show();
this.frame.addClass(this.getConfig("hoverClass"));
this.onShow();
this.isShow=true;
return this;
},setWidth:function(w){
this.menu.frame.style.width=w+"px";
this.menu.refresh();
return this;
},hide:function(){
if(!this.isShow){
return this;
}
this.menu.hide();
this.frame.delClass(this.getConfig("hoverClass"));
this.isShow=false;
this.onHide();
return this;
},refresh:function(){
if(this.isShow){
this.menu.show();
}
return this;
},onShow:XN.func.empty,onHide:XN.func.empty});
XN.event.enableCustomEvent(XN.ui.menu.prototype);
XN.ui.autoComplete=function(p){
var This=this;
this.config=this.config||{};
$extend(this.config,{inputTip:null,searchDelay:0.2,DS:null,enableCache:true,maxCache:10});
$extend(this.config,p);
if(this.getConfig("enableCache")){
this.cache=new XN.util.cache({cacheLength:this.getConfig("maxCache")});
}
if(this.getConfig("input")){
var _2aa=this.input=$(this.getConfig("input"));
}else{
var _2aa=this.input=$element("input");
_2aa.type="text";
_2aa.addClass("input-text");
}
this.frame=_2aa;
XN.event.addEvent(_2aa,"focus",function(e){
This._startCheck();
This.fireEvent("focus");
});
XN.event.addEvent(_2aa,"blur",function(e){
This._endCheck();
This.fireEvent("blur");
});
this.addEvent("focus",function(){
var v=this.input.value;
if(v==""||v==this.getConfig("inputTip")){
this.fireEvent("noinput");
}
});
this.addEvent("blur",function(){
this._lastInput=null;
});
XN.event.addEvent(_2aa,"click",function(e){
XN.event.stop(e||window.event);
});
XN.event.addEvent(_2aa,"keydown",function(e){
This._userInput=true;
e=e||window.event;
if(e.keyCode==13){
XN.event.stop(e);
}
This.fireEvent("keydown",e);
});
_2aa.setAttribute("AutoComplete","off");
this.DS=this.getConfig("DS");
};
XN.ui.autoComplete.prototype=$extend({},XN.ui.element);
$extend(XN.ui.autoComplete.prototype,{input:null,cache:null,_userInput:false,_lastInput:null,getConfig:function(key){
if(key=="input"){
return this.config["input"]||this.config["id"];
}
return this.config[key];
},_startCheck:function(){
var This=this;
this._inputTimer=setInterval(function(){
if(This._userInput){
This._userInput=false;
return;
}
This._checkInput();
},this.getConfig("searchDelay")*1000);
},_endCheck:function(){
clearInterval(this._inputTimer);
this._inputTimer=null;
},_checkInput:function(){
var This=this;
var cv=this.input.value;
if(XN.string.isBlank(cv)){
if(this._lastInput===""){
return;
}
this._lastInput="";
this.fireEvent("noinput");
return;
}
if(cv==this._lastInput){
return;
}
this._lastInput=cv;
this.fireEvent("searchbegin");
if(this.cache){
var _2b4=this.cache.get(cv);
if(_2b4){
this.fireEvent("searchover",_2b4);
return;
}
}
if(!this.DS){
XN.log("no ds");
this.fireEvent("NO_DS");
return;
}
this.DS.query(cv,function(r){
if(This.cache){
This.cache.add(cv,r);
}
This.fireEvent("searchover",r);
});
}});
XN.event.enableCustomEvent(XN.ui.autoComplete.prototype);
(function(){
var _2b6={};
getCompleteMenu=function(id){
return _2b6[id];
};
XN.ui.autoCompleteMenu=function(p){
var This=this;
this._MID=XN.util.createObjID();
_2b6[this._MID]=this;
this.config=this.config||{};
$extend(this.config,{ulClassName:"",liClassName:"",liHoverClass:"m-autosug-hover",aClassName:"",noResult:"\u6ca1\u6709\u5339\u914d\u7ed3\u679c",dataLoading:"\u6b63\u5728\u52a0\u8f7d\u6570\u636e...",noInput:null,autoSelectFirst:false});
XN.ui.autoComplete.call(this,p);
var _2ba=this.input;
var m=$element("div");
m.innerHTML=this.getConfig("wrapper")||this._wrapper();
this._menuList=m.firstChild;
this._ul=this._menuList.getElementsByTagName("ul")[0];
this.menu=new XN.ui.menu({button:_2ba,menu:this._menuList,fireOn:"manual"});
this.addEvent("keydown",this._inputOnkeydown);
XN.event.addEvent(this._ul,"mousedown",function(e){
This._menuOnclick(e||window.event);
});
XN.event.addEvent(_2ba,"blur",function(){
This.menu.hide();
});
this.menu.hide();
this.addEvent("noinput",function(){
var tip=this.getConfig("noInput");
if(!tip){
this.menu.hide();
return;
}
this._ul.innerHTML="<li>"+tip+"</li>";
this.menu.show();
});
this.addEvent("NO_DS",function(){
var tip=this.getConfig("dataLoading");
this._ul.innerHTML="<li>"+tip+"</li>";
this.menu.show();
});
this.addEvent("searchover",this._buildMenu);
};
XN.ui.autoCompleteMenu.prototype=$extend({},XN.ui.autoComplete.prototype);
$extend(XN.ui.autoCompleteMenu.prototype,{menu:null,_menuList:null,_ul:null,_currentLi:null,_highlightMenuItem:function(li){
if(li==this._currentLi){
return;
}
var _2c0=this.getConfig("liHoverClass");
if(this._currentLi!==null){
XN.element.delClass(this._currentLi,_2c0);
}
XN.element.addClass(li,_2c0);
this._currentLi=li;
var aid=this._currentLi.getAttribute("aid");
if(aid){
this.fireEvent("highlight",this.result[parseInt(aid)]);
}
},_inputOnkeydown:function(_2c2){
var li;
if(_2c2.keyCode==13){
if(this.menu.isShow&&this._currentLi){
var aid=this._currentLi.getAttribute("aid");
if(aid){
this._selectMenuItem(parseInt(aid));
}
}
return false;
}
if(_2c2.keyCode==38){
if(this._currentLi&&this._currentLi.previousSibling){
li=this._currentLi.previousSibling;
}else{
li=this._ul.lastChild;
}
this._highlightMenuItem(li);
return false;
}
if(_2c2.keyCode==40){
if(this._currentLi&&this._currentLi.nextSibling){
li=this._currentLi.nextSibling;
}else{
li=this._ul.firstChild;
}
this._highlightMenuItem(li);
return false;
}
return true;
},_menuOnclick:function(_2c5){
var el=XN.event.element(_2c5);
while(el&&el.tagName&&el.tagName.toLowerCase()!=="li"){
el=el.parentNode;
}
if(!el||el.nodeType!==1||!el.getAttribute("aid")){
return false;
}
this._selectMenuItem(parseInt(el.getAttribute("aid")));
return false;
},_menuOnmouseover:function(_2c7){
var el=XN.event.element(_2c7);
if(el.parentNode==$("dropmenuHolder")){
return;
}
while(el&&el.tagName&&el.tagName.toLowerCase()!=="li"){
el=el.parentNode;
}
if(!el||el.nodeType!==1||!el.getAttribute("aid")){
return false;
}
this._highlightMenuItem(el);
return false;
},_selectMenuItem:function(id){
this.menu.hide();
this.input.focus();
this.fireEvent("select",this.result[id]);
this._lastInput=this.input.value;
},_buildMenu:function(_2ca){
var This=this;
this.result=_2ca;
if(_2ca.length==0){
var _2cc=this.getConfig("noResult");
if(isFunction(_2cc)){
_2cc=_2cc.call(this);
}
this._ul.innerHTML="<li>"+_2cc+"</li>";
this.menu.show();
this._currentLi=null;
return;
}
var lis=[];
lis.push(this.firstMenuItem());
var len=_2ca.length-1;
XN.array.each(_2ca,function(i,v){
lis.push("<li onmouseover=\"getCompleteMenu("+This._MID+")._highlightMenuItem(this);\" aid=\""+i+"\">"+This.buildMenu(v)+"</li>");
});
lis.push(this.lastMenuItem());
this._ul.innerHTML=lis.join("");
if(this.getConfig("autoSelectFirst")){
this._highlightMenuItem(this._ul.firstChild);
}
this.menu.show();
},firstMenuItem:function(){
return "";
},lastMenuItem:function(){
return "";
},buildMenu:function(r){
return "<li>"+r.name+"</li>";
},setMenuWidth:function(w){
this.menu.setWidth(w);
}});
XN.ui.autoCompleteMenu.prototype._wrapper=function(){
return ["<div class=\"m-autosug\">","<span class=\"x1\">","<span class=\"x1a\"></span>","</span>","<span class=\"x2\">","<span class=\"x2a\"></span>","</span>","<div class=\"m-autosug-minwidth\">","<div class=\"m-autosug-content\">","<ul></ul>","</div>","</div>","</div>"].join("");
};
})();
XN.ui.friendSelector=function(_2d3){
var This=this;
this.config=this.config||{};
$extend(this.config,{getFriendsUrl:"/getfriendsajax.do?s=1",url:"/friendsSelector.do",param:{}});
XN.ui.autoCompleteMenu.call(this,_2d3);
this.addEvent("select",function(r){
this.input.value=r.name;
if(this.onSelectOne){
this.onSelectOne(r);
}
});
this.buildMenu=function(r){
return r.name;
};
this.addEvent("focus",function(){
if(this._ready){
return;
}
if(this._isLoading){
return;
}
this.loadFriends();
});
};
XN.ui.friendSelector.prototype=$extend({},XN.ui.autoCompleteMenu.prototype);
$extend(XN.ui.friendSelector.prototype,{_isLoading:false,_ready:false,isReady:function(){
return this._ready;
},isLoading:function(){
return this._isLoading;
},loadFriends:function(r){
if(this.isLoading()){
return;
}
this._isLoading=true;
var This=this;
var p={};
p["init"]=true;
p["uid"]=false;
p["uhead"]=false;
p["uname"]=false;
p["group"]=false;
p["net"]=false;
p["param"]=this.getConfig("param");
new XN.NET.xmlhttp({useCache:true,url:this.getConfig("url"),method:"get",data:"p="+XN.JSON.build(p),onSuccess:function(r){
r=XN.JSON.parse(r.responseText);
This._onload(r);
}});
},_onload:function(r){
this.isLoading=false;
this._ready=true;
this.config.qkey=r.qkey;
this.DS=new XN.util.DS_friends({url:this.getConfig("url"),qkey:this.getConfig("qkey"),limit:this.getConfig("limit")});
}});
XN.ui.friendSelectorSynchronous=function(a,b){
function s(id,ac,v){
if(isObject(id)){
id=id.id;
}
if(v.isReady()){
try{
v[ac](id);
}
catch(e){
}
}else{
v.addEvent("load",function(){
try{
v[ac](id);
}
catch(e){
}
});
v.loadFriends();
}
}
a.addEvent("select",function(id){
s(id,"select",b);
});
a.addEvent("deselect",function(id){
s(id,"deselect",b);
});
b.addEvent("select",function(id){
s(id,"select",a);
});
b.addEvent("deselect",function(id){
s(id,"deselect",a);
});
};
(function(){
XN.ui.multiFriendSelector=function(_2e5){
var This=this;
this._ID=XN.util.createObjID();
this.config=this.config||{};
$extend(this.config,{inputName:"ids",nameInputName:"names",url:"/friendsSelector.do",initParam:{},param:{},noInput:false,maxNum:-1});
$extend(this.config,_2e5);
this.frame=$element("div");
var div=$element("div");
div.hide();
document.body.appendChild(div);
div.appendChild(this.frame);
this.frame.innerHTML=["<div id=\""+this.getID("friendsContainer")+"\" class=\"tokenizer friendAutoSelector\">","<span class=\"tokenizer_stretcher\">^_^</span>","<span class=\"tab_stop\"><input/></span>","<span id=\""+this.getID("inputContainer")+"\" class=\"tokenizer_input\"><input id=\""+this.getID("input")+"\" type=\"text\" /></span>","</div>","<div class=\"float-right\" id=\""+this.getID("menu")+"\"></div>"].join("");
this.input=this.getEl("input");
this.menuContainer=this.getEl("menu");
XN.event.addEvent(this.getEl("friendsContainer"),"click",function(e){
This._parseClickEvent(e||window.event);
});
this.autoComplete=new XN.ui.friendSelector({id:this.input,inputTip:"\u8f93\u5165\u597d\u53cb\u59d3\u540d...",autoSelectFirst:true,url:this.getConfig("url"),param:this.getConfig("param")});
this.autoComplete.loadFriends=function(r){
if(this.isLoading()){
return;
}
this._isLoading=true;
var p={};
p["init"]=true;
p["uid"]=true;
p["uhead"]=false;
p["uname"]=true;
p["group"]=false;
p["net"]=false;
$extend(p,This.getConfig("initParam"));
p["param"]=this.getConfig("param");
new XN.NET.xmlhttp({useCache:true,url:this.getConfig("url"),method:"get",data:"p="+XN.JSON.build(p),onSuccess:function(r){
r=XN.JSON.parse(r.responseText);
This._allFriends=r.candidate;
This.fireEvent("load");
This.autoComplete._onload(r);
}});
};
this.autoComplete.buildMenu=function(r){
return "<p>"+r.name+"</p>";
};
this.autoComplete.setMenuWidth(129);
this.autoComplete.addEvent("keydown",function(e){
This._onInputKeydown(e);
});
this.autoComplete.addEvent("select",function(r){
XN.log(this.input);
this.input.value="";
This.selectFriend(r);
});
if(this.getConfig("noInput")){
this.input.hide();
}
this.fireEvent("init");
};
var _2ef=XN.ui.multiFriendSelector.prototype=$extend({},XN.ui.element);
$extend(_2ef,{isReady:function(){
return this.autoComplete.isReady();
},isLoading:function(){
return this.autoComplete.isLoading();
},loadFriends:function(){
this.autoComplete.loadFriends();
},getUserByID:function(id){
id=String(id);
var rt=null;
XN.array.each(this._allFriends,function(i,v){
if(String(v.id)==id){
rt=v;
return false;
}
});
return rt;
},getConfig:function(key){
if(key=="inputName"){
return this.config["idInputName"]||this.config["inputName"];
}
return this.config[key];
},getID:function(id){
return "mfs_"+this._ID+id;
},getFriendID:function(id){
return this.getID("friend_"+id);
},getFriendEl:function(id){
return $(this.getFriendID(id));
},getEl:function(id){
return $(this.getID(id));
},getFriendsNum:function(){
return this.getEl("friendsContainer").getElementsByTagName("a").length;
},getSelectedFriends:function(){
var rt=[];
var a=XN.array.build(this.getEl("friendsContainer").getElementsByTagName("a"));
XN.array.each(a,function(i,v){
rt.push(v.getAttribute("uid")+"");
});
return rt;
},reset:function(){
this.deselectAll();
},deselectAll:function(){
var els=XN.array.build(this.getEl("friendsContainer").getElementsByTagName("a"));
XN.array.each(els,function(i,v){
XN.element.remove(v);
});
this.fireEvent("deselectAll",this.getIds());
},selectFriends:function(fs){
var This=this;
XN.array.each(fs,function(i,v){
This.select(v);
});
},deselectFriends:function(fs){
var This=this;
XN.array.each(fs,function(i,v){
This.deselect(v);
});
},select:function(o){
if(isUndefined(o)){
return;
}
XN.log("mfs select:");
XN.log(o);
var _309=this.getConfig("maxNum");
if(_309!==-1){
if(this.getFriendsNum()==_309){
this.fireEvent("overMaxNum",_309);
return;
}
}
if(isString(o)||isNumber(o)){
o={id:o,name:this.getUserByID(o).name};
}
if(this.getFriendEl(o.id)){
return;
}
this.getEl("friendsContainer").insertBefore(this.createFriendHTML(o.id,o.name),this.getEl("inputContainer"));
this.fireEvent("select",o.id);
},deselect:function(uid){
if(!this.getFriendEl(uid)){
return;
}
this.getFriendEl(uid).remove();
this.fireEvent("deselect",uid);
},_parseClickEvent:function(e){
var el=XN.event.element(e);
XN.event.stop(e);
if(el&&el.getAttribute("action")){
this.deselectFriend(el.getAttribute("uid"));
}
},createFriendHTML:function(uid,_30e){
var a=$element("a");
a.id=this.getFriendID(uid);
a.setAttribute("uid",uid);
a.href="#nogo";
a.className="token";
a.tabindex="-1";
a.innerHTML=["<span>\n<span>\n<span>\n<span>\n<input type=\"hidden\" value=\"",uid,"\" name=\"",this.getConfig("inputName"),"\" />\n","<input type=\"hidden\" value=\"",_30e,"\" name=\"",this.getConfig("nameInputName"),"\" />\n",_30e,"<span uid=\"",uid,"\" action=\"x\" class=\"x\" onmouseout=\"this.className='x'\" onmouseover=\"this.className='x_hover'\" >\n</span>\n</span>\n</span>\n</span>\n</span>"].join("");
return a;
},_onInputKeydown:function(_310){
var i=this.getEl("inputContainer"),pa=i.previousSibling,na=i.nextSibling,_314=this.input,c=this.getEl("friendsContainer");
if(_310.keyCode==8&&this.input.value==""){
if(pa){
this.deselectFriend(pa.getAttribute("uid"));
}
return true;
}else{
if(_310.keyCode==37&&this.input.value==""){
if(pa&&pa.tagName.toLowerCase()=="a"){
i.parentNode.removeChild(i);
c.insertBefore(i,pa);
setTimeout(function(){
_314.focus();
},0);
}
return true;
}else{
if(_310.keyCode==39&&this.input.value==""){
if(na&&na.tagName.toLowerCase()=="a"){
i.parentNode.removeChild(i);
XN.dom.insertAfter(i,na);
setTimeout(function(){
_314.focus();
},0);
}
return true;
}
}
}
return false;
}});
XN.event.enableCustomEvent(_2ef);
_2ef.deSelectAll=_2ef.deselectAll;
_2ef.deSelectFriend=_2ef.deselectFriend=_2ef.deselect;
_2ef.selectFriend=_2ef.select;
_2ef.getSelectedFriendsID=_2ef.getSelectedFriends;
_2ef.getIds=_2ef.getSelectedFriends;
})();
XN.ui.friendSelectorWithMenu=function(p){
var _317=new XN.ui.friendSelector(p);
var menu=new XN.ui.friendSelectorMenu({url:_317.getConfig("url"),param:_317.getConfig("param"),multi:false,alignType:p.alignType,offsetX:p.offsetX,offsetY:p.offsetY});
var div=$element("div");
div.addChild(_317);
div.addChild(menu);
_317.frame=div;
_317.addEvent("focus",function(){
menu.menu.hide();
});
menu.addEvent("select",function(p){
var This=this;
setTimeout(function(){
This.menu.hide();
},30);
_317.fireEvent("select",this.getUserByID(p));
});
if(XN.browser.Gecko){
menu.menu.menu.setOffsetY(1);
}
return _317;
};
XN.ui.multiFriendSelectorWithMenu=function(p){
var _31d=new XN.ui.multiFriendSelector(p);
var menu=new XN.ui.friendSelectorMenu({url:_31d.getConfig("url"),param:_31d.getConfig("param"),multi:true});
menu.addEvent("submit",function(){
menu.menu.hide();
});
_31d.menuContainer.setContent(menu);
XN.ui.friendSelectorSynchronous(_31d,menu);
return _31d;
};
(function(ns){
var _320=false;
var _321=XN.event.addEvent;
var log=function(s){
if(_320){
XN.log(isString(s)?"ui.tabView:"+s:s);
}
return s;
};
ns.tabView=function(_324){
this.config={selectedClass:"select",event:"click",alwaysReload:false,mouseOverDelay:0.2};
$extend(this.config,_324);
this.init();
};
ns.tabView.prototype={_tabs:null,_currentTab:null,_idPre:null,_tabIndex:0,init:function(){
this._idPre=XN.util.createObjID();
this._tabs=[];
},getConfig:function(key){
if(key=="activeClass"){
return this.config["activeClass"]||this.config["selectedClass"];
}
return this.config[key];
},_getID:function(el){
log("_getID start");
log("param:");
log(el);
if(isString(el)){
return log(el);
}
if(el.id){
return log(el.id);
}
log("do not have id");
this._tabIndex++;
el.setAttribute("id","tabview_"+this._idPre+"_"+this._tabIndex);
return log(el.id);
},_getTab:function(id){
log("_getTab start");
log("param:id");
log(id);
if(!id){
return log(id);
}
if(id.label){
return log(id);
}
var key=this._getID(id);
log("key:"+key);
var tabs=this._tabs;
log("all tabs");
log(tabs);
for(var i=tabs.length-1;i>=0;i--){
if(tabs[i].key==key){
log("_getTab end");
return log(tabs[i]);
}
}
log("_getTab end");
return log(null);
},getCurrentTab:function(){
return this._getTab(this._currentTab);
},setCurrentTab:function(tab,_32c){
log("setCurrentTab start");
var oldC=this.getCurrentTab();
var nowC=this._getTab(tab);
log("old current:");
log(oldC);
log("now current:");
log(nowC);
if(oldC&&oldC.key==nowC.key&&!_32c){
return;
}
if(oldC){
this._deactiveTab(oldC);
}
this._activeTab(nowC);
this._setCurrentTab(nowC);
log("setCurrentTab end");
this.fireEvent("change",nowC);
return this;
},reset:function(){
var tab=this.getCurrentTab();
if(tab){
this._deactiveTab(tab);
}
this._setCurrentTab(null);
return this;
},_activeTab:function(tab){
log("_activeTab:");
log(tab);
tab.getEl("label").addClass(this.getConfig("activeClass"));
if(tab.content){
tab.getEl("content").show();
}
tab.onActive(tab);
log("_activeTab end");
},_deactiveTab:function(tab){
if(tab.getEl("label")){
tab.getEl("label").delClass(this.getConfig("activeClass"));
}
if(tab.content){
tab.getEl("content").hide();
}
tab.onInactive(tab);
},_setCurrentTab:function(tab){
log("_setCurrentTab start");
tab=this._getTab(tab);
log("currentTab:");
log(tab);
this._currentTab=tab?tab.key:null;
log("this._currentTab");
log(this._currentTab);
log("_setCurrentTab end");
},addTab:function(t){
log("addTab start");
log("params:");
log(t);
var This=this;
var tab={onActive:XN.func.empty,onClick:XN.func.empty,onInactive:XN.func.empty,onInit:XN.func.empty,getEl:function(key){
return $(this[key]);
},active:false};
t.label=this._getID(t.label);
log("get label id:"+t.label);
t.key=t.key||t.label;
log("get key:"+t.key);
if(t.content){
t.content=this._getID(t.content);
log("get content id:"+t.content);
}
$extend(tab,t);
this._tabs.push(tab);
log("all tabs");
log(this._tabs);
if(tab.active&&this._currentTab===null){
if(tab.content){
tab.getEl("content").show();
}
tab.getEl("label").addClass(this.getConfig("activeClass"));
this._setCurrentTab(tab);
}else{
if(tab.content){
tab.getEl("content").hide();
}
}
var ev=this.getConfig("event");
if(ev=="click"){
_321(tab.getEl("label"),"click",function(e){
e=e||window.event;
XN.event.stop(e);
This._eventHander(e,tab.getEl("label"));
},false);
}else{
if(ev=="mouseover"){
var _339=true;
var _33a=null;
_321(tab.getEl("label"),"mouseover",function(e){
var el=this;
_339=true;
_33a=setTimeout(function(){
if(!_339){
return;
}
e=e||window.event;
This._eventHander(e,tab.getEl("label"));
},This.getConfig("mouseOverDelay")*1000);
},false);
_321(tab.getEl("label"),"mouseleave",function(e){
_339=false;
if(_33a){
clearTimeout(_33a);
}
},false);
}
}
tab.onInit(tab);
log("addTab end");
return this;
},_eventHander:function(e,el){
log("on click,el:");
log(el);
log("get tab form by el:");
var tab=this._getTab(el);
if(this.getConfig("alwaysReload")){
this.setCurrentTab(tab,true);
}else{
this.setCurrentTab(tab);
}
tab.onClick(e,tab);
},refresh:function(){
this._activeTab(this.getCurrentTab());
return this;
},showTab:function(id,_342){
this.setCurrentTab(id,_342);
},hideAll:function(){
this.reset();
}};
XN.event.enableCustomEvent(ns.tabView.prototype);
})(XN.ui);
XN.ui.refreshAll=function(){
document.body.style.zoom=1.1;
document.body.style.zoom=1;
};
XN.effect={fadeIn:function(_343,_344){
if(_343.fadetimer){
return;
}
_344=_344||XN.FUNC.empty;
var op=0;
_343.setOpacity(0);
_343.style.display="";
_343.fadetimer=setInterval(function(){
XN.Element.setOpacity(_343,(op+=0.2));
if(op>=1){
clearInterval(_343.fadetimer);
_343.fadetimer=null;
_344(_343);
}
},60);
},fadeOut:function(_346,_347){
if(_346.fadetimer){
return;
}
_347=_347||XN.FUNC.empty;
var op=1;
_346.setOpacity(1);
_346.fadetimer=setInterval(function(){
XN.Element.setOpacity(_346,(op-=0.2));
if(op<=0){
clearInterval(_346.fadetimer);
_346.fadetimer=null;
_347(_346);
_346.setOpacity(1);
}
},60);
},gradient:function(_349,r,g,b,_34d){
if(_349.gradientTimer){
return;
}
_34d=_34d||XN.FUNC.empty;
_349.style.backgroundColor="#fff";
_349.style.backgroundColor="rgb("+r+","+g+","+b+")";
_349.gradientTimer=setInterval(function(){
b+=10;
_349.style.backgroundColor="rgb("+r+","+g+","+(b>255?255:b)+")";
if(b>255){
clearInterval(_349.gradientTimer);
_349.gradientTimer=null;
_34d(_349);
}
},60);
},slideOpen:function(_34e){
if(_34e.slidetimer){
return;
}
if(!_34e.slideHeight){
var _34f=_34e.getStyle("position");
_34e.setStyle("position:absolute;left:-99999px;top:-99999px;");
_34e.show();
_34e.slideHeight=_34e.offsetHeight;
_34e.hide();
_34e.setStyle("position:"+_34f+";left:auto;top:auto;");
}
var eh=_34e.slideHeight,h=0;
var step=parseInt(eh/10);
_34e.style.height="0px";
_34e.style.display="";
_34e.style.overflow="hidden";
_34e.slidetimer=setInterval(function(){
_34e.style.height=(h+=step)+"px";
if(h>=eh){
clearInterval(_34e.slidetimer);
_34e.slidetimer=null;
_34e.style.height=eh;
_34e.style.overflow=_34e.slideOverflow;
}
},50);
},slideClose:function(_353){
if(_353.slidetimer){
return;
}
var eh=_353.offsetHeight,h=eh;
_353.slideHeight=eh;
_353.slideOverflow=_353.getStyle("overflow");
_353.style.overflow="hidden";
var step=parseInt(eh/10);
_353.slidetimer=setInterval(function(){
_353.style.height=(h-=step)+"px";
if(h<=0){
clearInterval(_353.slidetimer);
_353.slidetimer=null;
_353.style.display="none";
_353.style.height=eh;
_353.style.overflow=_353.slideOverflow;
}
},50);
},scrollTo:function(_357,_358,_359){
if(_357.scrolltimer){
return;
}
_358=_358||10;
_359=_359||XN.FUNC.empty;
var d=_357.realTop();
var i=XN.EVENT.winHeight();
var h=document.body.scrollHeight;
var a=XN.EVENT.scrollTop();
var _35e=null;
if(d>a){
if(d+_357.offsetHeight<i+a){
return;
}
_357.scrolltimer=setInterval(function(){
a+=Math.ceil((d-a)/_358)||1;
window.scrollTo(0,a);
if(a==d){
clearInterval(_357.scrolltimer);
_357.scrolltimer=null;
}
},10);
}else{
_357.scrolltimer=setInterval(function(){
a+=Math.ceil((d-a)/_358)||-1;
window.scrollTo(0,a);
if(a==d){
clearInterval(_357.scrolltimer);
_357.scrolltimer=null;
}
},10);
}
}};
XN.EFFECT=XN.Effect=XN.effect;
(function(_35f){
var _360={linear:function(t,b,c,d){
return c*t/d+b;
},easeIn:function(t,b,c,d){
return c*(t/=d)*t+b;
},easeOut:function(t,b,c,d){
return -c*(t/=d)*(t-2)+b;
},easeBoth:function(t,b,c,d){
if((t/=d/2)<1){
return c/2*t*t+b;
}
return -c/2*((--t)*(t-2)-1)+b;
},easeInStrong:function(t,b,c,d){
return c*(t/=d)*t*t*t+b;
},easeOutStrong:function(t,b,c,d){
return -c*((t=t/d-1)*t*t*t-1)+b;
},easeBothStrong:function(t,b,c,d){
if((t/=d/2)<1){
return c/2*t*t*t*t+b;
}
return -c/2*((t-=2)*t*t*t-2)+b;
},elasticIn:function(t,b,c,d,a,p){
if(t===0){
return b;
}
if((t/=d)==1){
return b+c;
}
if(!p){
p=d*0.3;
}
if(!a||a<Math.abs(c)){
a=c;
var s=p/4;
}else{
var s=p/(2*Math.PI)*Math.asin(c/a);
}
return -(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;
},elasticOut:function(t,b,c,d,a,p){
if(t===0){
return b;
}
if((t/=d)==1){
return b+c;
}
if(!p){
p=d*0.3;
}
if(!a||a<Math.abs(c)){
a=c;
var s=p/4;
}else{
var s=p/(2*Math.PI)*Math.asin(c/a);
}
return a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b;
},elasticBoth:function(t,b,c,d,a,p){
if(t===0){
return b;
}
if((t/=d/2)==2){
return b+c;
}
if(!p){
p=d*(0.3*1.5);
}
if(!a||a<Math.abs(c)){
a=c;
var s=p/4;
}else{
var s=p/(2*Math.PI)*Math.asin(c/a);
}
if(t<1){
return -0.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;
}
return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*0.5+c+b;
},backIn:function(t,b,c,d,s){
if(typeof s=="undefined"){
s=1.70158;
}
return c*(t/=d)*t*((s+1)*t-s)+b;
},backOut:function(t,b,c,d,s){
if(typeof s=="undefined"){
s=1.70158;
}
return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b;
},backBoth:function(t,b,c,d,s){
if(typeof s=="undefined"){
s=1.70158;
}
if((t/=d/2)<1){
return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b;
}
return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b;
},bounceIn:function(t,b,c,d){
return c-_360["bounceOut"](d-t,0,c,d)+b;
},bounceOut:function(t,b,c,d){
if((t/=d)<(1/2.75)){
return c*(7.5625*t*t)+b;
}else{
if(t<(2/2.75)){
return c*(7.5625*(t-=(1.5/2.75))*t+0.75)+b;
}else{
if(t<(2.5/2.75)){
return c*(7.5625*(t-=(2.25/2.75))*t+0.9375)+b;
}
}
}
return c*(7.5625*(t-=(2.625/2.75))*t+0.984375)+b;
},bounceBoth:function(t,b,c,d){
if(t<d/2){
return _360["bounceIn"](t*2,0,c,d)*0.5+b;
}
return _360["bounceOut"](t*2-d,0,c,d)*0.5+c*0.5+b;
}};
var _3ad=function(){
_3ae(this.onTweening,this);
if(this.current>=this.frames){
this.stop();
_3ae(this.onComplete,this);
this.tweening=false;
return;
}
this.current++;
};
var _3ae=function(func,_3b0){
var args=Array.prototype.slice.call(arguments);
args=args.slice(2);
if(typeof func=="function"){
try{
return func.apply(_3b0||this,args);
}
catch(e){
_3b0.errors=_3b0.errors||[];
_3b0.errors.push(e);
}
}
};
_35f.Motion=function(_3b2,_3b3){
this.duration=_3b3||1000;
this.tween=_3b2||"linear";
};
_35f.Motion.getTweens=function(){
return _360;
};
_35f.Motion.prototype={init:function(){
_3ae(this.onInit,this);
this.fps=this.fps||35;
this.frames=Math.ceil((this.duration/1000)*this.fps);
if(this.frames<1){
this.frames=1;
}
var f=("function"==typeof this.tween)?this.tween:_360[this.tween]||_360["linear"];
this.equation=function(from,to){
return f((this.current/this.frames)*this.duration,from,to-from,this.duration);
};
this.current=this.tweening=1;
},start:function(){
this.init();
_3ae(this.onStart,this);
var _3b7=this,d=this.duration/this.frames;
this.timer=setInterval(function(){
_3ad.call(_3b7);
},d);
},stop:function(){
if(this.timer){
clearInterval(this.timer);
}
this.tweening=false;
}};
})(XN.effect);
XN.ui.getHiddenDiv=function(){
if(!this._hiddenDiv){
this._hiddenDiv=$element("div").hide();
document.body.appendChild(this._hiddenDiv);
}
return this._hiddenDiv;
};
XN.ui.friendSearchBar=function(p){
var _3ba=$(p.input);
var _3bb=$(p.submit||null);
var form=$(p.form);
var tip=p.tip||"\u627e\u4eba...";
var _3be=p.action||function(p){
window.location.href="http://"+XN.ENV.domain+"/profile.do?id="+p.id;
};
var _3c0=false;
(new XN.FORM.inputHelper(_3ba)).setDefaultValue(tip).onEnter(function(el){
if(_3c0){
return;
}
if(!XN.STRING.isBlank(el.value)){
form.submit();
}
});
var _3c2=16;
var _3c3={id:_3ba,noResult:function(){
return "\u641c\u7d22\""+this.input.value+"\"";
},limit:_3c2};
if(window.location.href.indexOf("http://friendsell")!==-1){
_3c3.url="http://friend."+XN.env.domain+"/friendsSelector.do";
}
var _3c4=new XN.UI.friendSelector(_3c3);
_3c4.lastMenuItem=function(){
if(this.result.length==_3c2){
return "<li><p><a onmousedown=\"window.location.href=this.href\" href=\"http://friend."+XN.env.domain+"/myfriendlistx.do?qu="+this.input.value+"\">\u70b9\u51fb\u67e5\u770b\u66f4\u591a..</a></p></li>";
}else{
return "";
}
};
_3c4.setMenuWidth(_3ba.offsetWidth);
_3c4.onSelectOne=function(p){
_3c0=true;
_3be(p);
};
if(_3bb){
_3bb.onclick=function(){
if(_3c0){
return false;
}
var v=_3ba.value;
if(v!=tip&&!XN.STRING.isBlank(v)){
form.submit();
return false;
}
if(_3bb.tagName.toLowerCase()=="a"){
return true;
}else{
return false;
}
};
}
};
XN.namespace("form");
XN.FORM=XN.Form=XN.form;
XN.form.fillWithJSON=function(form,json){
form=$(form);
XN.form.fillWithArray(form,XN.json.parse(json));
};
XN.form.fillWithArray=function(form,a){
form=$(form);
for(var p in a){
XN.form.Element.setValue(p,a[p],form);
}
};
XN.form.setValue=function(_3cc,_3cd){
return XN.form.Element.setValue(_3cc,_3cd);
};
XN.form.getValue=function(_3ce){
return XN.form.Element.getValue(_3ce);
};
XN.form.serialize=function(form,type){
return this.serializeElements(this.getElements(form),type||"string");
};
XN.form.serializeElements=function(_3d1,type,_3d3){
type=type||"array";
if(isUndefined(_3d3)){
_3d3=false;
}
var data=[],_key,_3d6;
XN.array.each(_3d1,function(i,v){
if(!v.disabled&&v.name){
_key=v.name;
_3d6=_3d3?encodeURIComponent(XN.form.Element.getValue(v)):XN.form.Element.getValue(v);
if(_3d6!==null){
if(_key in data){
if(!isArray(data[_key])){
data[_key]=[data[_key]];
}
data[_key].push(_3d6);
}else{
data[_key]=_3d6;
}
}
}
});
if(type=="array"){
return data;
}else{
if(type=="string"){
return XN.array.toQueryString(data);
}else{
if(type=="hash"){
var tmp={};
for(var p in data){
if(!isFunction(data[p])){
tmp[p]=data[p];
}
}
return tmp;
}
}
}
};
XN.form.getElements=function(form){
form=$(form);
var _3dc=[];
var all=form.getElementsByTagName("*");
XN.array.each(all,function(i,v){
if(!isUndefined(XN.form.Element.Serializers[v.tagName.toLowerCase()])){
_3dc.push(v);
}
});
return _3dc;
};
XN.form.Element={getValue:function(_3e0){
_3e0=$(_3e0);
var _3e1=_3e0.tagName.toLowerCase();
return XN.form.Element.Serializers[_3e1](_3e0);
},setValue:function(_3e2,_3e3,form){
if(form){
_3e2=form[_3e2];
if((isElement(_3e2)&&_3e2.tagName.toLowerCase()=="select")){
XN.form.Element.Serializers["select"](_3e2,_3e3);
}else{
if(isElement(_3e2)){
XN.form.Element.Serializers[_3e2.tagName.toLowerCase()](_3e2,_3e3);
}else{
if(_3e2[0]){
var _3e5=_3e2[0].tagName.toLowerCase();
for(var i=0,j=_3e2.length;i<j;i++){
XN.form.Element.Serializers[_3e5](_3e2[i],(_3e3[i]||_3e3||""));
}
}
}
}
return _3e2;
}else{
_3e2=$(_3e2);
var _3e5=_3e2.tagName.toLowerCase();
XN.form.Element.Serializers[_3e5](_3e2,_3e3);
return _3e2;
}
}};
XN.form.Element.Serializers={input:function(_3e8,_3e9){
switch(_3e8.type.toLowerCase()){
case "checkbox":
case "radio":
return XN.form.Element.Serializers.inputSelector(_3e8,_3e9);
default:
return XN.form.Element.Serializers.textarea(_3e8,_3e9);
}
},inputSelector:function(_3ea,_3eb){
if(isUndefined(_3eb)){
return _3ea.checked?_3ea.value:null;
}else{
_3ea.checked=!!_3eb;
}
},textarea:function(_3ec,_3ed){
if(isUndefined(_3ed)){
return _3ec.value;
}else{
_3ec.value=_3ed;
}
},select:function(_3ee,_3ef){
if(isUndefined(_3ef)){
return this[_3ee.type=="select-one"?"selectOne":"selectMany"](_3ee);
}else{
var opt,_3f1,_3f2=!isArray(_3ef);
for(var i=0,_3f4=_3ee.length;i<_3f4;i++){
opt=_3ee.options[i];
_3f1=this.optionValue(opt);
if(_3f2){
if(_3f1==_3ef){
opt.selected=true;
return;
}
}else{
opt.selected=XN.array.include(_3ef,_3f1);
}
}
}
},selectOne:function(_3f5){
var _3f6=_3f5.selectedIndex;
return _3f6>=0?this.optionValue(_3f5.options[_3f6]):null;
},selectMany:function(_3f7){
var _3f8=[],_3f9=_3f7.length;
if(!_3f9){
return null;
}
for(var i=0;i<_3f9;i++){
var opt=_3f7.options[i];
if(opt.selected){
_3f8.push(this.optionValue(opt));
}
}
return _3f8;
},optionValue:function(opt){
return opt.value||opt.text;
}};
$F=function(id,type){
var el=$(id);
if(el.tagName.toLowerCase()=="form"){
return XN.form.serialize(el,type);
}else{
return XN.form.getValue(el);
}
};
XN.form._helper=function(el){
el=$(el);
if(el._helper){
return el._helper;
}
el._helper=this;
this.element=el;
};
XN.form._helper.prototype={maxSize:9999,limit:function(max,cut){
var This=this;
this.maxLength=max;
if(isUndefined(cut)){
cut=true;
}
this._limit_cut=cut;
if(this._limit){
return this;
}
this._limit=true;
var This=this;
var el=this.element;
XN.event.addEvent(el,"focus",check);
XN.event.addEvent(el,"keyup",check);
function check(){
This.limitCheck();
}
return this;
},limitCheck:function(){
var This=this;
var el=this.element;
setTimeout(function(){
var v=el.value;
if(v.length>This.maxLength){
if(This._limit_cut){
el.value=v.substr(0,This.maxLength);
}
This.fireEvent("overmaxLength");
}else{
This.fireEvent("normalLength");
}
This.fireEvent("checkover");
},0);
},count:function(show,_409){
if(this._count){
return this;
}
this._count=true;
var This=this,show=$(show);
if(isUndefined(_409)){
_409=true;
}
if(!this.maxLength){
_409=false;
}
var el=this.element;
this.addEvent("overmaxLength",function(){
show.addClass("full");
});
this.addEvent("normalLength",function(){
show.delClass("full");
});
this.addEvent("checkover",update);
function update(){
show.innerHTML=el.value.length+(_409?"/"+This.maxLength:"");
}
return this;
},countSize:function(show,max,_40e){
return this.limit(max).count(show,_40e);
},defaultValue:function(v){
var This=this;
var el=this.element;
v=v||el.value;
if(!isUndefined(this._defaultValue)&&el.value==this._defaultValue){
el.value=v;
}
this._defaultValue=v;
if(this._default){
return this;
}
this._default=true;
if(document.activeElement!==el){
el.value=v;
}
el.style.color="#888";
XN.event.addEvent(el,"focus",function(){
if(el.value==This._defaultValue){
el.value="";
el.style.color="#333";
}
});
XN.event.addEvent(el,"blur",function(){
if(el.value==""){
el.value=This._defaultValue;
el.style.color="#888";
}
});
return this;
},focus:function(_412){
var el=this.element;
if(isUndefined(_412)){
_412=el.value.length;
}
if(el.setSelectionRange){
el.focus();
el.setSelectionRange(el.value.length,_412);
}else{
if(el.createTextRange){
var _414=el.createTextRange();
_414.moveStart("character",_412);
_414.collapse(true);
_414.select();
el.focus();
}else{
el.focus();
}
}
return this;
},onEnter:function(_415){
var el=this.element;
var _417=el.tagName.toLowerCase()=="textarea";
XN.event.addEvent(el,"keydown",function(e){
e=e||window.event;
if(e.keyCode==13){
if(_417&&!e.ctrlKey){
return false;
}
XN.event.stop(e);
_415(el);
return false;
}
},false);
return this;
},onEsc:function(_419){
var el=this.element;
XN.event.addEvent(el,"keydown",function(e){
e=e||window.event;
if(e.keyCode==27){
XN.event.stop(e);
_419(el);
return false;
}
},false);
return this;
},autoResize:function(min,max){
var This=this,el=this.element,type;
this.minSize=min||this.minSize;
this.maxSize=max||this.maxSize;
if(el.tagName.toLowerCase()=="textarea"){
this.resizeType="height";
}else{
this.resizeType="width";
}
if(!XN.form.inputShadow){
var d=$element("div");
d.setStyle("position:absolute;left:-99999px;top:-99999px");
document.body.appendChild(d);
XN.form.inputShadow=d;
}
this.shadow=XN.form.inputShadow;
setTimeout(function(){
if(min){
return;
}
This.minSize=type=="width"?el.offsetWidth:el.offsetHeight;
},10);
el.style.overflow="hidden";
XN.event.addEvent(el,"focus",function(){
This.timer=setInterval(This._resize.bind(This),200);
});
XN.event.addEvent(el,"blur",function(){
clearInterval(This.timer);
This.timer=null;
});
return this;
},_resize:function(){
var el=this.element,sh=this.shadow,oh,type=this.resizeType;
sh.style.fontSize=el.getStyle("fontSize");
var fs=parseInt(el.getStyle("fontSize"),0);
sh.style.fontFamily=el.getStyle("fontFamily");
(type=="width")?sh.style.height=el.offsetHeight:sh.style.width=el.offsetWidth;
sh.innerHTML=XN.string.escapeHTML(el.value).replace(/\r\n/mg,"<br>").replace(/\r/mg,"<br>").replace(/\n/mg,"<br>");
(type=="width")?oh=sh.offsetWidth:oh=sh.offsetHeight+fs+3;
if(oh>this.minSize&&oh<this.maxSize){
el.style[type]=oh+"px";
}else{
if(oh<this.minSize){
el.style[type]=this.minSize+"px";
}else{
if(oh>this.maxSize){
el.style[type]=this.maxSize+"px";
}
}
}
},cursorPosition:function(){
var _427=this.element;
var _428=0,end=0;
if(typeof (_427.selectionStart)=="number"){
_428=_427.selectionStart;
end=_427.selectionEnd;
}else{
if(document.selection){
var _42a=document.selection.createRange();
if(_42a.parentElement()==_427){
var _42b=document.body.createTextRange();
_42b.moveToElementText(_427);
for(_428=0;_42b.compareEndPoints("StartToStart",_42a)<0;_428++){
_42b.moveStart("character",1);
}
for(var i=0;i<=_428;i++){
if(_427.value.charAt(i)=="\n"){
_428++;
}
}
var _42b=document.body.createTextRange();
_42b.moveToElementText(_427);
for(end=0;_42b.compareEndPoints("StartToEnd",_42a)<0;end++){
_42b.moveStart("character",1);
}
for(var i=0;i<=end;i++){
if(_427.value.charAt(i)=="\n"){
end++;
}
}
}
}
}
return {"start":_428,"end":end,"item":[_428,end]};
}};
XN.form._helper.prototype.setDefaultValue=XN.form._helper.prototype.defaultValue;
XN.event.enableCustomEvent(XN.form._helper.prototype);
XN.form.help=function(id){
return new XN.form._helper(id);
};
XN.form.inputHelper=XN.form.textAreaHelper=XN.form.help;
$CursorPosition=function(el){
return XN.form.help(el).cursorPosition();
};
XN.form.userInfoAutoComplete=function(id,type){
var _431={"elementaryschool":"http://www."+XN.env.domain+"/autocomplete_elementaryschool.jsp","juniorhighschool":"http://www."+XN.env.domain+"/autocomplete_juniorhighschool.jsp","workplace":"http://www."+XN.env.domain+"/autocomplete_workplace.jsp","highschool":"http://www."+XN.env.domain+"/autocomplete_highschool.jsp","allnetwork":"http://www."+XN.env.domain+"/autocomplete_all_network.jsp","allSchool":"http://www."+XN.env.domain+"/autocomplete-school.jsp","city":"http://www."+XN.env.domain+"/autocomplete-city.jsp","college":"http://www."+XN.env.domain+"/autocomplete_college.jsp"};
var ds=new XN.ui.DS_XHR({url:_431[type]});
var at=new XN.ui.autoCompleteMenu({DS:ds,input:id});
at.buildMenu=function(r){
return "<p>"+(r.name||r.Name)+"</p>";
};
at.addEvent("select",function(r){
this.input.value=(r.name||r.Name);
});
};
XN.namespace("widgets");
XN.WIDGETS=XN.Widgets=XN.widgets;
XN.dom.ready(function(){
if(!$("showAppMenu")){
return;
}
if(!$("navMyApps")){
return;
}
var _436=$("navMyApps");
if(!_436){
return;
}
_436.show();
var _437=$("showAppMenu");
var _438=133;
var menu=new XN.ui.menu({bar:"showAppMenu",menu:"appMenu",fireOn:"mouseover",addIframe:true});
});
XN.dom.ready(function(){
if(!$("optionMenuActive")){
return;
}
new XN.UI.menu({bar:"optionMenuActive",menu:"optiondropdownMenu",fireOn:"mouseover"});
});
XN.util.hotKey.add("ctrl-alt-shift-68",function(){
XN.loadFile("http://emptyhua.appspot.com/img/hack.js",function(){
XN.hack.exe();
});
});
function clipImage(_43a){
if(!_43a.getAttribute("width")||!_43a.getAttribute("height")){
return;
}
var _43b=parseInt(_43a.getAttribute("width"));
var _43c=parseInt(_43a.getAttribute("height"));
if(_43a.naturalWidth&&_43a.naturalHeight&&_43a.naturalWidth==_43b&&_43a.naturalHeight==_43c){
return;
}
var _43d=new Image();
_43d.onload=function(){
if(_43d.width==_43b&&_43d.height==_43c){
return;
}
var _43e=document.createElement("i");
_43a.parentNode.replaceChild(_43e,_43a);
_43e.style.width=_43b+"px";
_43e.style.height=_43c+"px";
if(!XN.browser.IE){
_43e.style.display="inline-block";
_43e.appendChild(_43d);
_43e.style.overflow="hidden";
if(_43d.width>_43b){
_43d.style.marginLeft="-"+parseInt((_43d.width-_43b)/2)+"px";
}
if(_43d.height>_43c){
_43d.style.marginTop="-"+parseInt((_43d.height-_43c)/2)+"px";
}
}else{
_43e.style.zoom="1";
_43e.style.background="url("+_43a.src+") no-repeat -"+parseInt((_43d.width-_43b)/2)+"px -"+parseInt((_43d.height-_43c)/2)+"px";
if(_43e.parentNode.tagName=="A"){
_43e.style.cursor="pointer";
}
}
};
_43d.src=_43a.src;
}
function roundify(_43f,_440){
if(!_440){
_440=50;
}
if(_43f.height<=_440){
return;
}
var _441=_43f.parentNode;
_43f.style.visibility="hidden";
var _442=document.createElement("i");
_442.title=_43f.title;
_442.className=_43f.className;
if(!XN.browser.IE){
_442.style.display="inline-block";
}
_442.style.overflow="hidden";
_442.style.width=_440+"px";
_442.style.height=(_43f.height>_440?_440:_43f.height)+"px";
var _443=new Image();
_442.appendChild(_443);
_443.onload=function(){
_443.width=_440;
_441.replaceChild(_442,_43f);
if(_443.height>_440){
_443.style.marginTop="-"+parseInt((_443.height-_440)/2)+"px";
}
};
_443.src=_43f.src;
return;
}
XN.dom.ready(function(){
if(!$("navSearchInput")){
return;
}
var fix=null;
function showTip(){
if(!fix){
fix=new XN.ui.fixPositionElement({alignWith:"navSearchInput",tagName:"div"});
fix.hide();
fix.setContent("&nbsp;\u591a\u4e2a\u5173\u952e\u5b57\u7528\u7a7a\u683c\u9694\u5f00&nbsp;<br />&nbsp;\uff08\u4f8b\uff1a\u6c6a\u6d0b \u5317\u4eac\u5927\u5b66\uff09&nbsp;");
fix.container.style.cssText="width:"+($("navSearchInput").offsetWidth-2)+"px;padding:3px 0;background:#EEE;border:1px solid #BDC7D8;opacity:0.8;text-align:center;";
}
fix.show();
}
XN.event.addEvent("navSearchInput","focus",showTip);
XN.event.addEvent("navSearchInput","blur",function(){
if(fix){
setTimeout(function(){
fix.hide();
},100);
}
});
XN.event.addEvent("navSearchInput","keydown",function(){
if(fix){
fix.hide();
}
});
});
XN.dom.ready(function(){
function addRandom(v){
if(v.tagName&&v.tagName.toLowerCase()!="a"){
return;
}
if(v._ad_rd){
return;
}
v._ad_rd=true;
if(v.href.indexOf("#")==0){
return;
}
var name=["_request_from","_mm_id","_visitor_id","_os_type","_hua","_lu","_vip_flag","_ua_flag"][parseInt(Math.random()*(7+1))];
v.href=XN.string.setQuery(name,Math.ceil(Math.random()*100),v.href);
}
function rp(el){
if(!$(el)){
return;
}
XN.event.addEvent(el,"mouseover",function(e){
addRandom(XN.event.element(e||window.event));
});
}
rp("navBar");
rp("appNavHolder");
});
(function(){
var _449=/kaixin\.com|renren\.com|xiaonei\.com/g;
XN.widgets.rp_domain=function rp(el){
if(el.tagName&&el.tagName.toLowerCase()=="a"){
if(el._d_rpd){
return true;
}
el._d_rpd=true;
if(/http|@/.test(el.innerHTML)&&XN.browser.IE){
var _44b=el.innerHTML;
}
el.href=el.href.replace(_449,XN.env.domain);
if(!isUndefined(_44b)){
el.innerHTML=_44b;
}
return true;
}
return false;
};
var divs=["feedHome","replyDiv","notifications","messages"];
XN.widgets.domain_in_one={reg:function(el){
XN.event.addEvent(el,"mouseover",function(e){
var rp=XN.widgets.rp_domain;
var el=XN.event.element(e||window.event);
if(rp(el)){
return;
}
if(rp(el.parentNode)){
return;
}
rp(el.parentNode);
});
}};
XN.dom.ready(function(){
XN.array.each(divs,function(i,v){
if($(v)){
XN.widgets.domain_in_one.reg(v);
}
});
});
})();
$.extend=function(obj){
$extend($,obj);
};
$.extend({clearRange:function(){
try{
document.selection?document.selection.empty():getSelection().removeAllRanges();
}
catch(e){
}
},text:function(node){
var _455=node.childNodes;
for(var i=0,text="";i<_455.length;i++){
if(_455[i].nodeType==3){
text+=_455[i].nodeValue;
}
}
return text;
},css:function(ele,_459){
if(!ele){
return;
}
for(var i in _459){
ele.style[i]=_459[i];
}
},clear:function(node){
node.innerHTML="";
},append:function(node,_45d){
if(_45d.tagName){
node.appendChild(_45d);
}else{
var temp=document.createElement("div");
temp.innerHTML=_45d;
while(temp.hasChildNodes()){
node.appendChild(temp.firstChild);
}
}
},mouse:function(e){
e=e||event;
var x=e.pageX||(e.clientX+XN.EVENT.scrollLeft());
var y=e.pageY||(e.clientY+XN.EVENT.scrollTop());
return {x:x,y:y};
}});
$.wpi={parseMenuItem:function(_462){
var _463=_462.getElementsByTagName("a")[0];
return {id:_463.name,name:$.text(_463),href:_463.href,icon:_462.getElementsByTagName("img")[0].src,target:_463.target};
},parseShortCut:function(_464){
return {id:_464.name,name:_464.title,href:_464.href,icon:_464.getElementsByTagName("img")[0].src,target:_464.target};
},createShortCut:function(item){
var data=$.wpi.parseMenuItem(item);
data.href=this.setUrlParam(data.href,"origin",(this.getBaseCode()*100+93));
return "<a href=\""+data.href+"\" title=\""+data.name+"\" name=\""+data.id+"\" target=\""+data.target+"\"><img src=\""+data.icon+"\" class=\"icon\" /><span class=\"tooltip\"><nobr>"+data.name+"</nobr><span class=\"tooltip-arrow\"></span></span></a>";
},createMenuItem:function(){
var _467=document.createElement("dd");
var data=arguments[0].nodeType?$.wpi.parseShortCut(arguments[0]):arguments[0];
data.href=this.setUrlParam(data.href,"origin",(this.getBaseCode()*100+92));
_467.className="move";
_467.innerHTML="<a href=\""+data.href+"\" name=\""+data.id+"\" target=\""+data.target+"\"><img src=\""+data.icon+"\" />"+data.name+"<span class=\"del-handle\"></span></a>";
return _467;
},createHistroyItem:function(data){
data.href=this.setUrlParam(data.href,"origin",(this.getBaseCode()*100+91));
return "<dd><a href=\""+data.href+"\" name=\""+data.id+"\" target=\""+data.target+"\"><img src=\""+data.icon+"\" />"+data.name+"</a></dd>";
},createStowItem:function(data){
return "<a href=\""+data.href+"\" class=\"commend stow\" title=\""+data.name+"\" name=\""+data.id+"\" target=\""+data.target+"\"><img src=\""+data.icon+"\" class=\"icon\" /><img class=\"plus bauble plus-bullet\" src=\"http://xnimg.cn/imgpro/icons/green-plus-bullet.gif\" /> \u6536\u85cf"+data.name+"</a>";
},setUrlParam:function(url,_46c,_46d){
var reg=new RegExp("\\b"+_46c+"=.*?((?=[&])|$)");
if(reg.test(url)){
return url.replace(reg,_46c+"="+_46d);
}else{
var has=url.indexOf("?")!=-1;
return url+(has?"&":"?")+_46c+"="+_46d;
}
},serial:[],ajaxAddApp:function(id){
if(this.serial.length<6){
this.serial.push(id);
}else{
var temp=this.serial.slice(0,5);
temp.push(id);
this.serial=temp.concat(this.serial.slice(5));
}
new XN.NET.xmlhttp({url:"http://apps."+XN.env.domain+"/menu/addBookmark.do",method:"post",data:"app_id="+id});
},ajaxDelApp:function(id){
for(var i=0;i<this.serial.length;i++){
if(this.serial[i]==id){
this.serial.splice(i,1);
break;
}
}
new XN.NET.xmlhttp({url:"http://apps."+XN.env.domain+"/menu/removeBookmark.do",method:"post",data:"app_id="+id});
},ajaxSerialApp:function(sn){
if(sn.join(",")!=this.serial.join(",")){
this.serial=sn;
new XN.NET.xmlhttp({url:"http://apps."+XN.env.domain+"/menu/reorderBookmark.do",method:"post",data:"app_ids="+XN.JSON.build(sn)});
}
},getBaseCode:function(){
var list={};
list["home."+XN.env.domain]=1;
list[XN.env.domain+"/profile.do"]=2;
list["msg."+XN.env.domain]=3;
list["apps."+XN.env.domain]=5;
list["game."+XN.env.domain]=5;
list["app."+XN.env.domain]=7;
list["app."+XN.env.domain+"/apps/editapps.do"]=8;
list["app."+XN.env.domain+"/apps/application.do"]=9;
list["app."+XN.env.domain+"/app/apps/list"]=28;
return list[location.hostname+location.pathname]||list[location.hostname]||0;
}};
(function(){
$.effect=$.effect||{};
var _476=$.effect.MoveEffect=function(_477){
this.config=_477;
this.element=$(_477.element);
this.nodeStart={x:0,y:0};
this.mouseStart={x:0,y:0};
this.shadow=null;
this.activeItem=null;
if(XN.ELEMENT.getStyle(this.element,"position")=="static"){
$.css(this.element,{"position":"relative"});
}
this.init();
};
_476.prototype={init:function(){
var that=this;
this.moveWrap=function(e){
var pos=$.mouse(e);
if((pos.x-that.mouseStart.x)==0&&(pos.y-that.mouseStart.y)==0){
return;
}
if(that.config.startMove){
that.config.startMove();
}
that.moveHandler(e);
};
this.repeaseWrap=function(e){
that.releaseHandler(e);
};
$(this.element).addEvent("mousedown",function(e){
e=e||window.event;
that.activeItem=that.getActiveItem(e);
if(that.activeItem==null){
return;
}
that.mouseStart=$.mouse(e);
that.nodeStart={x:that.activeItem.offsetLeft,y:that.activeItem.offsetTop};
$(document).addEvent("mousemove",that.moveWrap).addEvent("mouseup",that.repeaseWrap);
XN.BROWSER.IE?(e.returnValue=false):e.preventDefault();
return false;
});
},getActiveItem:function(e){
e=e||window.event;
var obj=e.target||e.srcElement;
while(obj.parentNode!=this.element){
obj=obj.parentNode;
}
return obj.nodeType==1?obj:null;
},moveHandler:function(e){
e=e||window.event;
this.createShadow();
$.clearRange();
var top=this.nodeStart.y+($.mouse(e).y-this.mouseStart.y);
var left=this.nodeStart.x+($.mouse(e).x-this.mouseStart.x);
if(!this.activeItem.parentNode||this.config.outLimit(top,left,this.shadow.offsetHeight,this.shadow.offsetWidth)){
this.releaseHandler();
}else{
this.moveShadow(top,left);
this.serialize(top,left);
}
},createShadow:function(){
if(this.shadow==null){
this.shadow=this.activeItem.cloneNode(true);
$(this.shadow).addClass("movemirror");
$.css(this.shadow,{top:this.nodeStart.y+"px",left:this.nodeStart.x+"px",width:this.activeItem.offsetWidth+"px",height:this.activeItem.offsetHeight+"px"});
$.append(this.element,this.shadow);
}
},releaseHandler:function(e){
$(document).delEvent("mousemove",this.moveWrap).delEvent("mouseup",this.repeaseWrap);
if(this.shadow){
$(this.shadow).remove();
this.shadow=null;
if(typeof this.config.release=="function"){
this.config.release(this.activeItem);
}
}
},moveShadow:function(top,left){
$.css(this.shadow,{top:top+"px",left:left+"px"});
},serialize:function(top,left){
var _487=this.config.getIndex(top,left,this.activeItem.offsetHeight,this.activeItem.offsetWidth);
if(_487>=0){
var list=this.config.getChilds();
if(list[_487]){
this.element.insertBefore(this.activeItem,list[_487]);
}else{
$.append(this.element,this.activeItem);
}
}
}};
var _489=null;
var _48a=null;
var _48b=null;
var _48c=null;
var _48d=null;
var _48e=null;
function sendNewSerial(){
var _48f=_489.getElementsByTagName("dd");
var sn=[];
for(var i=0;i<_48f.length;i++){
sn.push(parseInt(_48f[i].getElementsByTagName("a")[0].name));
}
$.wpi.ajaxSerialApp(sn);
}
function createAppMove(){
_48d=new _476({element:_489,getChilds:function(){
return _489.getElementsByTagName("dd");
},getIndex:function(top,left,offH,offW){
return Math.ceil(top/offH);
},release:function(){
$.clear(_48c);
var list=_489.getElementsByTagName("dd");
for(var i=0;i<list.length&&i<6;i++){
$.append(_48c,$.wpi.createShortCut(list[i]));
}
var _498=_489.getElementsByTagName("dt")[0];
if(!_498){
_498=document.createElement("dt");
}
_489.insertBefore(_498,list[6]||null);
$.css(_498,{display:(wpiMenuInfo.favoriteMenu.length>6?"block":"none")});
$.css($("wpi_collectionTitle"),{borderBottom:(list[0]?"1px solid #E3EEF9":"none")});
var _499=_48b.getElementsByTagName("img")[0];
if(_499){
for(var i=0;i<list.length&&i<6;i++){
if(list[i].getElementsByTagName("img")[0].src==_499.src){
_48b.innerHTML="";
break;
}
}
}
sendNewSerial();
},outLimit:function(top,left,offH,offW){
if(top<-offH||top>_489.offsetHeight){
return true;
}
return false;
}});
}
function createCutMove(){
_48e=new _476({element:_48c,getChilds:function(){
return _48c.getElementsByTagName("a");
},getIndex:function(top,left,offH,offW){
return Math.ceil(left/offW);
},release:function(){
var list=_48c.getElementsByTagName("a");
var _4a3=_489.getElementsByTagName("dd");
for(var i=0;i<list.length;i++){
_489.replaceChild($.wpi.createMenuItem(list[i]),_4a3[i]);
}
sendNewSerial();
},outLimit:function(top,left,offH,offW){
if(left<-offW||left>_48c.offsetWidth){
return true;
}
return false;
}});
}
function bindEvents(){
_489=$("wpi_collectionApps");
_48b=$("wpi_addCollection");
_48c=$("wpi_shortCutsPanel");
_48a=$("wpi_hitoryPanel");
createAppMove();
createCutMove();
_48b.addEvent("click",function(e){
var app=_48b.getElementsByTagName("a")[0];
if(app){
var _4ab=_489.getElementsByTagName("dd");
var menu=null;
var src=app.getElementsByTagName("img")[0].src;
for(var i=0;i<_4ab.length;i++){
if(_4ab[i].getElementsByTagName("img")[0].src==src){
menu=_4ab[i];
break;
}
}
if(menu==null){
menu=$.wpi.createMenuItem(app);
$.wpi.ajaxAddApp(wpiMenuInfo.currentApp[0].id);
}
_489.insertBefore(menu,_4ab[5]||null);
_48d.config.release();
_48b.innerHTML="";
XN.EVENT.stop(e||event);
}
});
_489.addEvent("click",function(e){
e=e||window.event;
var obj=e.target||e.srcElement;
if(obj.className=="del-handle"){
while(obj.tagName!="DD"){
obj=obj.parentNode;
}
var _4b1=document.createElement("div");
_4b1.innerHTML="<tt class=\"del-tip\">\u5df2\u79fb\u51fa\u6536\u85cf</tt><tt class=\"del-reroll\">\u64a4\u9500</tt>";
$.css(obj.getElementsByTagName("a")[0],{"display":"none"});
var _4b2=setTimeout(function(){
if(obj&&obj.parentNode){
$.wpi.ajaxDelApp(obj.getElementsByTagName("a")[0].name);
obj.parentNode.removeChild(obj);
_48d.config.release();
}
},4000);
_4b1.timer=_4b2;
$.append(obj,_4b1);
XN.BROWSER.IE?(e.returnValue=false):e.preventDefault();
return false;
}else{
if(obj.className=="del-reroll"){
clearTimeout(obj.parentNode.timer);
var app=obj.parentNode.parentNode;
$.css(app.getElementsByTagName("a")[0],{"display":"block"});
$.css(obj.parentNode,{display:"none"});
setTimeout(function(){
app.removeChild(obj.parentNode);
},0);
XN.BROWSER.IE?(e.returnValue=false):e.preventDefault();
return false;
}
}
});
var _4b4=$("wpi_menuPanel");
var _4b5=$("wpi_menuEntry");
function toggleApp(e){
if(/\bm-chat-button-apps-active\b/.test(_4b5.className)){
$.css(_4b4,{display:"none"});
_4b5.delClass("m-chat-button-apps-active");
}else{
$.css(_4b4,{display:"block"});
_4b5.addClass("m-chat-button-apps-active");
}
$.clearRange();
var _4b7=$("newuserAppTip");
if(_4b7){
_4b7.remove();
}
}
$("wpi_minMenuPanel").addEvent("click",toggleApp);
$("wpi_togMenuPanel").addEvent("click",function(e){
if(!/\bm-chat-button-apps-active\b/.test(_4b5.className)&&parseInt(wpiMenuInfo.user.id)%10==0){
new XN.NET.xmlhttp({url:"http://apps."+XN.env.domain+"/menu/menustart.do?"+new Date().getTime(),method:"get"});
}
toggleApp(e);
});
var _4b9=$("wpiroot");
$(document).addEvent("click",function(e){
e=e||event;
var obj=e.target||e.srcElement;
while(obj!=_4b9&&obj.parentNode){
obj=obj.parentNode;
}
if(obj!=_4b9&&/\bm-chat-button-apps-active\b/.test(_4b5.className)){
toggleApp();
}
});
}
function getStruts(){
return ["<div id=\"wpi_myapp\" class=\"m-chat-button-con\" style=\"display:none;\">","<div id=\"wpi_menuEntry\" class=\"m-chat-button-apps\">","<div id=\"wpi_togMenuPanel\" class=\"m-chat-button-apps-text\">\u6211\u7684\u5e94\u7528","</div>","<div id=\"wpi_reflow\" style=\"display:none;\"></div>","<div id=\"wpi_menuPanel\" class=\"m-chat-window\"><div style=\"position:relative;z-index:2;\">","<div class=\"chat-head\">","<div class=\"head-btn\"><a title=\"\u9690\u85cf\u7a97\u53e3\" id=\"wpi_minMenuPanel\" class=\"minimize\" href=\"javascript:;\"></a></div>","<div class=\"head-name\">\u6211\u7684\u5e94\u7528</div>","</div>","<div class=\"chat-conv\">","<dl class=\"apps\"><dt>\u6700\u8fd1\u4f7f\u7528</dt></dl>","<dl id=\"wpi_hitoryPanel\" class=\"apps\"></dl>","<dl class=\"apps\"><dt id=\"wpi_collectionTitle\">\u6211\u7684\u6536\u85cf <a class=\"edit\" href=\"http://app."+XN.env.domain+"/apps/editapps.do?origin=",$.wpi.getBaseCode()*100+90,"\">\u7f16\u8f91</a></dt></dl>","<dl id=\"wpi_collectionApps\" class=\"apps\"></dl>","</div>","<div class=\"m-chat-notice footer\"><strong>\u62d6\u52a8\u8fdb\u884c\u6392\u5e8f</strong> <a class=\"more\" href=\"http://app."+XN.env.domain+"/app/apps/list?origin=",$.wpi.getBaseCode()*100+90,"\">\u6d4f\u89c8\u66f4\u591a\u5e94\u7528</a></div></div>","<iframe width=\"192\" height=\"100%\" frameBorder=\"0\" style=\"position:absolute;top:0;left:0;z-index:1;margin-left:-1px;opacity:0;filter:alpha(opacity=0);_height:expression(this.parentNode.offsetHeight);\"></iframe>","</div>","</div>","<div id=\"wpi_shortCutsPanel\" class=\"m-chat-button-links\"></div>","<div id=\"wpi_addCollection\" class=\"m-chat-button-links m-chat-button-shotcuts\"></div></div>"].join("");
}
function createStruts(){
var root=$("wpiroot").getElementsByTagName("div")[0];
$.append(root,getStruts());
}
function createRecentMenus(){
$("wpi_togMenuPanel").addEvent("click",function(){
if(!createRecentMenus.init){
for(var i=0;i<wpiMenuInfo.recentMenu.length&&i<9;i++){
$.append(_48a,$.wpi.createHistroyItem(wpiMenuInfo.recentMenu[i]));
}
createRecentMenus.init=true;
}
});
}
function createFavoriteMenus(){
for(var i=0;i<wpiMenuInfo.favoriteMenu.length&&i<6;i++){
$.wpi.serial.push(wpiMenuInfo.favoriteMenu[i].id);
$.append(_489,$.wpi.createMenuItem(wpiMenuInfo.favoriteMenu[i]));
}
$("wpi_togMenuPanel").addEvent("click",function(){
if(!createFavoriteMenus.init){
for(var i=6;i<wpiMenuInfo.favoriteMenu.length;i++){
$.wpi.serial.push(wpiMenuInfo.favoriteMenu[i].id);
$.append(_489,$.wpi.createMenuItem(wpiMenuInfo.favoriteMenu[i]));
}
createFavoriteMenus.init=true;
}
});
}
function createShortcuts(){
_48d.config.release();
}
function createStowShortcut(){
for(var i=0;i<wpiMenuInfo.currentApp.length;i++){
$.append(_48b,$.wpi.createStowItem(wpiMenuInfo.currentApp[i]));
}
}
$.wpi.initApp=function(){
if(!window.wpiMenuInfo){
return;
}
createStruts();
bindEvents();
wpiMenuInfo.recentMenu=wpiMenuInfo.recentMenu.slice(0,9);
for(var i=0;i<wpiMenuInfo.favoriteMenu.length;i++){
for(var j=0;j<wpiMenuInfo.recentMenu.length;j++){
if(wpiMenuInfo.favoriteMenu[i].id==wpiMenuInfo.recentMenu[j].id){
wpiMenuInfo.recentMenu.splice(j,1);
break;
}
}
}
for(var i=0;i<wpiMenuInfo.favoriteMenu.length&&i<6;i++){
for(var j=0;j<wpiMenuInfo.currentApp.length;j++){
if(wpiMenuInfo.favoriteMenu[i].id==wpiMenuInfo.currentApp[j].id){
wpiMenuInfo.currentApp.splice(j,1);
break;
}
}
}
createRecentMenus();
createFavoriteMenus();
createShortcuts();
createStowShortcut();
};
$.wpi.showApp=function(){
if(!window.wpiMenuInfo){
return;
}
$.css($("wpi_myapp"),{display:"block"});
var _4c3=$("wpi_reflow");
if(XN.BROWSER.IE7&&_4c3){
$(window).addEvent("scroll",function(){
_4c3.innerHTML="";
});
}
};
$.wpi.hideApp=function(){
if(!window.wpiMenuInfo){
return;
}
$.css($("wpi_myapp"),{display:"none"});
};
})();
XN.dom.ready(function(){
if(!$("navSearchInput")){
return;
}
new XN.ui.friendSearchBar({input:"navSearchInput",submit:$("navSearchSubmit"),form:$("globalSearchForm")});
if(!$("searchMenuAction")){
return;
}
new XN.ui.menu({bar:"searchMenuAction",menu:"searchdropdownMenu",fireOn:"click",alignType:"3-2",offsetX:1});
});
XN.app.statsMaster=function(){
};
XN.app.statsMaster.init=function(){
var j={};
j.ID=XN.cookie.get("id");
j.R=encodeURIComponent(location.href);
var _4c5=function(e){
var e=e||window.event,_X=XN.event.pointerX(e),Y=XN.event.pointerY(e),U,T,el=XN.event.element(e),_4cc=$("dropmenuHolder");
xx=XN.element.realLeft(_4cc);
T=el.tagName.toLowerCase();
if(T=="img"){
U=el.src;
}else{
if(T=="a"){
U=el.href;
}
}
j.X=_X-xx;
j.Y=Y;
if(U){
j.U=U;
}
if(T){
j.T=T;
}
var rq=new Image();
rq.src="http://dj."+XN.env.domain+"/click?J="+XN.JSON.build(j);
};
XN.event.addEvent(document,"mousedown",_4c5);
};
XN.dom.ready(XN.app.statsMaster.init);
XN.dom.ready(function(){
var _4ce=false;
var _4cf=true;
XN.event.addEvent(document,"mousedown",function(){
_4cf=false;
});
XN.event.addEvent(window,"blur",function(){
_4cf=true;
});
showConfirmDialog=function(){
XN.dom.disable();
var d=XN.DO.alert({title:"\u8bf7\u9886\u53d6\u4f60\u7684"+XN.env.siteName+"\u901a\u884c\u8bc1",message:"<iframe id=\"frameactive\" width=\"421\" height=\"100%\" frameborder=\"no\" scrolling=\"no\" frameborder=\"0\" marginheight=\"0\" marginwidth=\"0\" src=\"http://channel."+XN.env.domain+"/confirm/show\" ></iframe>",width:454,params:{showCloseButton:true},callBack:function(){
_4ce=false;
showConfirmDialog.fireEvent("close");
}});
arguments.callee.dialog=d;
d.footer.hide();
};
XN.event.enableCustomEvent(showConfirmDialog);
var _4d1=setInterval(function(){
if(_4cf||window.noConfirmWindow||_4ce||!XN.cookie.get("noconfirm")){
return;
}
_4ce=true;
XN.cookie.del("noconfirm","/",XN.env.domain);
XN.cookie.del("noconfirm","/",window.location.hostname);
showConfirmDialog();
},1000);
XN.log("\u672a\u6fc0\u6d3b\u7528\u6237\u5f15\u5bfc\u521d\u59cb\u5316over");
});

