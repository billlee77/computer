var h=window.location.hostname;
var rootDomain;
var renren=false;
if(h.indexOf("renren.com")>=0){
document.domain="renren.com";
rootDomain="renren.com";
renren=true;
}else{
if(h.indexOf("kaixin.com")>=0){
document.domain="kaixin.com";
rootDomain="kaixin.com";
renren=false;
}
}
var topDoc=top.document;
var log=null;
var gPersistData=null;
var hostName="me";
domain=document.domain;
(function(){
var ua=navigator.userAgent.toLowerCase();
window.OS={isFirefox:/gecko/.test(ua)&&/rv/.test(ua),isOpera:/opera/.test(ua),isChrome:/chrome/.test(ua),isWebkit:/webkit/.test(ua)&&!/opera/.test(ua)&&!/chrome/.test(ua),isIE:/msie/.test(ua)&&!/opera/.test(ua),browserOK:false};
if(/MSIE (\d+\.\d+);/.test(navigator.userAgent)){
var _2=new Number(RegExp.$1);
OS.isIE6=_2==6;
OS.isIE7=(_2==7);
if(_2>=6){
OS.browserOK=true;
}
}else{
if(OS.isFirefox){
var _3=ua.replace(/^.*rv\:|\).*$/g,"");
if(/1\.9/.test(_3)){
OS.browserOK=true;
}
if(/1\.8/.test(_3)&&!/1\.8\.0/.test(_3)){
OS.isFirefox2=true;
OS.browserOK=true;
}
}else{
if(OS.isWebkit){
OS.browserOK=true;
var i=ua.indexOf("version");
if(i>=0){
OS.version=parseFloat(ua.substring(i+("version").length+1));
}
}else{
if(OS.isChrome){
OS.browserOK=true;
}
}
}
}
})();
(function(){
function logger(){
this.el=document.createElement("div");
this.el.className="debug";
this.cnt=0;
with(this.el.style){
fontSize="9pt";
position="absolute";
textAlign="left";
top="10px";
left="300px";
width="800px";
height="1000px";
border="1px solid";
color="white";
backgroundColor="#000000";
verticalAlign="bottom";
overflow="auto";
}
}
logger.prototype.hide=function(){
this.el.style.display="none";
document.body.removeChild(this.el);
};
logger.prototype.reset=function(){
this.cnt=0;
this.el.innerHTML="";
};
logger.prototype.println=function(_5){
return;
if(this.cnt++>500){
this.cnt=0;
this.el.innerHTML="";
}
var _6=document.createTextNode(_5);
this.el.appendChild(_6);
_6=document.createElement("br");
this.el.appendChild(_6);
this.el.scrollTop=this.el.scrollHeight;
};
window.wplog=new logger();
})();
var Jid=function(_7){
var i=_7.indexOf("@");
this.id=_7.substring(0,i);
i=_7.indexOf("/",i);
this.resource=_7.substring(i+1,_7.length);
};
Jid.prototype.str=function(){
var r=this.id+"@talk.renren.com";
if(this.resource){
r+="/"+this.resource;
}
return r;
};
var imHelper={loadSound:function(){
var _a="http://wpi."+rootDomain+"/wtalk/wpsound.swf";
var _b="<object width=\"10\" height=\"10\" id=\"webpagersound\" type=\"application/x-shockwave-flash\" data=\""+_a+"\">"+"<param name=\"allowScriptAccess\" value=\"sameDomain\" />"+"<param name=\"movie\" value=\"wpsound.swf\" />"+"<param name=\"scale\" value=\"noscale\" />"+"<param name=\"salign\" value=\"lt\" />"+"</object>";
var sp=document.createElement("div");
sp.innerHTML=_b;
document.body.appendChild(sp);
},soundLoadCnt:0,playSound:function(_d){
if(!persistMap.settings.playSound()){
return;
}
var _e=document.getElementById("webpagersound");
if(!_e){
if(++this.soundLoadCnt<20){
if(this.soundLoadCnt==1){
this.loadSound();
}
setTimeout(function(){
imHelper.playSound(_d);
},200);
}
}
try{
if(_d=="notify"){
_e.playNotifySound();
}else{
_e.playMessageSound();
}
}
catch(e){
}
},escapeHTML:function(_f){
var div=document.createElement("div");
var txt=document.createTextNode(_f);
div.appendChild(txt);
return div.innerHTML;
},unescapeHTML:function(_12){
var n=document.createElement("div");
n.innerHTML=_12;
if(n.innerText){
return n.innerText;
}
return n.textContent;
},xmlEncode:function(str){
str=str.replace(/&/g,"&amp;");
str=str.replace(/</g,"&lt;");
str=str.replace(/>/g,"&gt;");
str=str.replace(/'/g,"&apos;");
str=str.replace(/\"/g,"&quot;");
return str;
},reportChat:function(str,_16){
if(!gConn.localConnect){
return;
}
this.report(str,_16);
},report:function(str,_18){
if(isNaN(_18)||_18==null){
_18=1;
}
var ts=new Date().getTime();
var _1a=this.getLoginUin();
if(!_1a||(ts%100>_18)){
return;
}
var img=document.createElement("img");
img.setAttribute("src","http://stat.talk.renren.com/r09_"+str+"_"+_18+"&"+_1a);
img.setAttribute("width","0");
img.setAttribute("height","0");
img.style.dispaly="none";
document.body.appendChild(img);
},getCookie:function(_1c){
var _1d=document.cookie.match("(^|;) ?"+_1c+"=([^;]*)(;|$)");
if(_1d){
return decodeURIComponent(_1d[2]);
}
return null;
},setCookie:function(_1e,_1f,_20){
var s=_1e+"="+encodeURIComponent(_1f);
if(_20){
_20=_20*1000*60*60*24;
var _22=new Date((new Date()).getTime()+_20);
s+=";expires="+_22.toGMTString();
}
document.cookie=s;
},deleteCookie:function(_23){
var s=_23+"=;expires=Thu, 01-Jan-1970 00:00:01 GMT";
document.cookie=s;
},_initUin:null,isLoginUser:function(){
var uin=this.getLoginUin();
if(!uin||uin<=0){
return false;
}
if(this._initUin==null){
this._initUin=this.getLoginUin();
}else{
if(uin!=this._initUin){
return false;
}
}
return this.getCookie("t")!=null||this.getCookie("societyguester")!=null;
},getLoginUin:function(){
var uin=this.getCookie("id");
if(!uin){
uin=this.getCookie("hostid");
}
if(!uin){
uin=this.getCookie("userid");
}
if(!uin){
var kl=this.getCookie("kl");
if(kl){
var i=kl.lastIndexOf("_");
uin=kl.substring(i+1,kl.length);
}
}
return uin;
},faceTable:(":\\) \u5f00\u5fc3 imgpro/icons/statusface/1.gif,"+":\\'\\( \u54ed imgpro/icons/statusface/3.gif,"+":-O \u60ca\u8bb6 imgpro/icons/statusface/4.gif,"+":@ \u751f\u6c14 imgpro/icons/statusface/5.gif,"+":\\( \u96be\u8fc7 imgpro/icons/statusface/6.gif,"+":\\$ \u5bb3\u7f9e imgpro/icons/statusface/15.gif,"+"\\|-\\) \u56f0 imgpro/icons/statusface/14.gif,"+":d \u5927\u7b11 imgpro/icons/statusface/16.gif,"+"-\\| \u4e66\u5446\u5b50 imgpro/icons/statusface/13.gif,"+":-p \u5410\u820c\u5934 imgpro/emotions/tie/4.gif,"+"\\(\u5978\u7b11\\) \u5978\u7b11 imgpro/emotions/tie/2.gif,"+"\\(\u75c5\\) \u75c5 imgpro/emotions/tie/14.gif,"+"\\(\u5c34\u5c2c\\) \u5c34\u5c2c imgpro/emotions/tie/5.gif,"+"\\(\u6c57\\) \u6c57 imgpro/emotions/tie/6.gif,"+"\\(\u60ca\u6050\\) \u60ca\u6050 imgpro/emotions/tie/7.gif,"+"\\(\u56e7\\) \u56e7 imgpro/emotions/tie/8.gif,"+"\\(\u5410\\) \u5410 imgpro/emotions/tie/19.gif,"+"\\(\u9177\\) \u9177 imgpro/emotions/tie/10.gif,"+"\\(\u6d41\u53e3\u6c34\\) \u6d41\u53e3\u6c34 imgpro/emotions/tie/11.gif,"+"\\(\u732b\u732b\u7b11\\) \u732b\u732b\u7b11 imgpro/emotions/tie/12.gif,"+"\\(\u6655\\) \u6655 imgpro/emotions/tie/21.gif,"+"\\(\u8272\\) \u8272\u8ff7\u8ff7 imgpro/emotions/tie/13.gif,"+"\\(\u53ef\u7231\\) \u53ef\u7231 imgpro/emotions/tie/9.gif,"+"\\(\u5403\u996d\\) \u5403\u996d imgpro/emotions/tie/3.gif,"+"\\(k\\) \u5634\u5507 imgpro/icons/statusface/2.gif,"+":a \u7231 imgpro/icons/statusface/8.gif,"+"\\(v\\) \u82b1\u513f imgpro/icons/statusface/9.gif,"+"\\(bee\\) \u5c0f\u871c\u8702 imgpro/icons/statusface/bee.gif").split(","),translateFace:function(s){
var ret=s;
for(var i=0;i<this.faceTable.length;++i){
var _2c=this.faceTable[i].split(" ");
var re=new RegExp(_2c[0],"gi");
ret=ret.replace(re,"<img alt=\""+_2c[1]+"\" title=\""+_2c[1]+"\" src=\"http://xnimg.cn/"+_2c[2]+"\"/>");
}
return ret;
},translateLink:function(_2e){
var _2f=/http(s?)\:\/\/([a-zA-Z0-9_\-]+\.)+[a-zA-Z]{2,}(:[0-9]+)?(\/[a-zA-Z0-9\-\._\?\,\'\/\\\+&amp;%\$#\=~]*)?/g;
var _30;
var _31=0;
var _32="";
while((_30=_2f.exec(_2e))!=null){
if(_2f.lastIndex>_31){
_32+=_2e.substring(_31,_30.index);
_31=_2f.lastIndex;
}
_32+="<a target=\"_blank\" href=\""+_30[0]+"\">"+_30[0]+"</a>";
}
if(_31<_2e.length){
_32+=_2e.substring(_31,_2e.length);
}
return _32;
},getXhr:function(){
try{
return new XMLHttpRequest();
}
catch(e){
try{
return new ActiveXObject("microsoft.xmlhttp");
}
catch(e){
try{
return new ActiveXObject("msxml2.xmlhttp");
}
catch(e){
}
}
}
return null;
},startXnclient:function(){
var a;
try{
a=new ActiveXObject("xntalk.Application.2");
}
catch(e){
return false;
}
if(!a){
return false;
}
var res;
try{
res=a.login();
}
catch(e){
return false;
}
if(res==1){
return false;
}
return true;
}};
var DELETED_EVENT_TYPE=101;
(function(){
var _35=2;
var _36=3;
var _37=4;
var _38={storage:null,seqStorage:null,messageStorage:[],MESSAGE_STORGAE_CNT:5,notifyStorage:null,getStorage:function(_39,_3a){
switch(_39){
case _35:
return this._getIeStorage(this.seqStorage,"seq_storage","s"+_3a);
case _36:
return this._getIeStorage(this.notifyStorage,"notify_storage","n"+_3a);
case _37:
var n=_3a%this.MESSAGE_STORGAE_CNT;
return this._getIeStorage(this.messageStorage[n],"msg_storage"+n,"m"+_3a);
}
return null;
},setStorage:function(_3c,_3d,_3e){
switch(_3c){
case _35:
return this._setIeStorage(this.seqStorage,"seq_storage","s"+_3d,_3e);
case _36:
return this._setIeStorage(this.notifyStorage,"notify_storage","n"+_3d,_3e);
case _37:
var n=_3d%this.MESSAGE_STORGAE_CNT;
return this._setIeStorage(this.messageStorage[n],"msg_storage"+n,"m"+_3d,_3e);
}
return false;
},removeStorage:function(_40,_41){
this.setStorage(_40,_41,DELETED_EVENT_TYPE);
},loadNotifies:function(_42){
if(_42<0){
return [];
}
try{
_38.notifyStorage.load("notify_storage");
}
catch(e){
return [];
}
var _43=[];
var i=_42;
while(i>=0&&_42-i<_45){
var s;
try{
s=_38.notifyStorage.getAttribute("n"+(i%_45));
}
catch(e){
s=null;
}
if(!s){
--i;
continue;
}
_43.push([i--,s]);
}
return _43;
},clearNotifies:function(){
persistMap.deleteNotifySeq();
},loadMessages:function(_47){
if(_47<0){
return [];
}
for(var i=0;i<this.MESSAGE_STORGAE_CNT;i++){
try{
_38.messageStorage[i].load("msg_storage"+i);
}
catch(e){
return [];
}
}
var _49=[];
var i=_47;
while(i>=0&&_47-i<_4a){
var s;
try{
s=_38.messageStorage[(i%_4a)%this.MESSAGE_STORGAE_CNT].getAttribute("m"+(i%_4a));
}
catch(e){
s=null;
}
if(!s){
--i;
continue;
}
_49.push([i--,s]);
}
return _49;
},clearMessages:function(){
persistMap.deleteMessageSeq();
},_createStorageNode:function(){
var n=document.createElement("div");
n.style.display="none";
n.style.behavior="url(#default#userData)";
document.body.appendChild(n);
return n;
},initStorageNodes:function(){
this.storage=this._createStorageNode();
this.seqStorage=this._createStorageNode();
for(var i=0;i<this.MESSAGE_STORGAE_CNT;i++){
this.messageStorage.push(this._createStorageNode());
}
this.notifyStorage=this._createStorageNode();
},_setIeStorage:function(_4e,_4f,key,_51){
if(!OS.isIE){
return false;
}
try{
_4e.setAttribute(key,_51);
_4e.save(_4f);
}
catch(e){
persistMap.errorCode=e.number&65535;
persistMap.rwExcept=true;
return false;
}
return true;
},_getIeStorage:function(_52,_53,key){
if(!OS.isIE){
return null;
}
try{
_52.load(_53);
return _52.getAttribute(key);
}
catch(e){
imHelper.reportChat("error/ie_storage",1);
persistMap.errorCode=e.number&65535;
persistMap.rwExcept=true;
return null;
}
}};
var d=document.domain;
var _56={getStorage:function(_57,_58){
return this.getItem(this._getNameTyType(_57,_58));
},setStorage:function(_59,_5a,_5b){
return this.setItem(this._getNameTyType(_59,_5a),_5b);
},removeStorage:function(_5c,_5d){
this.removeItem(this._getNameTyType(_5c,_5d));
},loadNotifies:function(_5e){
var _5f=[];
var i=_5e;
while(i>=0&&_5e-i<_45){
var s;
try{
s=this.getItem("n"+(i%_45));
}
catch(e){
s=null;
}
if(!s){
--i;
continue;
}
_5f.push([i--,s]);
}
return _5f;
},clearNotifies:function(){
persistMap.deleteNotifySeq();
},loadMessages:function(_62){
var _63=[];
var i=_62;
while(i>=0&&_62-i<_4a){
var s;
try{
s=this.getItem("m"+(i%_4a));
}
catch(e){
s=null;
}
if(!s){
--i;
continue;
}
_63.push([i--,s]);
}
return _63;
},clearMessages:function(){
persistMap.deleteMessageSeq();
},init:function(){
if(OS.isFirefox){
this.storage=globalStorage[d];
}else{
if(OS.isWebkit){
this.storage=localStorage;
}
}
},_getNameTyType:function(_66,_67){
switch(_66){
case _35:
return "s"+_67;
case _36:
return "n"+_67;
case _37:
return "m"+_67;
}
return _67;
},setItem:function(key,_69){
try{
this.storage.setItem(key,_69);
}
catch(e){
persistMap.rwExcept=true;
return false;
}
return true;
},getItem:function(key){
try{
return this.storage.getItem(key);
}
catch(e){
persistMap.rwExcept=true;
return null;
}
},removeItem:function(key){
try{
this.storage.removeItem(key);
}
catch(e){
persistMap.rwExcept=true;
}
}};
_56.init();
var _6c=10*365;
var _6d=16;
var _4a=120;
var _45=32;
window.persistMap={getPresenceDesc:function(){
var p=imHelper.getCookie("wppresence");
return p?p:"{\"uw\":0}";
},setPresenceDesc:function(v){
imHelper.setCookie("wppresence",v);
},getNotifySeq:function(){
var n=parseInt(imHelper.getCookie("wimnseq"));
if(isNaN(n)){
return -1;
}
return n>=0?n:0;
},setNotifySeq:function(seq){
imHelper.setCookie("wimnseq",seq,_6c);
},deleteNotifySeq:function(seq){
imHelper.deleteCookie("wimnseq");
},getMessageSeq:function(){
var n=parseInt(imHelper.getCookie("wimmseq"));
if(isNaN(n)){
return -1;
}
return n>=0?n:0;
},setMessageSeq:function(seq){
imHelper.setCookie("wimmseq",seq,_6c);
},deleteMessageSeq:function(seq){
imHelper.deleteCookie("wimmseq");
},getControlSeq:function(){
var n=parseInt(imHelper.getCookie("wimgseq"));
if(isNaN(n)){
return -1;
}
return n>=0?n:0;
},setControlSeq:function(seq){
imHelper.setCookie("wimgseq",seq,_6c);
},errorCode:0,rwExcept:false,data:null,init:function(){
if(OS.isIE){
this.data=_38;
this.data.initStorageNodes();
}else{
if(OS.isFirefox||OS.isWebkit){
this.data=_56;
}
}
},setMessage:function(seq,_79){
if(this.data){
return this.data.setStorage(_37,seq%_4a,_79);
}
return true;
},getMessage:function(seq){
if(this.data){
return this.data.getStorage(_37,seq%_4a);
}
return null;
},setNotify:function(seq,_7c){
if(this.data){
return this.data.setStorage(_36,seq%_45,_7c);
}
return false;
},getNotify:function(seq){
if(this.data){
return this.data.getStorage(_36,seq%_45);
}
return null;
},removeNotify:function(seq){
if(this.data){
this.data.removeStorage(_36,seq%_45);
}
},setControl:function(seq,_80){
if(this.data){
return this.data.setStorage(_35,seq%_6d,_80);
}
return false;
},getControl:function(seq){
if(this.data){
return this.data.getStorage(_35,seq%_6d);
}
return null;
},setUsable:function(_82){
imHelper.setCookie("wpusable",_82?1:0);
},test:function(){
if(OS.isChrome){
return false;
}
if(OS.isWebkit&&(!OS.version||OS.version<4)){
return false;
}
var ck=imHelper.getCookie("wpusable");
if(ck){
return parseInt(ck)==1;
}
if(!this.data){
return false;
}
var s=(new Date()).getTime();
var _85=false;
if(this.data.setStorage(_35,"timestamp",s)){
var t=(new Date()).getTime()-s;
if(t<3000){
var g=this.data.getStorage(_35,"timestamp");
if(g==s){
_85=true;
}
}else{
imHelper.report("perfstat/test_write_time_out&t="+t,100);
}
}
this.setUsable(_85);
return _85;
}};
persistMap.init();
})();
var eventType={CONN_SUCCESS:11,CONN_CLOSE:12,IM_DISABLE:20,IM_ENABLE:21,SOUND_SWITCH:22,MSG_SEND:49,MSG_RECV:50,MSG_SEND_FAIL:51,NOTIFY_RECV:52,NOTIFY_REMOVE:53,DOING_RECV:55};
(function(){
window.gPersistData={SYNC_EVENT_INTERVAL:513,pushEvent:function(_88,_89,_8a,_8b,_8c){
var _8d=(new Date()).getTime();
var _8e=_88+"\n"+_8d;
var res=true;
if(_88==eventType.MSG_SEND||_88==eventType.MSG_RECV){
_8e+="\n"+_89+"\n"+_8a.replace(/\n/g," ")+"\n"+_8b+"\n"+_8c.replace(/\n/g," ");
var _90=persistMap.getMessageSeq()+1;
res=persistMap.setMessage(_90,_8e);
persistMap.setMessageSeq(_90);
}else{
if(_88==eventType.MSG_SEND_FAIL){
_8e+="\n"+_89.fromuin+"\n"+_89.fromuin+"\n"+_89.touin+"\n"+_89.msg_content;
var _90=persistMap.getMessageSeq()+1;
res=persistMap.setMessage(_90,_8e);
persistMap.setMessageSeq(_90);
}else{
if(_88==eventType.NOTIFY_RECV){
_8e+="\n"+_89+"\n"+_8a.replace(/\n/g," ")+"\n"+_8b;
var _90=persistMap.getNotifySeq()+1;
res=persistMap.setNotify(_90,_8e);
persistMap.setNotifySeq(_90);
}else{
if(_88==eventType.DOING_RECV){
var o=_89;
_8e+="\n"+o.sid+"\n"+o.ownerId+"\n"+o.hostId+"\n"+o.name.replace(/\n/g," ")+"\n"+o.head+"\n"+o.content.replace(/\n/g," ");
var _90=persistMap.getNotifySeq()+1;
res=persistMap.setNotify(_90,_8e);
persistMap.setNotifySeq(_90);
}else{
for(var i=1;i<arguments.length;i++){
_8e+="\n"+arguments[i];
}
var _90=persistMap.getControlSeq()+1;
res=persistMap.setControl(_90,_8e);
persistMap.setControlSeq(_90);
}
}
}
}
if(!res){
persistMap.setUsable(false);
imHelper.report("error/pstorage_write_fail"+_88,100);
}
return res;
},parseEvent:function(seq,str){
var e={};
str=str.toString();
var _96=str.split("\n");
e.type=parseInt(_96[0]);
e.timestamp=_96[1];
if(e.type==eventType.MSG_SEND||e.type==eventType.MSG_RECV||e.type==eventType.MSG_SEND_FAIL){
e.fromuin=_96[2];
e.fromname=_96[3];
e.touin=_96[4];
e.msg_content=_96[5];
}else{
if(e.type==eventType.NOTIFY_RECV){
e.touin=_96[2];
e.title=_96[3];
e.content=_96[4];
}else{
if(e.type==eventType.NOTIFY_REMOVE){
e.remove_seq=_96[2];
}else{
if(e.type==eventType.DOING_RECV){
e.sid=_96[2];
e.ownerId=_96[3];
e.hostId=_96[4];
e.name=_96[5];
e.head=_96[6];
e.content=_96[7];
}else{
if(e.type==eventType.SOUND_SWITCH){
var b=parseInt(_96[2]);
if(isNaN(b)){
b=0;
}
e.playSound=b?true:false;
}else{
if(e.type==DELETED_EVENT_TYPE){
}
}
}
}
}
}
e.seq=seq;
return e;
},cloneEvent:function(e){
function clone(o){
for(var i in o){
this[i]=o[i];
}
}
return new clone(e);
},getEventCallback:function(e){
var z=this;
var o=z.cloneEvent(e);
return function(){
z._dispatchEvent(o);
};
},localControlSeq:persistMap.getControlSeq(),localMessageSeq:persistMap.getMessageSeq(),localNotifySeq:persistMap.getNotifySeq(),syncEvent:function(){
if(gConn.pageUnloaded){
window.setTimeout("gPersistData.syncEvent()",this.SYNC_EVENT_INTERVAL);
return;
}
if(!this.started){
this.started=true;
}
if(!imHelper.isLoginUser()){
gConn.connClose();
imui.controller.onSessionOut();
return;
}
if(!persistMap.test()){
imui.controller.onImUnusable();
return;
}
var _9e=0;
var seq=persistMap.getControlSeq();
while(seq>=0&&this.localControlSeq<seq){
if(++_9e>20){
imHelper.report("error/sync_loop_controlseq",100);
break;
}
++this.localControlSeq;
var es=persistMap.getControl(this.localControlSeq);
if(es==null){
imHelper.report("error/null_control",100);
continue;
}
var e=this.parseEvent(this.localControlSeq,es);
var now=(new Date()).getTime();
if(e.timestamp&&e.timestamp-now>5000){
imHelper.report("error/outdated_control",100);
break;
}
setTimeout(this.getEventCallback(e),0);
}
this.localControlSeq=seq;
_9e=0;
seq=persistMap.getMessageSeq();
while(seq>=0&&this.localMessageSeq<seq){
if(++_9e>20){
imHelper.report("error/sync_loop_messageseq",100);
break;
}
++this.localMessageSeq;
var es=persistMap.getMessage(this.localMessageSeq);
if(es==null){
imHelper.report("error/null_message",100);
continue;
}
var e=this.parseEvent(this.localMessageSeq,es);
var now=(new Date()).getTime();
if(e.timestamp&&e.timestamp-now>5000){
imHelper.report("error/outdated_message",100);
break;
}
setTimeout(this.getEventCallback(e),0);
}
this.localMessageSeq=seq;
_9e=0;
seq=persistMap.getNotifySeq();
while(seq>=0&&this.localNotifySeq<seq){
if(++_9e>20){
imHelper.report("error/sync_loop_nofityseq",100);
break;
}
++this.localNotifySeq;
var es=persistMap.getNotify(this.localNotifySeq);
if(es==null){
imHelper.report("error/null_notify",100);
continue;
}
var e=this.parseEvent(this.localNotifySeq,es);
var now=(new Date()).getTime();
if(e.timestamp&&e.timestamp-now>5000){
imHelper.report("error/outdated_notify",100);
break;
}
setTimeout(this.getEventCallback(e),0);
}
this.localNotifySeq=seq;
gPresence.syncPresence();
window.setTimeout("gPersistData.syncEvent()",this.SYNC_EVENT_INTERVAL);
},_dispatchEvent:function(e){
switch(e.type){
case eventType.MSG_SEND:
imui.controller.onSendMessage(e);
break;
case eventType.MSG_RECV:
imui.controller.onRecvMessage(e);
break;
case eventType.MSG_SEND_FAIL:
imui.controller.onSendMessageFail(e);
break;
case eventType.CONN_SUCCESS:
imui.controller.onConnSuccess();
break;
case eventType.CONN_CLOSE:
imui.controller.onConnClose();
break;
case eventType.IM_DISABLE:
imui.controller.onImDisable();
break;
case eventType.IM_ENABLE:
imui.controller.onImEnable();
break;
case eventType.SOUND_SWITCH:
imui.controller.onSoundSwitch(e.playSound);
break;
case eventType.NOTIFY_RECV:
imui.controller.onRecvNotify(e);
break;
case eventType.NOTIFY_REMOVE:
imui.controller.onRecvRemoveNotify(e);
break;
case eventType.DOING_RECV:
imui.TopAdapter.doingNotify(e);
break;
}
}};
})();
(function(){
var _a4=1;
var _a5=2;
var _a6=4;
var _a7=8;
var _a8=16;
persistMap.settings={expire:10*365,setting:27,load:function(){
var v=imHelper.getCookie("wpsetting");
if(v!=null){
this.setting=parseInt(v);
}
return true;
},useIm:function(){
return this.setting&_a4;
},setUseIm:function(b,_ab){
if(b){
this.setting|=_a4;
}else{
this.setting&=~_a4;
}
if(_ab){
imHelper.setCookie("wpsetting",this.setting,this.expire);
}
},playSound:function(){
return this.setting&_a5;
},setPlaySound:function(b,_ad){
if(b){
this.setting|=_a5;
}else{
this.setting&=~_a5;
}
if(_ad){
imHelper.setCookie("wpsetting",this.setting,this.expire);
gPersistData.pushEvent(eventType.SOUND_SWITCH,b?"1":"0");
}
},blistAlwaysVisible:function(){
return this.setting&_a6;
},setBlistAlwaysVisible:function(b,_af){
if(b){
this.setting|=_a6;
}else{
this.setting&=~_a6;
}
if(_af){
imHelper.setCookie("wpsetting",this.setting,this.expire);
}
},storeHistory:function(){
return this.setting&_a7;
},setStoreHistory:function(b,_b1){
if(b){
this.setting|=_a7;
}else{
this.setting&=~_a7;
}
if(_b1){
imHelper.setCookie("wpsetting",this.setting,this.expire);
}
},pushDoing:function(){
return this.setting&_a8;
},setPushDoing:function(b,_b3){
if(b){
this.setting|=_a8;
}else{
this.setting&=~_a8;
}
if(_b3){
imHelper.setCookie("wpsetting",this.setting,this.expire);
}
}};
})();
(function(){
persistMap.notifyHistory={notifies:[],loaded:false,load:function(){
if(this.loaded){
return;
}
this.loaded=true;
if(persistMap.data){
this.notifies=[];
var t=(new Date()).getTime();
var nv=persistMap.data.loadNotifies(persistMap.getNotifySeq());
t=(new Date()).getTime()-t;
if(t>500){
imHelper.report("perfstat/wpt_load_notifies&t="+t,100);
}
for(var i=0;i<nv.length;++i){
var e=gPersistData.parseEvent(nv[i][0],nv[i][1]);
if(e.type==eventType.NOTIFY_RECV){
this.notifies.push(e);
}
}
}
},getNotifyByUin:function(uin){
try{
this.load();
}
catch(e){
return [];
}
var v=[];
for(var i=0;i<this.notifies.length;++i){
if(this.notifies[i].touin==uin){
v.push(this.notifies[i]);
}
}
return v;
},clear:function(){
this.notifies=[];
if(persistMap.data){
var t=(new Date()).getTime();
persistMap.data.clearNotifies();
t=(new Date()).getTime()-t;
if(t>500){
imHelper.report("perfstat/wpt_clear_notifies&t="+t,100);
}
}
}};
})();
(function(){
var _bc=[];
var _bd=false;
function makeIndex(mv){
var uin=imHelper.getLoginUin();
var v=[];
var _c1=0;
for(var i=0;i<mv.length;i++){
var e=gPersistData.parseEvent(mv[i][0],mv[i][1]);
if(e.fromuin==uin||e.touin==uin){
v.push(e);
}
}
return v;
}
persistMap.messageHistory={load:function(){
if(_bd){
return;
}
_bd=true;
if(persistMap.data){
var t=(new Date()).getTime();
var m=persistMap.data.loadMessages(persistMap.getMessageSeq());
t=(new Date()).getTime()-t;
if(t>500){
imHelper.report("perfstat/wpt_load_messages&t="+t,100);
}
_bc=makeIndex(m);
}
},clear:function(){
_bc=[];
if(persistMap.data){
var t=(new Date()).getTime();
persistMap.data.clearMessages();
t=(new Date()).getTime()-t;
if(t>500){
imHelper.report("perfstat/wpt_clear_messages&t="+t,100);
}
}
},getNameByUin:function(uin){
var m=_bc;
for(var i=0;i<m.length;i++){
if(m[i].fromuin==uin){
return m[i].fromname;
}
}
return null;
},getMessageByUin:function(uin){
try{
this.load();
}
catch(e){
return [];
}
var m=_bc;
var v=[];
for(var i=0;i<m.length;i++){
if(m[i].touin==uin||m[i].fromuin==uin){
v.push(m[i]);
}
}
return v;
}};
})();
DESC_SETTING_HEADER="\u804a\u5929\u548c\u63d0\u9192\u8bbe\u7f6e";
DESC_ONLINE_FRIENDS="\u5728\u7ebf\u597d\u53cb(\u5355\u51fb\u5f00\u59cb\u804a\u5929)";
DESC_TALK_TO_FRIENDS="\u4e0e\u597d\u53cb\u804a\u5929";
DESC_PLAY_SOUND=" \u6536\u5230\u65b0\u6d88\u606f\u64ad\u653e\u63d0\u793a\u97f3";
DESC_BLIST_ALWAYS_VISIBLE=" \u4fdd\u6301\u804a\u5929\u597d\u53cb\u5217\u8868\u59cb\u7ec8\u53ef\u89c1";
DESC_STORE_CHAT_HISTROY=" \u4fdd\u7559\u804a\u5929\u548c\u63d0\u9192\u8bb0\u5f55&nbsp";
DESC_CLEAR_HISTORY="\u6e05\u9664";
DESC_CLEAR_HISTORY_FAIL="\u6e05\u9664\u5386\u53f2\u5931\u8d25\uff0c\u5efa\u8bae\u5237\u65b0\u9875\u9762\u91cd\u8bd5";
DESC_CLEAR_HISROTY_SUCCESS="\u6210\u529f\u5220\u9664\u5386\u53f2\u8bb0\u5f55";
DESC_PUSH_DOING=" \u5b9e\u65f6\u63a5\u6536\u597d\u53cb\u72b6\u6001\u66f4\u65b0\u4fe1\u606f";
DESC_NOTIFY_HEADER="\u63d0\u9192";
DESC_WEB_ONLINE_TIP="\u7f51\u9875\u5728\u7ebf";
DESC_CLIENT_ONLINE_TIP=renren?"\u684c\u9762\u7248\u5728\u7ebf":"\u5728\u7ebf";
DESC_OFFLINE_TIP="\u5bf9\u65b9\u4e0d\u5728\u7ebf";
DESC_CLICK_TO_CHAT="\u5355\u51fb\u5f00\u59cb\u804a\u5929";
DESC_HOST_STATUS_ONLINE="\u5df2\u542f\u7528\u804a\u5929\u548c\u63d0\u9192\u529f\u80fd ";
DESC_HOST_STATUS_OFFLINE="\u5df2\u5173\u95ed\u804a\u5929\u548c\u63d0\u9192\u529f\u80fd ";
DESC_HOST_STATUS_CONN_FAIL="\u65e0\u6cd5\u8fde\u63a5\u804a\u5929\u670d\u52a1\u5668 ";
DESC_SET_HOST_STATUS_ONLINE="\u542f\u7528";
DESC_SET_HOST_STATUS_OFFLINE="\u5173\u95ed";
DESC_NO_FRIENDS_ONLINE_TIP="&nbsp;&nbsp;\u65e0\u597d\u53cb\u5728\u7ebf\u3002";
DESC_LOADING_FRIENDS_TIP="&nbsp;&nbsp;\u6b63\u5728\u52a0\u8f7d...";
DESC_HOST_STATUS_NO_SESSION="\u60a8\u7684\u767b\u5f55\u5df2\u5931\u6548\u3002";
DESC_MSG_TOO_LONG="\u6d88\u606f\u592a\u957f\uff0c\u53d1\u9001\u5931\u8d25\u3002";
ROOT_NODE_ID="wpiroot";
window.imui={getSafeClientWidth:function(){
var b=topDoc.body;
var p=b.parentNode;
var _d0=b.clientWidth;
var _d1=p.clientWidth;
if(OS.isIE){
return (_d1==0)?_d0:_d1;
}else{
if(OS.isFirefox){
return (_d1==p.offsetWidth&&_d1==p.scrollWidth)?_d0:_d1;
}
}
return _d0;
},createBgFrame:function(){
var _d2=topDoc.createElement("iframe");
_d2.frameBorder="0";
_d2.scrolling="no";
with(_d2.style){
zIndex="-1";
position="absolute";
border="0px";
opacity=0;
filter="alpha(opacity=\"0\")";
display="block";
}
return _d2;
},getXOffset:function(obj){
var _d4=obj.offsetLeft;
if(obj.offsetParent){
while(obj=obj.offsetParent){
_d4+=obj.offsetLeft;
}
}
return _d4;
}};
imui.chatHeader=function(w){
var hdr=topDoc.createElement("div");
hdr.className="chat-head";
var _d7=topDoc.createElement("div");
_d7.className="head-btn";
var _d8=topDoc.createElement("a");
_d8.href="#nogo";
_d8.className="minimize";
_d8.title="\u6700\u5c0f\u5316";
_d8.onfocus="this.blur();";
var _d9=topDoc.createElement("a");
_d9.href="#nogo";
_d9.className="close";
_d9.title="\u5173\u95ed";
_d9.onfocus="this.blur();";
if(_d8.addEventListener){
_d8.addEventListener("click",this.min_click_fn,true);
_d9.addEventListener("click",this.close_click_fn,true);
}else{
_d8.onclick=this.min_click_fn;
_d9.onclick=this.close_click_fn;
}
_d7.appendChild(_d9);
_d7.appendChild(_d8);
var pic=topDoc.createElement("a");
pic.href="http://"+rootDomain+"/getuser.do?id="+w.touin;
pic.target="_blank";
pic.className="chat-info-pic";
pic.alt=w.toname;
pic.innerHTML="<img src=\""+w.toprofile+"\" /></a>";
var _db=topDoc.createElement("div");
_db.className="head-name";
_db.innerHTML="\u4e0e<a href=\"http://"+rootDomain+"/getuser.do?id="+w.touin+"\" target=\"_blank\">"+w.toname+"</a>\u804a\u5929";
hdr.appendChild(_d7);
hdr.appendChild(pic);
hdr.appendChild(_db);
this.pic=pic;
this.domNode=hdr;
this.domNode.widget=w;
};
imui.chatHeader.prototype.updateProfile=function(){
this.pic.innerHTML="<img src=\""+this.domNode.widget.toprofile+"\" /></a>";
};
imui.chatHeader.prototype.min_click_fn=function(){
var w=this.parentNode.parentNode.widget;
w.focus(false,true);
imui.chatTabs.currentFocus=null;
};
imui.chatHeader.prototype.close_click_fn=function(){
var w=this.parentNode.parentNode.widget;
imui.chatTabs.onCloseWidget(w,true);
};
imui.chatDoing=function(w){
var _df=topDoc.createElement("div");
_df.className="chat-info";
this.widget=w;
this.domNode=_df;
this.updateText();
};
imui.chatDoing.prototype.updateText=function(){
var e=topDoc.createElement("div");
e.innerHTML=this.widget.doing;
var _e1=e.innerHTML;
this.domNode.title=_e1;
if(_e1.length>25){
_e1=_e1.substr(0,23);
_e1+="...";
}
this.domNode.innerHTML="<div class=\"chat-info-status\">"+imHelper.translateFace(_e1)+"</div><br />";
};
imui.chatConv=function(w){
var t=topDoc.createElement("div");
t.className="chat-conv";
this.table=topDoc.createElement("table");
t.appendChild(this.table);
this.domNode=t;
this.domNode.widget=this;
this.widget=w;
this.recvCnt=0;
this.sentCnt=0;
this.msgQueueHead=null;
this.msgQueueTail=null;
this.msgCnt=0;
};
imui.chatConv.prototype.appendNote=function(_e4){
var tr=this.table.insertRow(-1);
var td=tr.insertCell(0);
td.className="visibility-change";
var ts=this.getFormatedTime(new Date());
td.innerHTML="<span class=\"time-stamp\">"+ts+"</span>"+_e4;
this.afterAppend(tr);
};
imui.chatConv.prototype.extendInt=function(i){
if(i>=0&&i<10){
return "0"+i;
}
return i;
};
imui.chatConv.prototype.getFormatedTime=function(d){
return this.extendInt(d.getMonth()+1)+"-"+this.extendInt(d.getDate())+" "+this.extendInt(d.getHours())+":"+this.extendInt(d.getMinutes())+":"+this.extendInt(d.getSeconds());
};
imui.chatConv.prototype.addImAd=function(){
if(!renren){
return;
}
var tr=this.table.insertRow(0);
var td=tr.insertCell(0);
td.innerHTML="<div class=\"dlxnt\">"+"<a title=\"\u5173\u95ed\" href=\"#nogo\" class=\"x-to-hide\" style=\"float:right;margin-top:2px;\"/>"+"<p><a href=\"http://im.renren.com/desktop/ver18/rrsetup.exe?ref=wp&c=chatbox2\" class=\"dlink\" style=\"background: transparent url(http://s.xnimg.cn/imgpro/chat/dlbtn.png) no-repeat scroll 0pt center; "+"display: inline-block; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial; padding-left: 20px;\""+" target=\"_blank\">\u70b9\u51fb\u4e0b\u8f7d</a>\u7545\u5feb\u804a\u5929\uff0c\u7528\u4eba\u4eba\u684c\u9762\uff01"+"<span class=\"twf\" style=\"\">\u5feb\u901f\u56de\u590d\u65b0\u9c9c\u4e8b\uff0c\u72b6\u6001\u53d8\u6210\u201c\u804a\u5929\u5ba4\u201d\uff01</span>"+"</p>"+"</div>";
this.imAd=tr;
var _ec=td.firstChild.firstChild;
var _ed=this;
if(_ec.addEventListener){
_ec.addEventListener("click",function(){
_ed.closeImAd();
},false);
}else{
_ec.onclick=function(){
_ed.closeImAd();
};
}
};
imui.chatConv.prototype.closeImAd=function(){
this.table.deleteRow(this.imAd.rowIndex);
};
imui.chatConv.prototype.createMessageDom=function(msg){
var p=topDoc.createElement("p");
var _f0=imHelper.escapeHTML(msg.msg_content);
_f0=imHelper.translateLink(_f0);
p.innerHTML=imHelper.translateFace(_f0);
if(p.innerHTML.replace(/\s/g,"").length==0){
p.innerHTML="&nbsp;";
}
var _f1=imHelper.getLoginUin();
if(msg.fromuin==_f1){
if(msg.type==eventType.MSG_SEND_FAIL){
p.className="send-error";
}else{
p.className="p-self";
}
}else{
if(msg.touin==_f1){
p.className="p-other";
}else{
return null;
}
}
return p;
};
imui.chatConv.prototype.isShown=function(seq){
if(typeof this.firstSeq=="undefined"||this.firstSeq<0){
return false;
}
if(this.firstSeq<=this.lastSeq){
return seq>=this.firstSeq&&seq<=this.lastSeq;
}
return seq>=this.firstSeq||seq<=this.lastSeq;
};
imui.chatConv.prototype.loadHistory=function(){
if(this.loaded){
return;
}
this.loaded=true;
this.addImAd();
if(!persistMap.settings.storeHistory()){
return;
}
var v=persistMap.messageHistory.getMessageByUin(this.widget.touin);
for(var i=0;i<v.length;++i){
if(!this.isShown(v[i].seq)){
this.appendHistoryMsg(v[i]);
}
}
};
imui.chatConv.prototype.appendHistoryMsg=function(msg){
if(!msg||!msg.msg_content||msg.msg_content=="undefined"){
return;
}
var tr=this.table.insertRow(0);
var td=tr.insertCell(0);
var _f8=imHelper.getLoginUin();
var ts=this.getFormatedTime(new Date(parseInt(msg.timestamp)));
if(msg.fromuin==_f8){
td.innerHTML="<h5 class=\"self\"><span class=\"time-stamp\" title=\""+msg.seq+"\">"+ts+"</span>"+hostName+"</h5>";
}else{
if(msg.touin==_f8){
td.innerHTML="<h5 class=\"other\"><span class=\"time-stamp\" title=\""+msg.seq+"\">"+ts+"</span><a href=\"http://"+rootDomain+"/getuser.do?id="+this.widget.touin+"\" target=\"_blank\">"+this.widget.toname+"</a></h5>";
}else{
return;
}
}
var p=this.createMessageDom(msg);
if(p){
p.title=msg.seq;
td.appendChild(p);
this.msgCnt++;
this.afterAppend(tr);
}
};
imui.chatConv.prototype.append=function(msg){
if(!msg||!msg.msg_content||msg.msg_content=="undefined"){
imHelper.reportChat("error/undef_recv",100);
return;
}
var tr=this.table.insertRow(-1);
var td=tr.insertCell(0);
var _fe=imHelper.getLoginUin();
var ts=this.getFormatedTime(new Date(parseInt(msg.timestamp)));
if(msg.fromuin==_fe){
td.innerHTML="<h5 class=\"self\"><span class=\"time-stamp\" title=\""+msg.seq+"\">"+ts+"</span>"+hostName+"</h5>";
++this.sentCnt;
if(this.recvCnt>0){
if(this.sentCnt==1){
imHelper.reportChat("chatstat/mutual_init_sent&"+this.recvCnt+"&"+this.sentCnt,1);
}else{
imHelper.reportChat("chatstat/mutual_sent&"+this.recvCnt+"&"+this.sentCnt,1);
}
}else{
imHelper.reportChat("chatstat/single_sent&"+this.recvCnt+"&"+this.sentCnt,1);
}
}else{
if(msg.touin==_fe){
td.innerHTML="<h5 class=\"other\"><span class=\"time-stamp\" title=\""+msg.seq+"\">"+ts+"</span><a href=\"http://"+rootDomain+"/getuser.do?id="+this.widget.touin+"\" target=\"_blank\">"+this.widget.toname+"</a></h5>";
++this.recvCnt;
if(this.sentCnt>0){
if(this.recvCnt==1){
imHelper.reportChat("chatstat/mutual_init_recv&"+this.recvCnt+"&"+this.sentCnt,1);
}else{
imHelper.reportChat("chatstat/mutual_recv&"+this.recvCnt+"&"+this.sentCnt,1);
}
}else{
imHelper.reportChat("chatstat/single_recv&"+this.recvCnt+"&"+this.sentCnt,1);
}
}else{
imHelper.report("error/parse_"+_fe+"_"+msg.fromuin+"_"+msg.touin,10);
return;
}
}
var p=this.createMessageDom(msg);
if(p){
if(!this.firstSeq){
this.firstSeq=msg.seq;
}
this.lastSeq=msg.seq;
td.appendChild(p);
this.msgCnt++;
this.afterAppend(tr);
}
};
imui.chatConv.prototype.afterAppend=function(tr){
if(!this.msgQueueHead){
this.msgQueueHead=tr;
this.msgQueueTail=tr;
}else{
this.msgQueueTail.nextMessage=tr;
this.msgQueueTail=tr;
if(this.msgCnt>50){
var p=this.msgQueueHead;
this.msgQueueHead=p.nextMessage;
this.table.deleteRow(0);
this.msgCnt--;
}
}
this.domNode.scrollTop=this.domNode.scrollHeight;
};
imui.chatEditor=function(w){
var _104=topDoc.createElement("div");
_104.className="chat-input";
var t=topDoc.createElement("input");
t.type="text";
t.className="chat-shadow-input gray-text";
t.widget=w;
t.value="\u8f93\u5165\u804a\u5929\u5185\u5bb9";
this.input=t;
_104.appendChild(t);
this.widget=w;
this.domNode=_104;
this.domNode.widget=this;
if(t.addEventListener){
t.addEventListener("keydown",this.key_fn,false);
t.addEventListener("click",this.click_fn,false);
}else{
t.onkeydown=this.key_fn;
t.onclick=this.click_fn;
}
};
imui.chatEditor.prototype.disable=function(b){
this.input.disabled=b;
};
imui.chatEditor.prototype.click_fn=function(e){
if(this.className=="chat-shadow-input gray-text"){
this.value="";
this.className="chat-shadow-input";
}
};
imui.chatEditor.prototype.key_fn=function(e){
if(this.className=="chat-shadow-input gray-text"){
this.value="";
this.className="chat-shadow-input";
}
if(!e){
e=top.event;
}
if(e.keyCode==13){
if(hostName&&hostName!=""){
this.widget.send.click_fn();
}
return false;
}
return true;
};
imui.chatEditor.prototype.focus=function(b){
if(b){
if(!this.input.disabled){
this.input.focus();
}
}
};
imui.chatSend=function(w){
var btn=topDoc.createElement("input");
btn.type="button";
btn.className="input-button";
btn.widget=w;
btn.value="\u53d1\u9001";
this.send=btn;
this.widget=w;
this.domNode=btn;
this.domNode.widget=this;
if(btn.addEventListener){
btn.addEventListener("click",this.click_fn,false);
}else{
btn.onclick=this.click_fn;
}
};
imui.chatSend.prototype.click_fn=function(){
var wid=this.widget.widget;
if(!wid){
wid=this.widget;
}
var _10d=wid.editor.input;
if(!_10d||_10d.value.length<=0){
return false;
}
if(_10d.className=="chat-shadow-input gray-text"){
_10d.className=="chat-shadow-input";
_10d.value="";
return false;
}
var _10e=256;
if(_10d.value.length<=0||_10d.value.length>_10e){
var e={};
e.fromuin=imHelper.getLoginUin();
e.fromname=e.fromuin;
e.touin=wid.touin;
e.msg_content=DESC_MSG_TOO_LONG;
imui.controller.onInputMessageFail(e);
return false;
}
try{
var e={};
e.fromuin=imHelper.getLoginUin();
e.fromname=hostName;
e.touin=wid.touin;
e.msg_content=_10d.value;
imui.controller.onInputMessage(e);
}
catch(ex){
}
_10d.value="";
_10d.focus(true);
return true;
};
imui.chatTab=function(w){
this.widget=w;
var _111=topDoc.createElement("div");
_111.className="x";
_111.onfocus="this.blur();";
var _112=topDoc.createElement("div");
_112.className="chattab-name";
var name=topDoc.createElement("span");
if(w.onlineStatus&4){
name.className="imonline";
name.title=DESC_CLIENT_ONLINE_TIP;
}else{
if(w.onlineStatus>0){
name.className="online";
name.title=DESC_WEB_ONLINE_TIP;
}else{
name.className="offline";
name.title=DESC_OFFLINE_TIP;
}
}
name.innerHTML=w.toname;
_112.appendChild(name);
this.newMsgCntDiv=topDoc.createElement("div");
this.newMsgCntDiv.className="m-chat-msgcount hide";
if(_111.addEventListener){
_111.addEventListener("click",this.close_click_fn,true);
_112.addEventListener("click",this.name_click_fn,true);
_112.addEventListener("mouseover",this.name_mouseover_fn,true);
_112.addEventListener("mouseout",this.name_mouseout_fn,true);
this.newMsgCntDiv.addEventListener("click",this.count_click_fn,true);
}else{
_111.onclick=this.close_click_fn;
_112.onclick=this.name_click_fn;
_112.onmouseover=this.name_mouseover_fn;
_112.onmouseout=this.name_mouseout_fn;
this.newMsgCntDiv.onclick=this.count_click_fn;
}
this.close=_111;
this.close.widget=this;
this.nameDiv=_112;
this.nameDiv.widget=this;
this.newMsgCntDiv.widget=this;
};
imui.chatTab.prototype.close_click_fn=function(){
var w=this.widget.widget;
imui.chatTabs.onCloseWidget(w,true);
};
imui.chatTab.prototype.name_mouseover_fn=function(){
var w=this.widget.widget;
if(w.active){
return;
}
if(w.highlight){
return;
}
this.parentNode.className="m-chat-button-chattab m-chat-button-hover";
};
imui.chatTab.prototype.name_mouseout_fn=function(){
var w=this.widget.widget;
if(w.active){
return;
}
if(w.highlight){
return;
}
this.parentNode.className="m-chat-button-chattab";
};
imui.chatTab.prototype.name_click_fn=function(){
var w=this.widget.widget;
if(w.active){
w.focus(false,true);
imui.chatTabs.currentFocus=null;
}else{
imui.chatTabs.switchFocus(w,true);
w.editor.focus();
}
};
imui.chatTab.prototype.count_click_fn=function(){
var w=this.widget.widget;
w.focus(true,true);
};
imui.chatTab.prototype.focus=function(b){
};
imui.chatWidget=function(_11a,_11b,_11c,_11d,_11e){
this.touin=_11a;
this.toname=_11b;
if(!_11d||_11d.length<=0){
_11d="[\u4e0e"+_11b+"\u804a\u5929\u4e2d]";
}
this.doing=_11d;
if(!_11c||_11c.length==0){
this.toprofile="http://head.xiaonei.com/photos/0/0/men_tiny.gif";
this.hasBuddyInfo=false;
this.onlineStatus=2;
}else{
this.toprofile=_11c;
this.hasBuddyInfo=true;
this.onlineStatus=_11e;
}
this.highlight=false;
this.active=false;
this.header=new imui.chatHeader(this);
this.doingBar=new imui.chatDoing(this);
this.conv=new imui.chatConv(this);
this.editor=new imui.chatEditor(this);
this.send=new imui.chatSend(this);
this.tab=new imui.chatTab(this);
this.createDomNode(_11a);
};
imui.chatWidget.prototype.setHostOnline=function(_11f){
var e=this.tab.nameDiv.firstChild;
if(!_11f){
this.onlineStatus=-1;
e.className="offline";
e.title=DESC_HOST_STATUS_ONLINE;
}
};
imui.chatWidget.prototype.setOnline=function(_121){
if(this.hasBuddyInfo&&this.onlineStatus==_121){
return;
}
if(!this.hasBuddyInfo){
var info=imui.utilTabs.friends.getInfo(this.touin);
if(info){
if(info.tiny.length>0){
this.hasBuddyInfo=true;
this.toprofile=info.tiny;
this.doing=info.doing;
this.header.updateProfile();
this.doingBar.updateText();
this.positionBgFrame();
}
}
}
var e=this.tab.nameDiv.firstChild;
if(_121&4){
e.className="imonline";
e.title=DESC_CLIENT_ONLINE_TIP;
}else{
if(_121>0){
e.className="online";
e.title=DESC_WEB_ONLINE_TIP;
}else{
e.className="offline";
e.title=DESC_OFFLINE_TIP;
}
}
this.onlineStatus=_121;
};
imui.chatWidget.prototype.positionBgFrame=function(){
var ifrm=this.bgFrame;
var h=this.window.offsetHeight;
ifrm.style.height=h+"px";
ifrm.style.marginTop="-"+h+"px";
};
imui.chatWidget.prototype.focus=function(b,sync){
if(b){
this.conv.loadHistory();
if(!this.hasBuddyInfo){
var info=imui.utilTabs.friends.getInfo(this.touin);
if(info){
if(info.tiny.length>0){
this.hasBuddyInfo=true;
this.toprofile=info.tiny;
this.doing=info.doing;
this.header.updateProfile();
this.doingBar.updateText();
}
}
}
this.tab.newMsgCntDiv.className="m-chat-msgcount hide";
this.window.className="m-chat-window";
this.domNode.className="m-chat-button-chattab m-chat-button-active";
this.conv.domNode.scrollTop=this.conv.domNode.scrollHeight;
if(OS.isIE){
if(sync){
this.editor.focus(true);
}
}else{
this.editor.focus(true);
}
this.positionBgFrame();
this.clearHighlight();
}else{
this.window.className="m-chat-window hide";
this.domNode.className="m-chat-button-chattab";
}
this.active=b;
this.highlight=false;
if(sync){
gPresence.updatePresence(this.touin,b?2:1,0,this.toname,0);
}
};
imui.chatWidget.prototype.clearHighlight=function(){
if(this.highlight){
gPresence.updatePresence(this.touin,-1,-1,this.toname,0);
imui.tabBar.bTitleFlash=false;
}
};
imui.chatWidget.prototype.appendMsg=function(msg){
if(!msg){
return;
}
this.conv.append(msg);
if(this.active){
return;
}
imui.controller.incrementNewMsg(this.touin,this.toname);
if(!imui.tabBar.bTitleFlash){
imui.tabBar.bTitleFlash=true;
imui.tabBar.flashTitle(2);
}
};
imui.chatWidget.prototype.setNewMsgCnt=function(cnt){
if(this.active){
return;
}
this.domNode.className="m-chat-button-chattab uhavemsg";
this.highlight=true;
if(cnt>99){
cnt=99;
}
if(cnt>0){
this.tab.newMsgCntDiv.innerHTML=cnt;
this.tab.newMsgCntDiv.className="m-chat-msgcount";
}
};
imui.chatWidget.prototype.createDomNode=function(to){
var node=topDoc.createElement("div");
node.className="m-chat-button-chattab";
var w=topDoc.createElement("div");
w.className="m-chat-window hide";
w.appendChild(this.header.domNode);
w.appendChild(this.doingBar.domNode);
w.appendChild(this.conv.domNode);
w.appendChild(this.editor.domNode);
this.editor.domNode.appendChild(this.send.domNode);
node.appendChild(this.tab.close);
node.appendChild(this.tab.nameDiv);
node.appendChild(this.tab.newMsgCntDiv);
node.appendChild(w);
var ifrm=imui.createBgFrame();
ifrm.style.width="228px";
ifrm.style.marginLeft="-1px";
w.appendChild(ifrm);
this.bgFrame=ifrm;
this.window=w;
this.domNode=node;
this.window.widget=this;
this.domNode.widget=this;
};
imui.settingOnlineSwitch=function(){
this.domNode=topDoc.createElement("div");
this.domNode.className="ifonline offline";
this.domNode.widget=this;
this.statusDesc=topDoc.createElement("span");
this.statusDesc.style.color="#333";
this.setStatus=topDoc.createElement("a");
this.setStatus.style.color="#005EAC";
this.setStatus.href="#nogo";
var This=this;
var _130=function(){
This.toggleHostOnline();
};
if(this.setStatus.addEventListener){
this.setStatus.addEventListener("click",_130,true);
}else{
this.setStatus.onclick=_130;
}
this.domNode.appendChild(this.statusDesc);
this.domNode.appendChild(this.setStatus);
if(imui.tabBar.hostOnline){
this.domNode.className="ifonline online";
this.statusDesc.innerHTML=DESC_HOST_STATUS_ONLINE;
this.setStatus.innerHTML=DESC_SET_HOST_STATUS_OFFLINE;
}else{
this.domNode.className="ifonline offline";
if(persistMap.settings.useIm()){
this.setConnFailed();
}else{
this.statusDesc.innerHTML=DESC_HOST_STATUS_OFFLINE;
this.setStatus.innerHTML=DESC_SET_HOST_STATUS_ONLINE;
}
}
};
imui.settingOnlineSwitch.prototype.toggleHostOnline=function(){
persistMap.settings.setUseIm(!imui.tabBar.hostOnline,true);
if(!imui.tabBar.hostOnline){
this.statusDesc.innerHTML="\u6b63\u5728\u8fde\u63a5... ";
this.setStatus.innerHTML="";
}
imui.controller.onToggleConn();
};
imui.settingOnlineSwitch.prototype.setNoSession=function(){
this.statusDesc.innerHTML=DESC_HOST_STATUS_NO_SESSION+" <a href=\"#\" onclick=\"top.location.reload(false);\">\u5237\u65b0</a>";
this.setStatus.innerHTML="";
};
imui.settingOnlineSwitch.prototype.setConnFailed=function(){
this.statusDesc.innerHTML=DESC_HOST_STATUS_CONN_FAIL;
this.setStatus.innerHTML="\u91cd\u8bd5";
};
imui.settingOnlineSwitch.prototype.setHostOnline=function(b){
if(b){
this.domNode.className="ifonline online";
this.statusDesc.innerHTML=DESC_HOST_STATUS_ONLINE;
this.setStatus.innerHTML=DESC_SET_HOST_STATUS_OFFLINE;
imui.tabBar.refreshOnlineStatus();
}else{
this.domNode.className="ifonline offline";
if(persistMap.settings.useIm()){
this.setConnFailed();
}else{
this.statusDesc.innerHTML=DESC_HOST_STATUS_OFFLINE;
this.setStatus.innerHTML=DESC_SET_HOST_STATUS_ONLINE;
}
}
};
imui.settingWidget=function(){
this.active=false;
this.header=new imui.buddyHeader(this,DESC_SETTING_HEADER);
this.createDomNode();
this.createConv();
this.window.appendChild(this.header.domNode);
this.window.appendChild(this.conv);
};
imui.settingWidget.prototype.createConv=function(){
this.conv=topDoc.createElement("div");
this.conv.className="chat-conv";
var opts=topDoc.createElement("div");
opts.className="setoption";
var _133=topDoc.createElement("table");
_133.className="optionlist";
opts.appendChild(_133);
this.conv.appendChild(opts);
var tr=_133.insertRow(-1);
var td=tr.insertCell(0);
td.className="checkboxitem";
td.innerHTML="<input type=\"checkbox\" /><span style=\"color:#333;\">"+DESC_PLAY_SOUND+"</span>";
var _136=td.firstChild;
_136.checked=persistMap.settings.playSound();
this.ckSound=_136;
var _137=function(){
persistMap.settings.setPlaySound(!persistMap.settings.playSound(),true);
};
tr=_133.insertRow(-1);
td=tr.insertCell(0);
td.innerHTML="<input type=\"checkbox\" /><span style=\"color:#333;\">"+DESC_BLIST_ALWAYS_VISIBLE+"</span>";
var _138=td.firstChild;
_138.checked=persistMap.settings.blistAlwaysVisible();
this.ckBlist=_138;
var _139=function(){
persistMap.settings.setBlistAlwaysVisible(!persistMap.settings.blistAlwaysVisible(),true);
};
tr=_133.insertRow(-1);
td=tr.insertCell(0);
td.innerHTML="<input type=\"checkbox\" /><span style=\"color:#333;\">"+DESC_STORE_CHAT_HISTROY+"</span>";
var _13a=topDoc.createElement("a");
_13a.innerHTML=DESC_CLEAR_HISTORY;
_13a.style.color="#005EAC";
_13a.href="#nogo";
td.appendChild(_13a);
this.ckStoreHistory=td.firstChild;
this.ckStoreHistory.checked=persistMap.settings.storeHistory();
var _13b=function(){
persistMap.settings.setStoreHistory(!persistMap.settings.storeHistory(),true);
};
var _13c=function(){
try{
imui.utilTabs.notify.conv.domNode.innerHTML="<div class=\"notifyitem\">&nbsp;\u65e0\u65b0\u63d0\u9192\u3002<div>";
persistMap.notifyHistory.clear();
}
catch(e){
top.XN.DO.showError(DESC_CLEAR_HISTORY_FAIL);
return;
}
try{
persistMap.messageHistory.clear();
}
catch(e){
top.XN.DO.showError(DESC_CLEAR_HISTORY_FAIL);
return;
}
top.XN.DO.showMessage(DESC_CLEAR_HISROTY_SUCCESS);
};
if(_136.addEventListener){
_136.addEventListener("click",_137,true);
_138.addEventListener("click",_139,true);
this.ckStoreHistory.addEventListener("click",_13b,true);
_13a.addEventListener("click",_13c,true);
}else{
_136.onclick=_137;
_138.onclick=_139;
this.ckStoreHistory.onclick=_13b;
_13a.onclick=_13c;
}
this.onlineSwitch=new imui.settingOnlineSwitch();
this.conv.appendChild(this.onlineSwitch.domNode);
};
imui.settingWidget.prototype.setNoSession=function(){
this.onlineSwitch.setNoSession();
};
imui.settingWidget.prototype.createDomNode=function(){
var node=topDoc.createElement("div");
if(imui.tabBar.hostOnline){
node.className="m-chat-button-status";
}else{
node.className="m-chat-button-status offline";
}
var w=topDoc.createElement("div");
w.className="m-chat-window status-control hide";
var ifrm=imui.createBgFrame();
ifrm.style.width="203px";
ifrm.style.marginLeft="-1px";
ifrm.style.marginTop="-1px";
w.appendChild(ifrm);
this.bgFrame=ifrm;
node.appendChild(w);
this.window=w;
this.domNode=node;
this.window.widget=this;
this.domNode.widget=this;
var t=topDoc.createElement("div");
t.className="chattip hide";
t.innerHTML="<div class=\"chattip-content\">\u8bbe\u7f6e</div><div class=\"chattip-for\"></div>";
this.widgetTip=t;
this.domNode.appendChild(t);
var _141=function(e){
var w=this.widget;
if(w.active){
return;
}
w.widgetTip.className="chattip";
if(imui.tabBar.hostOnline){
w.domNode.className="m-chat-button-status m-chat-button-hover";
}else{
w.domNode.className="m-chat-button-status m-chat-button-hover offline";
}
};
var _144=function(e){
var w=this.widget;
if(w.active){
return;
}
w.widgetTip.className="chattip hide";
if(imui.tabBar.hostOnline){
w.domNode.className="m-chat-button-status";
}else{
w.domNode.className="m-chat-button-status offline";
}
};
if(node.addEventListener){
node.addEventListener("mouseout",_144,true);
node.addEventListener("mouseover",_141,true);
}else{
node.onmouseout=_144;
node.onmouseover=_141;
}
};
imui.settingWidget.prototype.clickHide=function(e){
var o;
if(e){
o=e.target;
}else{
o=top.event.srcElement;
}
if(o==this.domNode){
this.focus(!this.active);
return;
}
while(o){
if(o==this.domNode){
return;
}
o=o.parentNode;
}
if(this.active){
this.focus(false);
}
};
imui.settingWidget.prototype.focus=function(b,_14a){
if(this.active==b){
return;
}
this.widgetTip.className="chattip hide";
if(b){
if(imui.tabBar.hostOnline){
this.domNode.className="m-chat-button-status m-chat-button-active";
}else{
this.domNode.className="m-chat-button-status m-chat-button-active offline";
}
this.window.className="m-chat-window status-control";
imui.utilTabs.friends.focus(false);
imui.utilTabs.notify.focus(false);
this.bgFrame.style.height=this.window.offsetHeight+"px";
}else{
if(imui.tabBar.hostOnline){
this.domNode.className="m-chat-button-status";
}else{
this.domNode.className="m-chat-button-status offline";
}
this.window.className="m-chat-window status-control hide";
}
this.active=b;
if(!_14a){
gPresence.updatePresence(SETTING_WIDGET_BIT,b);
}
};
imui.settingWidget.prototype.setHostOnline=function(b){
if(b){
if(this.active){
this.domNode.className="m-chat-button-status m-chat-button-active";
}else{
this.domNode.className="m-chat-button-status";
}
}else{
if(this.active){
this.domNode.className="m-chat-button-status m-chat-button-active offline";
}else{
this.domNode.className="m-chat-button-status offline";
}
}
this.onlineSwitch.setHostOnline(b);
};
imui.buddyHeader=function(w,_14d){
var hdr=topDoc.createElement("div");
hdr.className="chat-head";
var _14f=topDoc.createElement("div");
_14f.className="head-btn";
var _150=topDoc.createElement("a");
_150.href="#nogo";
_150.className="minimize";
_150.onfocus="this.blur();";
var _151=function(){
var w=this.parentNode.parentNode.widget;
w.focus(false);
};
if(_150.addEventListener){
_150.addEventListener("click",_151,true);
}else{
_150.onclick=_151;
}
_14f.appendChild(_150);
var _153=topDoc.createElement("div");
_153.className="head-name";
_153.innerHTML=_14d;
hdr.appendChild(_14f);
hdr.appendChild(_153);
this.domNode=hdr;
this.domNode.widget=w;
};
imui.buddyConv=function(w){
var t=topDoc.createElement("div");
t.className="chat-conv";
this.table=topDoc.createElement("table");
t.appendChild(this.table);
this.domNode=t;
this.domNode.widget=this;
this.widget=w;
};
imui.buddyConv.prototype.setNoFriends=function(_156){
if(this.table.rows.length>0){
return;
}
var tr=this.table.insertRow(-1);
var td=tr.insertCell(0);
td.className="buddy-list-item available";
td.innerHTML=_156?DESC_LOADING_FRIENDS_TIP:DESC_NO_FRIENDS_ONLINE_TIP;
};
imui.buddyConv.prototype.append=function(_159){
var tr=this.table.insertRow(-1);
var td=tr.insertCell(0);
td.className="buddy-list-item available";
var a=topDoc.createElement("a");
a.className="clearfix";
a.href="#nogo";
a.user_info=_159;
var _15d=function(){
var f=this.user_info;
var w=imui.chatTabs.onActivateWidget(f.id,f.name,f.tiny,f.doing,f.status);
if(w){
imui.chatTabs.switchFocus(w,true);
}
};
if(a.addEventListener){
a.addEventListener("click",_15d,false);
}else{
a.onclick=_15d;
}
var html;
if(_159.status&4){
html="<span class=\"im-available-dot\" title=\""+DESC_CLIENT_ONLINE_TIP+"\"></span>";
}else{
html="<span class=\"available-dot\" title=\""+DESC_WEB_ONLINE_TIP+"\"></span>";
}
if(this.widget.imageLoaded){
html+="<span class=\"friendico\"><img src=\""+_159.tiny+"\"/></span><span class=\"buddy-list-item-name\" title=\""+DESC_CLICK_TO_CHAT+"\">"+_159.name+"</span>";
a.innerHTML=html;
td.appendChild(a);
}else{
html+="<span class=\"friendico\"></span><span class=\"buddy-list-item-name\" title=\""+_159.doing+"\">"+_159.name+"</span>";
a.innerHTML=html;
td.appendChild(a);
tr.tinyHeader=a.firstChild.nextSibling;
tr.tinyUrl=_159.tiny;
}
};
imui.buddyConv.prototype.loadImage=function(){
if(this.widget.imageLoaded){
return;
}
var rows=this.table.rows;
for(var i=0;i<rows.length;i++){
var tr=rows[i];
if(tr.tinyUrl){
tr.tinyHeader.innerHTML="<img src=\""+tr.tinyUrl+"\"/>";
tr.tinyUrl=null;
}
}
this.widget.imageLoaded=true;
};
imui.buddyTab=function(w){
var name=topDoc.createElement("span");
name.innerHTML="<span style=\"color:#333;\">"+DESC_TALK_TO_FRIENDS+" (<strong>0</strong>)</span>";
var _166=function(){
var w=this.widget;
if(w.active){
return;
}
this.parentNode.className="m-chat-button-onlinefriends m-chat-button-hover";
};
var _168=function(){
var w=this.widget;
if(w.active){
return;
}
this.parentNode.className="m-chat-button-onlinefriends";
};
var _16a=function(){
var w=this.widget;
if(w.active){
w.focus(false);
}else{
w.focus(true);
}
};
if(name.addEventListener){
name.addEventListener("mouseout",_168,true);
name.addEventListener("mouseover",_166,true);
name.addEventListener("click",_16a,true);
}else{
name.onmouseout=_168;
name.onmouseover=_166;
name.onclick=_16a;
}
this.domNode=name;
this.domNode.widget=w;
};
imui.buddyTab.prototype.setOnlineCount=function(cnt){
this.domNode.innerHTML="<span style=\"color:#333;\">"+DESC_TALK_TO_FRIENDS+" (<strong>"+cnt+"</strong>)</span>";
};
imui.buddySearch=function(w){
var dv=topDoc.createElement("div");
dv.className="sortholder";
dv.innerHTML="<span class=\"sorticon\"/>";
var e=topDoc.createElement("input");
e.widget=w;
e.value="\u67e5\u627e\u597d\u53cb";
e.className="input-text gray-text";
var _170=function(e){
if(this.className=="input-text gray-text"){
this.value="";
this.className="input-text";
}
};
var _172=function(e){
if(this.value==0){
this.value="\u67e5\u627e\u597d\u53cb";
this.className="input-text gray-text";
}
};
var _174=function(e){
if(!e){
e=top.event;
}
var wid=this.widget;
wid.showBuddyInfo(this.value);
if(this.value.length>0){
wid.search.cancelBtn.className="cancel";
}else{
wid.search.cancelBtn.className="cancel hide";
}
};
var b=topDoc.createElement("button");
b.className="cancel hide";
b.title="\u53d6\u6d88";
b.widget=w;
var _178=function(e){
var w=this.widget;
w.showBuddyInfo("");
w.search.showCancelBtn(false);
};
if(b.addEventListener){
b.addEventListener("click",_178,true);
e.addEventListener("focus",_170,true);
e.addEventListener("keyup",_174,true);
e.addEventListener("blur",_172,true);
}else{
b.onclick=_178;
e.onfocus=_170;
e.onkeyup=_174;
e.onblur=_172;
}
dv.appendChild(e);
dv.appendChild(b);
this.cancelBtn=b;
this.keyInput=e;
this.domNode=dv;
};
imui.buddySearch.prototype.showCancelBtn=function(b){
if(b){
this.cancelBtn.className="cancel";
}else{
this.cancelBtn.className="cancel hide";
this.keyInput.className="input-text gray-text";
this.keyInput.value="\u67e5\u627e\u597d\u53cb";
}
};
imui.buddySearch.prototype.focus=function(b){
if(b){
this.keyInput.focus();
}
};
MIN_BUDDY_REFRESH_INTERVAL=10000;
imui.buddyWidget=function(){
this.hostid=null;
this.hostname=null;
this.onlineFriendsCnt=0;
this.active=false;
this.buddyList=[];
this.refreshTime=0;
this.imageLoaded=false;
this.domNode=topDoc.createElement("div");
this.domNode.className="m-chat-button-onlinefriends";
var w=topDoc.createElement("div");
w.className="m-chat-window buddy-list hide";
this.header=new imui.buddyHeader(this,DESC_ONLINE_FRIENDS);
this.search=new imui.buddySearch(this);
this.conv=new imui.buddyConv(this);
var ifrm=imui.createBgFrame();
ifrm.style.width="203px";
ifrm.style.marginLeft="-1px";
ifrm.style.marginTop="-1px";
w.appendChild(ifrm);
w.appendChild(this.header.domNode);
w.appendChild(this.search.domNode);
w.appendChild(this.conv.domNode);
this.tab=new imui.buddyTab(this);
this.domNode.appendChild(this.tab.domNode);
this.domNode.appendChild(w);
this.bgFrame=ifrm;
this.domNode.widget=this;
this.window=w;
this.searchKey=null;
this.leftMarginRemended=false;
};
imui.buddyWidget.prototype.positionBgFrame=function(){
var ifrm=this.bgFrame;
var h=this.window.offsetHeight;
ifrm.style.height=h+"px";
};
imui.buddyWidget.prototype.clearSearch=function(){
if(this.searchKey&&this.searchKey.length>0){
this.showBuddyInfo("");
this.search.showCancelBtn(false);
}
};
imui.buddyWidget.prototype.hideNotice=function(b){
this.window.removeChild(this.notice);
};
imui.buddyWidget.prototype.setHostOnline=function(b){
if(b){
if(!this.newlyOnline){
this.refetchBuddies(false);
this.newlyOnline=true;
}
}
this.focus(false);
};
imui.buddyWidget.prototype.getToprofile=function(uin){
for(var i=0;i<this.buddyList.length;i++){
if(this.buddyList[i].id==uin){
return this.buddyList[i].tiny;
}
}
return null;
};
imui.buddyWidget.prototype.getOnlineStatus=function(uin){
for(var i=0;i<this.buddyList.length;i++){
if(this.buddyList[i].id==uin){
return this.buddyList[i].status;
}
}
return 0;
};
imui.buddyWidget.prototype.getInfo=function(uin){
for(var i=0;i<this.buddyList.length;i++){
if(this.buddyList[i].id==uin){
return this.buddyList[i];
}
}
return null;
};
imui.buddyWidget.prototype.refetchBuddies=function(deep){
if(this.buddyLoading){
return;
}
if(!imui.tabBar.hostOnline){
return;
}
if(!imui.utilTabs.friends){
return;
}
if(this.onlineFriendsCnt==0||this.buddyList.length>0){
if((new Date()).getTime()-this.refreshTime<MIN_BUDDY_REFRESH_INTERVAL){
return;
}
}
var xhr=this._xhr;
if(!xhr){
xhr=imHelper.getXhr();
this._xhr=xhr;
}
if(!xhr){
return;
}
var t=imHelper.getLoginUin();
if(deep){
xhr.open("GET","/getonlinefriends.do?"+t,true);
}else{
xhr.open("GET","/getonlinecount.do?"+t,true);
}
this.refreshTime=(new Date()).getTime();
this.buddyLoading=true;
if(this.conv&&this.buddyList.length<=0){
this.conv.setNoFriends(true);
}
var This=this;
xhr.onreadystatechange=function(){
This.buddyCallback();
};
xhr.send(null);
};
imui.buddyWidget.prototype.buddyCallback=function(){
var xhr=this._xhr;
if(xhr.readyState==4){
imui.utilTabs.friends.buddyLoading=false;
if(xhr.status==200||xhr.status==211){
this.setBuddyInfo(xhr);
}else{
this.refetchOnNobody();
}
}
};
imui.buddyWidget.prototype.refetchOnNobody=function(){
if(this.refetchInterval){
this.refetchInterval*=2;
if(this.refetchInterval>900000){
this.refetchInterval=900000;
}
}else{
this.refetchInterval=17479;
}
setTimeout(function(){
imui.utilTabs.friends.refetchBuddies(true);
},this.refetchInterval);
};
imui.buddyWidget.prototype.setBuddyInfo=function(xhr){
var rsp;
try{
eval("rsp="+xhr.responseText);
}
catch(e){
return;
}
if(!rsp.hostid){
return;
}
if(!rsp.friends){
rsp.friends=[];
}
var f=rsp.friends;
var id=rsp.hostid;
this.hostid=rsp.hostid;
this.hostname=rsp.hostname;
if(rsp.hostname){
hostName=rsp.hostname;
}
this.buddyList=rsp.friends;
this.onlineFriendsCnt=rsp.onlineFriendsCount;
var tbl=this.conv.table;
this.showBuddyInfo(this.searchKey);
this.positionBgFrame();
if(this.onlineFriendsCnt<0){
this.refetchOnNobody();
this.onlineFriendsCnt=0;
}
if(this.onlineFriendsCnt==0){
this.conv.setNoFriends(false);
}
this.tab.setOnlineCount(this.onlineFriendsCnt);
this.onlineFriendsReady=true;
imui.tabBar.refreshOnlineStatus();
};
imui.buddyWidget.prototype.showBuddyInfo=function(_193){
var tbl=this.conv.table;
var f=this.buddyList;
this.searchKey=_193;
if(_193){
_193=_193.toLowerCase();
}
try{
if(_193&&_193.length>0){
var _196=this.conv.domNode.clientHeight;
this.conv.domNode.style.minHeight=_196+"px";
this.conv.domNode.scrollTop=0;
}else{
this.conv.domNode.style.minHeight="20px";
}
while(tbl.rows.length>0){
tbl.deleteRow(0);
}
for(var i=0;i<f.length;i++){
var name=f[i].name.toLowerCase();
if(_193&&_193.length>0&&name.indexOf(_193)<0){
continue;
}
this.conv.append(f[i]);
}
}
catch(e){
return;
}
};
imui.buddyWidget.prototype.clickHide=function(e){
var o;
if(e){
o=e.target;
}else{
o=top.event.srcElement;
}
if(o==this.domNode){
this.focus(!this.active);
return;
}
if(persistMap.settings.blistAlwaysVisible()){
return;
}
if(!o.parentNode){
return;
}
while(o){
if(o==this.domNode){
return;
}
o=o.parentNode;
}
if(this.active){
this.focus(false);
}
};
imui.buddyWidget.prototype.focus=function(b,_19c){
if(this.active==b){
return;
}
if(b){
this.domNode.className="m-chat-button-onlinefriends m-chat-button-active";
this.window.className="m-chat-window buddy-list";
if(OS.isIE7&&!this.leftMarginRemended){
var _19d=imui.getXOffset(this.domNode);
var _19e=imui.getXOffset(this.window);
if(_19e-_19d!=1){
var x=-97-(_19e-_19d-1);
this.window.style.marginLeft=x+"px";
}
this.leftMarginRemended=true;
}
this.refetchBuddies(true);
imui.utilTabs.settings.focus(false);
imui.utilTabs.notify.focus(false);
this.conv.loadImage();
if(OS.isIE){
if(!_19c){
this.search.focus(true);
}
}else{
this.search.focus(true);
}
this.positionBgFrame();
}else{
this.domNode.className="m-chat-button-onlinefriends";
this.window.className="m-chat-window buddy-list hide";
}
this.active=b;
if(!_19c){
gPresence.updatePresence(BUDDY_WIDGET_BIT,b);
}
};
imui.notifyConv=function(w){
var t=topDoc.createElement("div");
t.className="chat-conv";
this.domNode=t;
this.domNode.widget=this;
this.widget=w;
this.notifyCnt=0;
var n=topDoc.createElement("div");
n.className="notifyitem";
n.innerHTML="&nbsp;\u65e0\u65b0\u63d0\u9192\u3002";
this.noNotifyDiv=n;
this.domNode.appendChild(n);
};
imui.notifyConv.prototype.isShown=function(seq,_1a4,_1a5){
if(typeof _1a4=="undefined"||_1a4<0){
return false;
}
if(_1a4<=_1a5){
return seq>=_1a4&&seq<=_1a5;
}
return seq>=_1a4||seq<=_1a5;
};
imui.notifyConv.prototype.loadHistory=function(){
if(this.loaded){
return;
}
this.loaded=true;
if(!persistMap.settings.storeHistory()){
return;
}
var _1a6=-1,_1a7=-1;
if(this.domNode.firstChild&&this.domNode.firstChild.notifySeq){
_1a6=this.domNode.firstChild.notifySeq;
_1a7=this.domNode.lastChild.notifySeq;
}
var v=persistMap.notifyHistory.getNotifyByUin(imHelper.getLoginUin());
for(var i=0;i<v.length;++i){
if(!this.isShown(v[i].seq,_1a6,_1a7)){
this.append(v[i],true);
}
}
};
imui.notifyConv.prototype.updateNoNotify=function(){
if(this.notifyCnt>0){
if(this.noNotifyDiv.parentNode==this.domNode){
this.domNode.removeChild(this.noNotifyDiv);
}
}else{
if(this.noNotifyDiv.parentNode!=this.domNode){
this.domNode.appendChild(this.noNotifyDiv);
}
}
};
imui.notifyConv.prototype.remove=function(seq){
var item=this.domNode.firstChild;
while(item){
if(item.notifySeq==seq){
var p=item.parentNode;
p.removeChild(item);
if(--this.notifyCnt==0){
this.updateNoNotify();
}
break;
}
item=item.nextSibling;
}
};
imui.notifyConv.prototype.removeByLink=function(url){
if(!url){
return;
}
var item=this.domNode.firstChild;
var next;
while(item){
next=item.nextSibling;
if(item.url==url){
var p=item.parentNode;
p.removeChild(item);
imui.controller.pushRemoveNotify(item.notifySeq);
if(--this.notifyCnt==0){
this.updateNoNotify();
}
}
item=next;
}
};
imui.notifyConv.prototype.append=function(e,_1b2){
if(!e||!e.content){
imHelper.reportChat("error/undef_notify",100);
return;
}
this.notifyCnt++;
var n=topDoc.createElement("div");
if(_1b2){
n.className="notifyitem";
}else{
n.className="notifyitem new";
}
n.notifySeq=e.seq;
var cont=e.content;
if(OS.isIE){
cont=cont.replace(/@/,"(at)");
}
n.innerHTML="<a href=\"#nogo\" title=\""+e.seq+"\" class=\"close\"></a>"+cont;
var o=n.lastChild.lastChild;
while(o){
if(o.tagName=="A"){
var url=o.href;
if(renren){
o.href=url.replace(/kaixin.com/i,"renren.com");
}else{
o.href=url.replace(/renren.com/i,"kaixin.com");
}
}
o=o.previousSibling;
}
var link=n.lastChild.lastChild;
while(link&&link.tagName!="A"){
link=link.previousSibling;
}
if(link){
n.url=link.href;
var id=link.getAttribute("sourceno");
n.sourceno=id?id:0;
id=link.getAttribute("attrtype");
n.attrtype=id?id:0;
}
var _1b9=function(){
this.formerClass=this.className;
this.className="notifyitem hover";
};
var _1ba=function(){
if(this.formerClass){
this.className=this.formerClass;
}
};
var This=this;
var _1bc=function(){
if(n.sourceno>0){
var req="http://home."+(renren?"renren":"kaixin")+".com/dispatchreadone.do?type=1&atttype=";
req+=n.attrtype;
req+="&sourceno=";
req+=n.sourceno;
req+="&ts=";
req+=(new Date()).getTime();
new top.XN.NET.xmlhttp({url:req,method:"get",data:"",onSuccess:function(){
},onError:function(){
}});
}
This.removeByLink(n.url);
};
var c=n.firstChild;
if(n.addEventListener){
n.addEventListener("mouseout",_1ba,true);
n.addEventListener("mouseover",_1b9,true);
c.addEventListener("click",_1bc,true);
if(link){
link.addEventListener("click",_1bc,true);
}
}else{
n.onmouseout=_1ba;
n.onmouseover=_1b9;
c.onclick=_1bc;
if(link){
link.onclick=_1bc;
}
}
if(_1b2){
this.domNode.appendChild(n);
}else{
this.domNode.insertBefore(n,this.domNode.firstChild);
}
if(this.notifyCnt>50){
this.domNode.removeChild(this.domNode.lastChild);
this.notifyCnt--;
}
this.updateNoNotify();
this.domNode.scrollTop=0;
};
imui.notifyWidget=function(){
this.active=false;
this.createDomNode();
this.header=new imui.buddyHeader(this,DESC_NOTIFY_HEADER);
this.conv=new imui.notifyConv(this);
this.window.appendChild(this.header.domNode);
this.window.appendChild(this.conv.domNode);
this.newMsgCntDiv=topDoc.createElement("div");
this.newMsgCntDiv.className="m-chat-msgcount hide";
this.newMsgCnt=0;
this.newMsgCntDiv.innerHTML=this.newMsgCnt;
this.newMsgCntDiv.widget=this;
this.domNode.appendChild(this.newMsgCntDiv);
var _1bf=function(){
this.widget.focus(true);
};
if(this.newMsgCntDiv.addEventListener){
this.newMsgCntDiv.addEventListener("click",_1bf,true);
}else{
this.newMsgCntDiv.onclick=_1bf;
}
};
imui.notifyWidget.prototype.showNewCntDiv=function(b){
if(b){
this.newMsgCntDiv.className="m-chat-msgcount";
}else{
this.newMsgCntDiv.className="m-chat-msgcount hide";
}
};
imui.notifyWidget.prototype.setNewMsgCnt=function(cnt){
if(cnt<=0){
this.newMsgCntDiv.className="m-chat-msgcount hide";
}else{
this.newMsgCntDiv.className="m-chat-msgcount";
}
this.newMsgCnt=cnt;
this.newMsgCntDiv.innerHTML=cnt;
};
imui.notifyWidget.prototype.incrementNewMsgCnt=function(){
this.newMsgCnt++;
this.newMsgCntDiv.innerHTML=this.newMsgCnt;
if(this.newMsgCnt==1){
this.newMsgCntDiv.className="m-chat-msgcount";
}
};
imui.notifyWidget.prototype.createDomNode=function(){
var node=topDoc.createElement("div");
node.className="m-chat-button-notifications";
var w=topDoc.createElement("div");
w.className="m-chat-window notifications hide";
var ifrm=imui.createBgFrame();
ifrm.style.width="203px";
ifrm.style.marginLeft="-1px";
ifrm.style.marginTop="-1px";
w.appendChild(ifrm);
this.bgFrame=ifrm;
node.appendChild(w);
this.window=w;
this.domNode=node;
this.window.widget=this;
this.domNode.widget=this;
var t=topDoc.createElement("div");
t.className="chattip hide";
t.innerHTML="<div class=\"chattip-content\">\u63d0\u9192</div><div class=\"chattip-for\"></div>";
this.widgetTip=t;
this.domNode.appendChild(t);
var _1c6=function(e){
var w=this.widget;
if(w.active){
return;
}
if(w.newMsgCnt==0){
w.widgetTip.className="chattip";
}
w.domNode.className="m-chat-button-notifications m-chat-button-hover";
};
var _1c9=function(e){
var w=this.widget;
if(w.active){
return;
}
w.widgetTip.className="chattip hide";
w.domNode.className="m-chat-button-notifications";
};
if(node.addEventListener){
node.addEventListener("mouseout",_1c9,true);
node.addEventListener("mouseover",_1c6,true);
}else{
node.onmouseout=_1c9;
node.onmouseover=_1c6;
}
};
imui.notifyWidget.prototype.clickHide=function(e){
var o;
if(e){
o=e.target;
}else{
o=top.event.srcElement;
}
if(o==this.domNode){
this.focus(!this.active);
return;
}
while(o){
if(o==this.domNode){
return;
}
o=o.parentNode;
}
if(this.active){
this.focus(false);
}
};
imui.notifyWidget.prototype.removeItem=function(seq){
this.conv.remove(seq);
};
imui.notifyWidget.prototype.append=function(e){
this.conv.append(e);
if(!this.active){
this.incrementNewMsgCnt();
if(!imui.tabBar.bTitleFlash){
imui.tabBar.bTitleFlash=true;
imui.tabBar.flashTitle(1);
}
}
};
imui.notifyWidget.prototype.focus=function(b,_1d1){
if(this.active==b){
return;
}
this.widgetTip.className="chattip hide";
if(b){
this.conv.loadHistory();
this.domNode.className="m-chat-button-notifications m-chat-button-active";
this.window.className="m-chat-window notifications";
imui.utilTabs.settings.focus(false);
imui.utilTabs.friends.focus(false);
this.setNewMsgCnt(0);
imui.tabBar.bTitleFlash=false;
this.bgFrame.style.height=this.window.offsetHeight+"px";
}else{
this.domNode.className="m-chat-button-notifications";
this.window.className="m-chat-window notifications hide";
var e=this.conv.domNode.firstChild;
while(e&&e.className=="notifyitem new"){
e.className="notifyitem";
e=e.nextSibling;
}
}
this.active=b;
if(!_1d1){
gPresence.updatePresence(NOTIFY_WIDGET_BIT,b);
}
};
imui.widgetList=function(){
this.first=null;
this.last=null;
this.size=0;
};
imui.widgetList.prototype.insertTail=function(w){
if(this.first==null){
this.first=w;
}
w.prevWidget=this.last;
if(this.last){
this.last.nextWidget=w;
}
this.last=w;
w.nextWidget=null;
++this.size;
};
imui.widgetList.prototype.insertHead=function(w){
if(this.last==null){
this.last=w;
}
w.prevWidget=null;
w.nextWidget=this.first;
if(this.first){
this.first.prevWidget=w;
}
this.first=w;
++this.size;
};
imui.widgetList.prototype.removeTail=function(){
return this.remove(this.last);
};
imui.widgetList.prototype.removeHead=function(){
return this.remove(this.first);
};
imui.widgetList.prototype.remove=function(w){
if(typeof w!="object"){
w=this.find(w);
}
if(!w){
return null;
}
if(this.first==w){
this.first=w.nextWidget;
}
if(this.last==w){
this.last=w.prevWidget;
}
if(w.prevWidget){
w.prevWidget.nextWidget=w.nextWidget;
}
if(w.nextWidget){
w.nextWidget.prevWidget=w.prevWidget;
}
--this.size;
return w;
};
imui.widgetList.prototype.getNewMsgCnt=function(){
var w=this.first;
var cnt=0;
while(w){
cnt+=w.newMsgCnt;
w=w.nextWidget;
}
return cnt;
};
imui.widgetList.prototype.find=function(f){
var fuin;
if(typeof f=="object"){
fuin=f.touin;
}else{
fuin=f;
}
var w=this.first;
for(;w;w=w.nextWidget){
if(w.touin==fuin){
return w;
}
}
return null;
};
var CHAT_WIDTH=137;
var SCROLL_WIDTH=74;
var DOING_WIDTH=288;
var SETTING_WIDTH=222;
imui.chatTabs={leftHiddenWidgets:null,rightHiddenWidgets:null,closedWidgets:null,visibleWidgets:null,leftScrollBtn:null,rightScrollBtn:null,domNode:null,scrollTimer:null,ie7ScrollFlashFix:function(){
clearTimeout(this.scrollTimer);
this.scrollTimer=setTimeout(function(){
imui.chatTabs.onWindowResize();
},400);
},init:function(){
this.leftHiddenWidgets=new imui.widgetList();
this.rightHiddenWidgets=new imui.widgetList();
this.closedWidgets=new imui.widgetList();
this.visibleWidgets=new imui.widgetList();
this.domNode=topDoc.createElement("div");
this.domNode.className="m-allchattab";
if(window.screen.width==1024){
this.domNode.style.maxWidth="598px";
}
this.chats=topDoc.createElement("div");
this.chats.className="m-chat-chattab";
this.leftScrollBtn=new imui.scrollBtn(true);
this.rightScrollBtn=new imui.scrollBtn(false);
this.domNode.appendChild(this.leftScrollBtn.domNode);
this.domNode.appendChild(this.rightScrollBtn.domNode);
this.domNode.appendChild(this.chats);
if(renren){
var _1db=["\u95ee\uff1a\u4e3a\u4ec0\u4e48\u4ed6\u4eec\u80fd\u57281\u79d2\u5185\u56de\u590d\uff1f \u7b54\uff1a\u7528\u4eba\u4eba\u684c\u9762\uff01\u3000\u3010\u70b9\u51fb\u4e0b\u8f7d\u3011","\u3010NEW\u3011\u4eba\u4eba\u684c\u9762\uff1a\u5b8c\u6574\u5448\u73b0\u4f60\u7684\u4e2a\u6027\u5316\u5e94\u7528\u5217\u8868\uff01\u3000\u3010\u70b9\u51fb\u4e0b\u8f7d\u3011","\u3010NEW\u3011\u4eba\u4eba\u684c\u9762\u4e5f\u80fd\u53d1\u9001\u8868\u60c5\u5566\uff01\u65b0\u7248\u6c9f\u901a\u66f4\u8d34\u5fc3\uff01\u3010\u70b9\u51fb\u4e0b\u8f7d\u3011","\u53c8\u5fd8\u4e86\u6536\u83dc\uff1f\u4eba\u4eba\u684c\u9762\u5b9a\u65f6\u63d0\u9192\uff0c\u52a9\u4f60\u73a9\u8f6c\u83dc\u56ed\uff01\u3000\u3000\u3010\u70b9\u51fb\u4e0b\u8f7d\u3011","\u4eba\u4eba\u684c\u9762\uff1a\u53d1\u72b6\u6001\uff0c\u6536\u6d88\u606f\uff0c\u56de\u7559\u8a00\uff0c\u4e00\u4e2a\u4e5f\u4e0d\u80fd\u5c11\uff01\u3010\u70b9\u51fb\u4e0b\u8f7d\u3011","\u4eba\u4eba\u684c\u9762\uff1a\u60f3\u9690\u8eab\u5417\uff1f\u4eba\u4eba\u7f51\u552f\u4e00\u9690\u8eab\u5de5\u5177\uff01\u3000\u3000\u3000\u3000\u3010\u70b9\u51fb\u4e0b\u8f7d\u3011","\u8c01\u53c8\u9001\u4f60\u5723\u8bde\u793c\u7269\u4e86\uff1f\u7528\u4eba\u4eba\u684c\u9762\uff0c\u4f60\u4e00\u773c\u5c31\u770b\u89c1\uff01\u3000\u3010\u70b9\u51fb\u4e0b\u8f7d\u3011","\u4eba\u4eba\u684c\u9762\uff1a\u76f4\u63a5\u56de\u590d\uff0c\u4e0d\u5f00\u7f51\u9875\uff0c\u4fbf\u6377\u53c8\u5feb\u901f\uff01\u3000\u3000\u3000\u3010\u70b9\u51fb\u4e0b\u8f7d\u3011","\u4eba\u4eba\u684c\u9762\uff1a\u4eba\u4eba\u9910\u5385\u8865\u4f53\u529b\uff0c\u5b9a\u65f6\u63d0\u9192\u5e2e\u4f60\u8bb0\uff01\u3000\u3000\u3000\u3010\u70b9\u51fb\u4e0b\u8f7d\u3011","\u4eba\u4eba\u684c\u9762\uff1a\u5b9a\u65f6\u542f\u52a8\u73a9\u513f\u5e94\u7528\uff0c\u4e0a\u73ed\u5077\u83dc\u4e24\u4e0d\u8bef\uff01\u3000\u3000\u3010\u70b9\u51fb\u4e0b\u8f7d\u3011","\u4eba\u4eba\u684c\u9762\uff1a\u83dc\u88ab\u5077\u4e86\u4e0d\u670d\u6c14\uff1f\u7528\u5b9a\u65f6\u63d0\u9192\u53bb\u5077\u56de\u6765\u5427\uff01\u3010\u70b9\u51fb\u4e0b\u8f7d\u3011","\u522b\u518d\u5237\u7f51\u9875\u5566\uff01\u6302\u4eba\u4eba\u684c\u9762\uff0c\u65b0\u9c9c\u4e8b\u513f\u4e00\u6765\u5c31\u770b\u89c1\uff01\u3000\u3010\u70b9\u51fb\u4e0b\u8f7d\u3011"];
var tc=topDoc.createElement("div");
var idx=(new Date().getTime())%_1db.length;
var dl="http://im.renren.com/desktop/ver8/rrsetup.exe";
tc.innerHTML="<div class=\"webpager-button\">"+"<a target=\"_blank\" href=\""+dl+"?f=wpw7-"+idx+"\">"+_1db[idx]+"</a></div>";
if(OS.isIE6){
tc.firstChild.style.marginTop="-25px";
}
this.domNode.imDownload=tc.firstChild;
this.domNode.appendChild(tc.firstChild);
}
this.calcLayout();
if(top.addEventListener){
top.addEventListener("resize",function(){
imui.chatTabs.onWindowResize();
},true);
}else{
if(top.attachEvent){
top.attachEvent("onresize",function(){
imui.chatTabs.onWindowResize();
});
if(OS.isIE7){
top.attachEvent("onscroll",function(){
imui.chatTabs.ie7ScrollFlashFix();
});
}
}
}
if(OS.isIE6){
top.IMHack.hackToolBar();
}
},hideImDownload:function(){
if(renren){
this.domNode.imDownload.className="hide";
}
},updateScrollBtns:function(){
if(OS.isIE6||OS.isFirefox2||this.maxVisibleChats<=0||(this.leftHiddenWidgets.size<=0&&this.rightHiddenWidgets.size<=0)){
this.leftScrollBtn.hide();
this.rightScrollBtn.hide();
return;
}
this.leftScrollBtn.updateDisplay(this.leftHiddenWidgets);
this.rightScrollBtn.updateDisplay(this.rightHiddenWidgets);
},scrollRight:function(){
var r=this.rightHiddenWidgets.removeHead();
if(!r){
return;
}
var v=this.visibleWidgets.removeTail();
if(!v){
return;
}
this.chats.removeChild(v.domNode);
this.visibleWidgets.insertHead(r);
this.chats.insertBefore(r.domNode,this.chats.firstChild);
this.leftHiddenWidgets.insertHead(v);
this.updateScrollBtns();
},scrollLeft:function(){
var l=this.leftHiddenWidgets.removeHead();
if(!l){
return;
}
var v=this.visibleWidgets.removeHead();
if(!v){
return;
}
this.chats.removeChild(v.domNode);
this.visibleWidgets.insertTail(l);
this.chats.appendChild(l.domNode);
this.rightHiddenWidgets.insertHead(v);
this.updateScrollBtns();
},scrollVisible:true,doingVisible:true,maxVisibleChats:5,hasSpace:function(b){
return this.visibleWidgets.size<this.maxVisibleChats;
},calcLayout:function(){
var w=imui.getSafeClientWidth();
if(w<=SETTING_WIDTH+SCROLL_WIDTH+CHAT_WIDTH){
this.maxVisibleChats=0;
this.scrollVisible=false;
this.doingVisible=false;
}else{
if(w<=SETTING_WIDTH+SCROLL_WIDTH+CHAT_WIDTH+DOING_WIDTH){
this.maxVisibleChats=parseInt((w-SETTING_WIDTH-SCROLL_WIDTH)/CHAT_WIDTH);
this.scrollVisible=true;
this.doingVisible=false;
}else{
this.maxVisibleChats=parseInt((w-SETTING_WIDTH-SCROLL_WIDTH-DOING_WIDTH)/CHAT_WIDTH);
this.scrollVisible=true;
this.doingVisible=true;
}
}
if(this.maxVisibleChats<0){
this.maxVisibleChats=0;
}
if(OS.isIE7){
this.domNode.style.width=(CHAT_WIDTH*this.maxVisibleChats+SCROLL_WIDTH-24)+"px";
}
},onWindowResize:function(){
this.calcLayout();
while(this.maxVisibleChats<this.visibleWidgets.size){
this.onHideWidget(this.visibleWidgets.last);
}
while(this.maxVisibleChats>this.visibleWidgets.size){
w=this.rightHiddenWidgets.removeHead();
if(!w){
break;
}
this.updateScrollBtns();
this.visibleWidgets.insertTail(w);
this.chats.insertBefore(w.domNode,this.chats.firstChild);
}
while(this.maxVisibleChats>this.visibleWidgets.size){
w=this.leftHiddenWidgets.removeHead();
if(!w){
break;
}
this.updateScrollBtns();
this.visibleWidgets.insertTail(w);
this.chats.appendChild(w.domNode);
}
imui.TopAdapter.doingShow(this.doingVisible);
},setHostOnline:function(b){
if(!this.visibleWidgets||!this.visibleWidgets.first){
return;
}
var w=this.visibleWidgets.first;
for(;w;w=w.nextWidget){
w.setHostOnline(b);
}
for(w=this.closedWidgets.first;w;w=w.nextWidget){
w.setHostOnline(b);
}
for(w=this.rightHiddenWidgets.first;w;w=w.nextWidget){
w.setHostOnline(b);
}
for(w=this.leftHiddenWidgets.first;w;w=w.nextWidget){
w.setHostOnline(b);
}
},onActivateWidget:function(to,_1e8,_1e9,_1ea,_1eb){
if(!imui.utilTabs||!imui.utilTabs.friends){
return null;
}
imui.utilTabs.friends.clearSearch();
var w=this.rightHiddenWidgets.find(to);
if(w){
return w;
}
w=this.leftHiddenWidgets.find(to);
if(w){
return w;
}
w=this.visibleWidgets.find(to);
if(w!=null){
return w;
}
if(!_1e9){
var f=imui.utilTabs.friends;
var info=f.getInfo(to);
if(info){
_1e8=info.name;
_1e9=info.tiny;
_1ea=info.doing;
_1eb=info.status;
}else{
_1e9="";
_1ea="";
_1eb="";
f.refetchBuddies(true);
}
}
w=this.closedWidgets.remove(to);
if(!w){
if(!_1e8){
_1e8=persistMap.messageHistory.getNameByUin(to);
if(!_1e8){
return null;
}
}
w=new imui.chatWidget(to,_1e8,_1e9,_1ea,_1eb);
}
if(!this.hasSpace()){
this.leftHiddenWidgets.insertTail(w);
imui.chatTabs.updateScrollBtns();
}else{
this.visibleWidgets.insertTail(w);
w.focus(false,false);
this.chats.appendChild(w.domNode);
if(OS.isIE6){
top.IMHack.hackWidget(w.domNode);
}
}
this.hideImDownload();
return w;
},removeWidget:function(r){
var w=this.visibleWidgets.remove(r);
if(!w){
return null;
}
try{
this.chats.removeChild(w.domNode);
}
catch(e){
return null;
}
if(w.active){
w.focus(false,false);
imui.chatTabs.currentFocus=null;
}
return w;
},onHideWidget:function(r){
var w=this.removeWidget(r);
if(w){
this.leftHiddenWidgets.insertHead(w);
imui.chatTabs.updateScrollBtns();
}
},onCloseWidget:function(c,sync){
var w=this.removeWidget(c);
if(!w){
return;
}
w.clearHighlight();
if(w==this.currentFocus){
w.focus(false,false);
this.currentFocus=null;
}
this.closedWidgets.insertHead(w);
if(this.closedWidgets.size>10){
this.closedWidgets.removeTail();
}
if(this.rightHiddenWidgets.size>0){
w=this.rightHiddenWidgets.removeHead();
this.updateScrollBtns();
this.visibleWidgets.insertHead(w);
this.chats.insertBefore(w.domNode,this.chats.firstChild);
}else{
if(this.leftHiddenWidgets.size>0){
w=this.leftHiddenWidgets.removeHead();
this.updateScrollBtns();
this.visibleWidgets.insertTail(w);
this.chats.appendChild(w.domNode);
}
}
if(sync){
gPresence.updatePresence(w.touin,0,0,w.toname,0);
}
},currentFocus:null,switchFocus:function(_1f6,sync){
if(typeof _1f6!="object"){
_1f6=imui.chatTabs.visibleWidgets.find(_1f6);
}
if(_1f6==null){
this.currentFocus=null;
return;
}
if(this.currentFocus==_1f6){
return;
}
if(this.currentFocus){
this.currentFocus.focus(false,sync);
}
_1f6.focus(true,sync);
this.currentFocus=_1f6;
}};
imui.utilTabs={domNode:null,friendsVisible:false,init:function(){
this.domNode=topDoc.createElement("div");
this.domNode.className="m-chat-presence";
this.settings=new imui.settingWidget();
this.notify=new imui.notifyWidget();
this.friends=new imui.buddyWidget();
this.friends.refetchBuddies(false);
this.domNode.appendChild(this.settings.domNode);
if(OS.isIE6){
top.IMHack.hackWidget(this.settings.domNode);
}
var _1f8=function(e){
imui.utilTabs.settings.clickHide(e);
imui.utilTabs.notify.clickHide(e);
imui.utilTabs.friends.clickHide(e);
};
if(topDoc.addEventListener){
topDoc.addEventListener("click",_1f8,true);
}else{
topDoc.onclick=_1f8;
}
if(imui.tabBar.hostOnline){
this.domNode.appendChild(this.notify.domNode);
this.domNode.appendChild(this.friends.domNode);
if(OS.isIE6){
top.IMHack.hackWidget(this.notify.domNode);
top.IMHack.hackWidget(this.friends.domNode);
}
this.friendsVisible=true;
}
},setHostOnline:function(b){
if(!this.friends){
return;
}
this.friends.setHostOnline(b);
if(b){
if(!this.friendsVisible){
this.domNode.appendChild(this.notify.domNode);
this.domNode.appendChild(this.friends.domNode);
if(OS.isIE6){
top.IMHack.hackWidget(this.notify.domNode);
top.IMHack.hackWidget(this.friends.domNode);
}
this.friendsVisible=true;
}
}else{
if(this.friendsVisible){
this.domNode.removeChild(this.friends.domNode);
this.domNode.removeChild(this.notify.domNode);
this.friendsVisible=false;
}
}
this.settings.setHostOnline(b);
}};
imui.scrollBtn=function(left){
this.leftward=left;
this.domNode=topDoc.createElement("div");
if(left){
this.domNode.className="m-chat-button-chattab hide";
}else{
this.domNode.className="m-chat-button-chattab hide";
}
this.domNode.widget=this;
this.isMouseup=true;
this.hiddenCntDiv=topDoc.createElement("div");
this.hiddenCntDiv.innerHTML="<a onfocus=\"this.blur();\" href=\"#nogo\">0</a>";
this.newMsgCntDiv=topDoc.createElement("div");
this.newMsgCntDiv.className="m-chat-msgcount hide";
this.newMsgCnt=0;
this.newMsgCntDiv.innerHTML=this.newMsgCnt;
this.domNode.appendChild(this.hiddenCntDiv);
this.domNode.appendChild(this.newMsgCntDiv);
if(this.domNode.addEventListener){
this.domNode.addEventListener("mousedown",this.mousedown_fn,true);
this.domNode.addEventListener("mouseup",this.mouseup_fn,true);
this.domNode.addEventListener("mouseout",this.mouseup_fn,true);
}else{
this.domNode.onmousedown=this.mousedown_fn;
this.domNode.onmouseup=this.mouseup_fn;
this.domNode.onmouseout=this.mouseup_fn;
}
};
imui.scrollBtn.prototype.setNewMsgCnt=function(cnt){
if(cnt<=0){
this.newMsgCntDiv.className="m-chat-msgcount hide";
}else{
this.newMsgCntDiv.className="m-chat-msgcount";
}
this.newMsgCnt=cnt;
this.newMsgCntDiv.innerHTML=cnt;
};
imui.scrollBtn.prototype.incrementNewMsgCnt=function(){
this.newMsgCnt++;
this.newMsgCntDiv.innerHTML=this.newMsgCnt;
if(this.newMsgCnt==1){
this.newMsgCntDiv.className="m-chat-msgcount";
}
};
imui.scrollBtn.prototype.mouseup_fn=function(){
var w=this.widget;
w.isMouseup=true;
};
imui.scrollBtn.prototype.timerScroll=function(){
var w=this;
if(w.isMouseup){
return;
}
w.scroll();
setTimeout(function(){
w.timerScroll();
},360);
};
imui.scrollBtn.prototype.mousedown_fn=function(){
var w=this.widget;
w.isMouseup=false;
w.timerScroll();
};
imui.scrollBtn.prototype.scroll=function(){
if(this.leftward){
imui.chatTabs.scrollLeft();
}else{
imui.chatTabs.scrollRight();
}
};
imui.scrollBtn.prototype.hide=function(){
this.domNode.className="m-chat-button-chattab hide";
};
imui.scrollBtn.prototype.updateDisplay=function(list){
if(list.size>0){
if(this.leftward){
this.domNode.className="m-chat-button-chattab showmore leftbtn";
this.domNode.title="\u5de6\u4fa7\u6709"+list.size+"\u4e2a\u9690\u85cf\u7a97\u53e3";
}else{
this.domNode.className="m-chat-button-chattab showmore rightbtn";
this.domNode.title="\u53f3\u4fa7\u6709"+list.size+"\u4e2a\u9690\u85cf\u7a97\u53e3";
}
}else{
if(this.leftward){
this.domNode.className="m-chat-button-chattab showmore leftbtn disable";
}else{
this.domNode.className="m-chat-button-chattab showmore rightbtn disable";
}
this.domNode.title="\u65e0\u9690\u85cf\u7a97\u53e3";
}
this.hiddenCntDiv.innerHTML="<a onfocus=\"this.blur();\" href=\"#nogo\">"+list.size+"</a>";
this.setNewMsgCnt(list.getNewMsgCnt());
};
imui.tabBar={domNode:null,settingWidget:null,logos:null,chatTabs:null,initialized:false,init:function(_201){
if(this.initialized){
return;
}
var _202=(new Date()).getTime();
var node=topDoc.getElementById(ROOT_NODE_ID);
if(node){
if(node.firstChild){
imHelper.report("error/duplicateimui2",1);
return;
}
}else{
node=topDoc.createElement("div");
node.id=ROOT_NODE_ID;
node.className="hide";
topDoc.body.appendChild(node);
}
imui.chatTabs.init();
imui.utilTabs.init();
if(this.domNode==null){
node.className="m-chat-box clearfix";
var ifrm=imui.createBgFrame();
ifrm.style.height="26px";
ifrm.style.width="100%";
var n2=topDoc.createElement("div");
n2.className="m-chat";
var n3=topDoc.createElement("div");
n3.className="m-chat-tabbar";
n3.appendChild(imui.utilTabs.domNode);
n3.appendChild(imui.chatTabs.domNode);
var _207=topDoc.createElement("div");
_207.className="chatnote";
n2.appendChild(_207);
n2.appendChild(n3);
n2.appendChild(ifrm);
if(node.firstChild){
imHelper.report("error/duplicateimui3",1);
}else{
node.appendChild(n2);
}
this.domNode=n3;
this.domNode.widget=this;
var _208=node.parentNode;
_208.removeChild(node);
topDoc.body.appendChild(node);
if(OS.isIE6){
imui.utilTabs.settings.ckSound.checked=persistMap.settings.playSound();
imui.utilTabs.settings.ckBlist.checked=persistMap.settings.blistAlwaysVisible();
imui.utilTabs.settings.ckStoreHistory.checked=persistMap.settings.storeHistory();
}
}
imui.TopAdapter.doingShow(true);
var cur=(new Date()).getTime();
_202=cur-_202;
if(_202>2000){
imHelper.report("perfstat/init_dom&t="+_202+"&init_all&t="+(cur-imui.wpt_base),100);
}
this.initialized=true;
},oldTitle:null,bTitleFlash:false,titleFlashCounter:0,flashTitle:function(type){
if(!gConn.localConnect){
return;
}
if(!this.oldTitle){
this.oldTitle=top.document.title;
}
if(this.bTitleFlash){
this.titleFlashCounter++;
if(this.titleFlashCounter>6){
if(this.titleFlashCounter==7){
top.document.title="\u3010\u3000\u3000\u3000\u3011- "+this.oldTitle;
if(type==1){
imui.utilTabs.notify.showNewCntDiv(false);
}else{
}
}else{
this.titleFlashCounter=0;
if(type==1){
top.document.title="\u3010\u65b0\u63d0\u9192\u3011- "+this.oldTitle;
imui.utilTabs.notify.showNewCntDiv(true);
}else{
top.document.title="\u3010\u65b0\u6d88\u606f\u3011- "+this.oldTitle;
}
}
}
if(type==1){
setTimeout("imui.tabBar.flashTitle(1)",250);
}else{
setTimeout("imui.tabBar.flashTitle(2)",250);
}
}else{
top.document.title=this.oldTitle;
}
},hostOnline:false,onHostOnlineChange:function(b){
if(this.hostOnline==b){
}
this.hostOnline=b;
if(imui.tabBar.initialized){
imui.utilTabs.setHostOnline(b);
imui.chatTabs.setHostOnline(b);
this.showHostOnlineChange(b);
}
},showHostOnlineChange:function(b){
var warr=[];
warr.push(imui.chatTabs.visibleWidgets);
warr.push(imui.chatTabs.closedWidgets);
warr.push(imui.chatTabs.rightHiddenWidgets);
warr.push(imui.chatTabs.leftHiddenWidgets);
for(var i=0;i<warr.length;i++){
for(var w=warr[i].first;w;w=w.nextWidget){
w.editor.disable(!b);
}
}
},refreshOnlineStatus:function(){
var f=imui.utilTabs.friends;
var warr=[];
warr.push(imui.chatTabs.visibleWidgets);
warr.push(imui.chatTabs.closedWidgets);
warr.push(imui.chatTabs.rightHiddenWidgets);
warr.push(imui.chatTabs.leftHiddenWidgets);
for(var i=0;i<warr.length;i++){
for(var w=warr[i].first;w;w=w.nextWidget){
w.setOnline(f.getOnlineStatus(w.touin));
}
}
}};
NOTIFY_WIDGET_BIT=1;
SETTING_WIDGET_BIT=2;
BUDDY_WIDGET_BIT=4;
var gPresence={_lastPresence:null,presenceToJson:function(o){
if(!o){
return null;
}
var s="{";
for(var m in o){
s+="\""+m+"\":";
if(typeof o[m]=="object"){
s+=this.presenceToJson(o[m]);
}else{
if(typeof o[m]=="string"){
s+="\""+o[m]+"\"";
}else{
s+=o[m];
}
}
s+=",";
}
if(s.charAt(s.length-1)==","){
return s.substring(0,s.length-1)+"}";
}else{
return s+"}";
}
return s;
},updatePresence:function(_217,_218,_219,name,_21b){
var np=persistMap.getPresenceDesc();
if(np==null||np.length<=0){
np="{\"uw\":0}";
}
var o;
try{
eval("o ="+np);
}
catch(e){
}
if(typeof (o)!="object"){
o={"uw":0};
}
if(_217<10){
if(_218>0){
o.uw|=_217;
}else{
o.uw&=~_217;
}
}else{
if(!o.chats){
o.chats={};
}
if(_218==0){
delete o.chats[_217];
}else{
if(!o.chats[_217]){
o.chats[_217]={};
}
if(name&&name.length>0){
o.chats[_217].name=name;
}
var _21e=0;
if(o.chats[_217].state){
_21e=o.chats[_217].state;
}
if(_218>0){
_21e&=65532;
_21e|=_218;
}else{
if((_21e&3)==0){
_21e|=1;
}
}
if(_219>=0){
_21e&=65523;
_21e|=(_219<<2);
}
if(_21b==0){
_21e&=15;
}else{
if(_21b==1){
var cnt=((_21e&65520)>>4)+1;
_21e&=15;
_21e|=(cnt<<4);
}
}
if(_21e>=0){
o.chats[_217].state=_21e;
}
}
}
var _220=this.presenceToJson(o);
if(this._lastPresence&&this._lastPresence!=_220){
persistMap.setPresenceDesc(_220);
}
},syncPresence:function(){
if(!imui.utilTabs||!imui.utilTabs.friends||!imui.utilTabs.friends.onlineFriendsReady){
return;
}
var np=persistMap.getPresenceDesc();
if(np==null||this._lastPresence==np){
return;
}
var o;
try{
eval("o ="+np);
}
catch(e){
}
if(typeof (o)!="object"){
return;
}
imui.controller.onShowNotify(o.uw&NOTIFY_WIDGET_BIT);
imui.controller.onShowSetting(o.uw&SETTING_WIDGET_BIT);
imui.controller.onShowBuddy(o.uw&BUDDY_WIDGET_BIT);
var warr=[];
warr.push(imui.chatTabs.visibleWidgets);
warr.push(imui.chatTabs.rightHiddenWidgets);
warr.push(imui.chatTabs.leftHiddenWidgets);
for(var i=0;i<warr.length;i++){
var w=warr[i].first;
while(w){
var next=w.nextWidget;
if(!o.chats||!o.chats[w.touin]){
imui.chatTabs.onCloseWidget(w,false);
}
w=next;
}
}
if(o.chats){
for(var u in o.chats){
var _228=o.chats[u].state;
var _229=_228&3;
var _22a=(_228&12)>>2;
var _22b=_228>>4;
var w;
if(_229>0){
w=imui.chatTabs.onActivateWidget(u,o.chats[u].name);
if(_229==2){
imui.chatTabs.switchFocus(w,false);
}else{
w.focus(false,false);
if(imui.chatTabs.currentFocus==w){
imui.chatTabs.currentFocus=null;
}
}
}
if(_22b>0){
if(w){
w.setNewMsgCnt(_22b);
}
}
}
}
this._lastPresence=np;
}};
var connState={CLOSED:0,CONNECTING:1,NOCONN_MAX:3};
(function(){
function querySingleNodeValue(ele,_22d){
for(var i=0;i<ele.childNodes.length;++i){
var v=ele.childNodes[i];
if(v.tagName==_22d){
for(var j=0;j<v.childNodes.length;++j){
if(v.childNodes[j].nodeValue!=null){
return v.childNodes[j].nodeValue;
}
}
}
}
return "";
}
function buildHeadUrl(url){
if(url.length<4){
return "";
}
if(url.indexOf("http://")==0){
return url;
}
if(url.indexOf("hdn")==0){
var i=url.indexOf("/");
var hdn=url.substring(0,i);
return "http://"+hdn+".rrimg.com/photos/"+url;
}else{
return "http://rrimg.com/photos/"+url;
}
}
function extractDoing(text){
var doc;
try{
if(window.ActiveXObject){
doc=new ActiveXObject("Microsoft.XMLDOM");
doc.async="false";
doc.loadXML(text);
}else{
var _236=new DOMParser();
doc=_236.parseFromString(text,"text/xml");
}
}
catch(e){
return null;
}
var r=new Object();
var _238=doc.getElementsByTagName("xfeed");
var _239,f,_23b;
if(_238.length>0){
_239=_238[0];
}else{
return null;
}
_238=doc.getElementsByTagName("f");
if(_238.length>0){
f=_238[0];
}else{
return null;
}
r.sid=querySingleNodeValue(f,"dID");
r.content=querySingleNodeValue(f,"title");
for(var i=0;i<f.childNodes.length;++i){
var v=f.childNodes[i];
if(v.tagName=="from"){
_23b=v;
break;
}
}
if(!_23b){
return null;
}
r.ownerId=querySingleNodeValue(_23b,"fID");
r.name=querySingleNodeValue(_23b,"fName");
r.head=querySingleNodeValue(f,"h");
r.head=buildHeadUrl(r.head);
r.type="feed_status";
r.hostId=imHelper.getLoginUin();
return r;
}
function extractMessage(text){
var t=text.replace(/<title>/i,"<title><![CDATA[");
text=t.replace(/<\/title>/i,"]]></title>");
var doc,res=[];
try{
if(window.ActiveXObject){
doc=new ActiveXObject("Microsoft.XMLDOM");
doc.async="false";
doc.loadXML(text);
var msgv=doc.getElementsByTagName("message");
for(var i=0;i<msgv.length;++i){
var n=msgv[i];
if(n.attributes){
res[i]={};
res[i].type=n.attributes.getNamedItem("type").nodeValue;
res[i].msg_id=parseInt(n.getAttribute("id"));
if(res[i].type=="chat"){
res[i].from=new Jid(n.attributes.getNamedItem("from").nodeValue);
res[i].to=new Jid(n.attributes.getNamedItem("to").nodeValue);
res[i].fname=n.attributes.getNamedItem("fname").nodeValue;
if(n.firstChild&&n.firstChild.firstChild){
res[i].msg_content=n.firstChild.firstChild.data;
}
}else{
if(res[i].type=="notify"){
res[i].touin=imHelper.getLoginUin();
for(var j=0;j<n.childNodes.length;j++){
if(n.childNodes[j].tagName=="subject"){
res[i].title=n.childNodes[j].childNodes[0].data;
}else{
if(n.childNodes[j].tagName=="body"){
res[i].content=n.childNodes[j].childNodes[0].data;
}
}
}
}else{
if(res[i].type=="feed_status"){
res[i]=extractDoing(text);
}
}
}
}
}
}else{
var _246=new DOMParser();
doc=_246.parseFromString(text,"text/xml");
var _247=doc.documentElement;
var cnt=_247.childNodes.length;
for(var i=0;i<cnt;++i){
var n=_247.childNodes[i];
if(n.hasAttributes()){
res[i]={};
res[i].type=n.getAttribute("type");
if(res[i].type=="chat"){
res[i].from=new Jid(n.getAttribute("from"));
res[i].to=new Jid(n.getAttribute("to"));
res[i].fname=n.getAttribute("fname");
res[i].msg_id=parseInt(n.getAttribute("id"));
if(n.childNodes){
if(n.childNodes[0].childNodes){
res[i].msg_content=n.childNodes[0].childNodes[0].nodeValue;
}
}
}else{
if(res[i].type=="notify"){
res[i].touin=imHelper.getLoginUin();
res[i].msg_id=parseInt(n.getAttribute("id"));
for(var j=0;j<n.childNodes.length;j++){
if(n.childNodes[j].tagName=="subject"){
res[i].title=n.childNodes[j].childNodes[0].nodeValue;
}else{
if(n.childNodes[j].tagName=="body"){
res[i].content=n.childNodes[j].childNodes[0].nodeValue;
}
}
}
}else{
if(res[i].type=="feed_status"){
res[i]=extractDoing(text);
res[i].msg_id=parseInt(n.getAttribute("id"));
}
}
}
}
}
}
}
catch(e){
}
return res;
}
var _249=2859;
var _24a=150000;
var _24b=30000;
var _24c=0;
var _24d=0;
var _24e=0;
var _24f=0;
var _250=null;
var _251=null;
var _252={};
function buildMessage(m){
if(m.length<=0){
return null;
}
var xml="<sendlist>\n";
for(var i=0;i<m.length;++i){
var _256=imHelper.getLoginUin();
xml+="<message  type=\"chat\" from = \""+_256+"@talk.renren.com";
if(_251){
xml+="/"+_251;
}
xml+="\" to=\""+m[i].touin+"@talk.renren.com";
if(_252[m[i].touin]){
xml+="/"+_252[m[i].touin];
}
xml+="\">\n"+"<body>"+imHelper.xmlEncode(m[i].msg_content)+"</body>\n"+"</message>\n";
}
xml+="</sendlist>\n\x00";
return xml;
}
window.gConn={localConnect:false,pageUnloaded:false,toggleConn:function(){
if(persistMap.settings.useIm()){
var s=this.getConnState();
if(s==connState.CLOSED){
this.connInit(true);
}else{
if(s>connState.NOCONN_MAX){
imui.controller.onConnSuccess();
}
}
gPersistData.pushEvent(eventType.IM_ENABLE);
}else{
gPersistData.pushEvent(eventType.IM_DISABLE);
}
},getConnState:function(){
var _258=connState.CLOSED;
try{
var s=imHelper.getCookie("wimconn");
if(s){
_258=parseInt(s);
}
}
catch(e){
}
return _258;
},setConnState:function(_25a){
document.cookie="wimconn="+_25a;
},connStateCheck:function(){
if(!imHelper.isLoginUser()){
return;
}
if(gConn.pageUnloaded){
return;
}
var _25b=gConn.getConnState();
if(_25b==connState.CLOSED){
this.connInit();
}else{
if(_25b==connState.CONNECTING){
if(++_24c*_249>_24b){
_24c=0;
this.setConnState(connState.CLOSED);
}
}else{
if(_25b>connState.NOCONN_MAX){
var t=(new Date()).getTime();
if(t-_25b>_24a){
this.setConnState(connState.CLOSED);
}else{
if(this.localConnect){
if(_24e!=0&&_24e!=_25b){
if(++_24f>15){
imHelper.reportChat("error/multi_conn",1);
_24f=0;
}
}
_24d++;
if(_24d>10){
_24d=0;
_24e=t;
this.setConnState(t);
}
}
}
}else{
this.setConnState(connState.CLOSED);
}
}
}
window.setTimeout("gConn.connStateCheck()",_249);
},messageId:0,waitingMessages:[],sendingMessages:[],isSending:false,_sendTimer:null,sendCallback:function(){
var xhr=_250;
if(xhr.readyState==4){
if(this._sendTimer){
clearTimeout(this._sendTimer);
this._sendTimer=null;
}
if(!this.isSending){
return;
}
this.isSending=false;
if(xhr.status>=200&&xhr.status<300){
this.onSendSuccess();
}else{
this.onSendError();
}
}
},onSendSuccess:function(){
var v=this.sendingMessages;
for(var i=0;i<v.length;++i){
}
this.sendingMessages=[];
this.sendErrorCnt=0;
this.sendMsg(null);
},sendErrorCnt:0,onSendError:function(){
this.isSending=false;
if(++this.sendErrorCnt>3){
var v=this.sendingMessages;
for(var i=0;i<v.length;++i){
if(v[i].msg_content){
v[i].msg_content="\u6d88\u606f\""+v[i].msg_content+"\"\u53d1\u9001\u5931\u8d25";
gPersistData.pushEvent(eventType.MSG_SEND_FAIL,v[i]);
imHelper.reportChat("error/send_fail",100);
}else{
imHelper.reportChat("error/undef_send_fail",100);
}
}
this.sendingMessages=[];
this.sendErrorCnt=0;
}
this.sendMsg(null);
},onSendTimeout:function(){
this.isSending=false;
_250.abort();
var v=this.sendingMessages;
for(var i=0;i<v.length;++i){
v[i].msg_content="\u6d88\u606f\""+v[i].msg_content+"\"\u53d1\u9001\u8d85\u65f6";
gPersistData.pushEvent(eventType.MSG_SEND_FAIL,v[i]);
}
this.sendingMessages=[];
this.sendErrorCnt=0;
this._sendTimer=null;
this.sendMsg(null);
imHelper.reportChat("error/send_timeout",100);
},sendMsg:function(e){
var w=this.waitingMessages;
var s=this.sendingMessages;
if(e&&e.msg_content){
w[w.length]=e;
if(e.msg_content=="undefined"){
imHelper.reportChat("error/undef_to_send",100);
}
}
if(w.length<=0&&s.length<=0){
return;
}
if(this.isSending){
return;
}
if(this.sendErrorCnt>4){
return;
}
this.isSending=true;
var This=this;
this._sendTimer=setTimeout(function(){
This.onSendTimeout();
},15000);
if(w.length>0){
for(var i=0;i<w.length;++i){
s[s.length]=w[i];
}
this.waitingMessages=[];
}
var msg=buildMessage(s);
var url="/comet_broadcast";
if(!_250){
_250=imHelper.getXhr();
}else{
_250.abort();
}
var req=_250;
req.open("POST",url,true);
req.onreadystatechange=function(){
This.sendCallback();
};
req.send(msg);
},connClose:function(){
if(this.localConnect){
if(this._xhrPoll){
try{
this._xhrPoll.abort();
}
catch(e){
}
this._xhrPoll=null;
}
this.messageId=0;
this.localConnect=false;
this.setConnState(connState.CLOSED);
gPersistData.pushEvent(eventType.CONN_CLOSE);
clearTimeout(this.pollTimer);
}
},connInit:function(_26c){
if(_26c){
this.pollErrorCnt=0;
}
var s=this.getConnState();
if(s!=connState.CLOSED){
if(s>connState.NOCONN_MAX){
imui.controller.onConnSuccess();
}
return;
}
var res;
try{
res=this.doLongPoll(true);
}
catch(e){
}
if(res){
this.localConnect=true;
this.setConnState(connState.CONNECTING);
}
},_xhrPoll:null,doLongPoll:function(_26f){
if(this.pageUnloaded){
return false;
}
if(!imHelper.isLoginUser()){
return false;
}
if(!persistMap.settings.useIm()){
return false;
}
if(!persistMap.test()){
return;
}
if(this.pollErrorCnt>5){
this.connClose();
return false;
}
var url="/comet_get?mid="+this.messageId+"&r="+Math.random();
if(_26f){
this.wpt_connect=(new Date()).getTime();
url+="&ins";
}
if(!this._xhrPoll){
this._xhrPoll=imHelper.getXhr();
}
this._xhrPoll.open("GET",url,true);
var This=this;
this._xhrPoll.onreadystatechange=function(){
This.pollCallback();
};
this._xhrPoll.send(null);
return true;
},pollCallback:function(){
var xhr=this._xhrPoll;
if(xhr.readyState==4){
if(this.wpt_connect&&this.wpt_connect>0){
var t=(new Date()).getTime()-this.wpt_connect;
if(t>5000){
imHelper.report("perfstat/comet_connect&t="+t,100);
}
this.wpt_connect=null;
}
if(xhr.status==200){
this.onPollSuccess();
}else{
this.onPollError();
}
}
},lastErrorTime:0,pollErrorCnt:0,onPollError:function(){
var xhr=this._xhrPoll;
var t=(new Date()).getTime();
if(this.lastErrorTime<=0||t-this.lastErrorTime<10000){
++this.pollErrorCnt;
}
this.lastErrorTime=t;
this.messageId=0;
var This=this;
if(!this.pageUnloaded){
this.pollTimer=setTimeout(function(){
This.doLongPoll(false);
},50);
}else{
console.log("pageUnloaded on poll error");
}
},messageIdErrorCnt:0,onPollSuccess:function(){
if(this.getConnState()==connState.CONNECTING){
gPersistData.pushEvent(eventType.CONN_SUCCESS);
var t=(new Date()).getTime();
this.setConnState(t);
}else{
}
this.pollErrorCnt=0;
var str=this._xhrPoll.responseText;
if(str.length<=0){
var intv=parseInt(Math.random()*120000+50);
var This=this;
setTimeout(function(){
This.doLongPoll(false);
},intv);
return;
}
var m=extractMessage(str);
var _27c=true;
for(var i=0;i<m.length;++i){
if(m[i].type=="chat"||m[i].type=="feed_status"||m[i].type=="notify"){
if(!m[i].msg_id){
continue;
}
if(this.messageId!=0&&m[i].msg_id<=this.messageId){
continue;
}
_27c=false;
this.messageId=m[i].msg_id;
if(m[i].type=="chat"){
_251=m[i].to.resource;
_252[m[i].from.id]=m[i].from.resource;
imHelper.playSound("message");
if(!m[i].fname){
m[i].fname=m[i].from.id;
}
gPersistData.pushEvent(eventType.MSG_RECV,m[i].from.id,m[i].fname,m[i].to.id,m[i].msg_content);
}else{
if(m[i].type=="notify"){
var _27e=imHelper.getCookie("_wi");
if(m[i].touin&&m[i].content){
imHelper.reportChat("chatstat/notify_recv",1);
if("running"!=_27e){
imHelper.playSound("nofity");
gPersistData.pushEvent(eventType.NOTIFY_RECV,m[i].touin,m[i].title,m[i].content);
}
}
}else{
if(m[i].type=="feed_status"){
imHelper.reportChat("chatstat/doing_recv",1);
if(persistMap.settings.pushDoing()){
}
}
}
}
}else{
_27c=false;
}
}
if(_27c){
this.messageId=0;
if(++this.messageIdErrorCnt>4){
this.messageIdErrorCnt=0;
}
}else{
this.messageIdErrorCnt=0;
}
setTimeout(function(){
gConn.doLongPoll(false);
},50);
},loadConn:function(){
this.connInit();
if(window.addEventListener){
window.addEventListener("unload",function(){
gConn.connClear();
},true);
}else{
if(window.attachEvent){
window.attachEvent("onbeforeunload",function(){
gConn.connClear();
});
}
}
},resetUnloaded:function(){
gConn.pageUnloaded=false;
},connClear:function(){
this.pageUnloaded=true;
window.setTimeout("gConn.resetUnloaded()",1000);
this.connClose();
}};
})();
var webpager={};
webpager.removeNotify=function(url){
if(!imui.utilTabs){
return;
}
var w=imui.utilTabs.notify;
if(w&&w.conv){
w.conv.removeByLink(url);
}
};
top.webpager=webpager;
imui.TopAdapter={appMenuLoaded:false,doingInit:function(){
try{
top.$.wpi.initApp();
this.appMenuLoaded=true;
}
catch(e){
}
},doingShow:function(b){
if(!this.appMenuLoaded){
this.doingInit();
}
try{
if(b){
top.$.wpi.showApp();
}else{
top.$.wpi.hideApp();
}
}
catch(e){
}
},doingNotify:function(o){
}};
imui.controller={onRecvNotify:function(e){
imui.utilTabs.notify.append(e);
},onRecvRemoveNotify:function(e){
imui.utilTabs.notify.removeItem(e.remove_seq);
},onRecvMessage:function(m){
var _286=imHelper.getLoginUin();
if(m.touin!=_286){
return;
}
var tabs=imui.chatTabs;
var w=tabs.onActivateWidget(m.fromuin,m.fromname);
if(w){
w.appendMsg(m);
if(tabs.leftHiddenWidgets.find(w)){
tabs.leftScrollBtn.incrementNewMsgCnt();
}else{
if(tabs.rightHiddenWidgets.find(w)){
tabs.rightScrollBtn.incrementNewMsgCnt();
}
}
}
},onSendMessage:function(e){
var _28a=gConn.getConnState();
var _28b=imHelper.getLoginUin();
if(e.fromuin!=_28b){
return;
}
if(_28a>connState.NOCONN_MAX){
if(e.msg_content){
if(gConn.localConnect){
gConn.sendMsg(e);
}
var w=imui.chatTabs.visibleWidgets.find(e.touin);
if(w){
w.appendMsg(e);
}
}
}else{
if(_28a==connState.CONNECTING){
if(gConn.localConnect){
gPersistData.pushEvent(e.type,e.fromuin,e.fromname,e.touin,e.msg);
}
}
}
},onShowSetting:function(b){
imui.utilTabs.settings.focus(b);
},onShowNotify:function(b){
imui.utilTabs.notify.focus(b);
},onShowBuddy:function(b){
imui.utilTabs.friends.focus(b,true);
},onSoundSwitch:function(b){
persistMap.settings.setPlaySound(b,false);
imui.utilTabs.settings.ckSound.checked=b;
},onImDisable:function(){
gConn.connClose();
persistMap.settings.setUseIm(false,false);
imui.tabBar.onHostOnlineChange(false);
},onImEnable:function(){
persistMap.settings.setUseIm(true,false);
},onImUnusable:function(){
imHelper.report("error/dom_storage_unusable");
gConn.connClose();
imui.tabBar.onHostOnlineChange(false);
},onConnClose:function(){
if(gPagerType==pagerType.NEW_PAGER){
imui.tabBar.onHostOnlineChange(false);
}
if(!gConn.localConnect){
gConn.connInit();
}
},onConnSuccess:function(){
if(gPagerType==pagerType.NEW_PAGER){
imui.tabBar.onHostOnlineChange(true);
}
},onSessionOut:function(){
imui.tabBar.hostOnline=false;
if(imui.tabBar.initialized){
imui.utilTabs.setHostOnline(false);
imui.chatTabs.setHostOnline(false);
imui.tabBar.showHostOnlineChange(false);
imui.utilTabs.settings.setNoSession();
}
},incrementNewMsg:function(_291,name){
if(gConn.localConnect){
gPresence.updatePresence(_291,-1,-1,name,1);
}
},onInputMessage:function(e){
gPersistData.pushEvent(eventType.MSG_SEND,e.fromuin,e.fromname,e.touin,e.msg_content);
gPersistData.syncEvent();
},onInputMessageFail:function(e){
gPersistData.pushEvent(eventType.MSG_SEND_FAIL,e);
if(e.msg_content!=DESC_MSG_TOO_LONG){
imHelper.report("error/comet_send",100);
}
},onSendMessageFail:function(m){
var w=imui.chatTabs.visibleWidgets.find(m.touin);
if(w){
w.appendMsg(m);
}
},pushRemoveNotify:function(seq){
persistMap.removeNotify(seq);
gPersistData.pushEvent(eventType.NOTIFY_REMOVE,seq);
},onToggleConn:function(){
gConn.toggleConn();
}};
var pagerType={NO_PAGER:1,CLASSIC_PAGER:2,NOTIFY_PAGER:3,NEW_PAGER:4};
var gPagerType=null;
function getPagerType(){
if(!OS.browserOK){
return pagerType.NO_PAGER;
}
var _298=(new Date()).getTime();
if(!persistMap.test()){
}
_298=(new Date()).getTime()-_298;
if(_298>1000){
imHelper.report("perfstat/wpt_test_storage&t="+_298,100);
}
return pagerType.NEW_PAGER;
}
function startWebim(){
if(window.OS&&OS.isIE){
var n=topDoc.createElement("p");
try{
n.doScroll("left");
}
catch(ex){
setTimeout(startWebim,50);
return;
}
}
if(pagerType.NEW_PAGER==gPagerType){
imui.tabBar.init();
gConn.loadConn();
window.setTimeout("gPersistData.syncEvent()",1000);
window.setTimeout("gConn.connStateCheck()",2000);
}
}
function registerWebim(){
imui.wpt_base=(new Date()).getTime();
var host;
try{
host=top.location.hostname;
}
catch(e){
return;
}
if(renren&&OS.isIE&&imHelper.startXnclient()){
return;
}
gPagerType=getPagerType();
switch(gPagerType){
case pagerType.NO_PAGER:
break;
case pagerType.NEW_PAGER:
persistMap.settings.load();
try{
startWebim();
}
catch(e){
}
break;
}
}

