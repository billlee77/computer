XN.namespace("app");
XN.app.ILike=function(p){
$extend(this,p);
};
(function(ns){
var _3={};
var _4;
getILike=function(_5){
return _3[_5];
};
getActiveILike=function(){
return getILike(_4);
};
log=function(s){
if(XN.DEBUG_MODE){
try{
XN.log(s);
}
catch(e){
throw new Error(s);
}
}
};
var _7=function(_8){
var _9=_8.url;
var _a=_8.method||"GET";
var _b=_8.callback;
var _c=_8.errorMsg||"\u672a\u77e5\u9519\u8bef\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5";
var _d=_8.data;
var s=this;
try{
new XN.net.xmlhttp({url:_9,data:_d,method:_a,onSuccess:function(r){
var _10=XN.JSON.parse(r.responseText);
if(_10.code!=0){
XN.DO.alert(_10.msg);
return;
}else{
_b.call(s,_10);
}
},onError:function(){
if(XN.DEBUG_MODE){
XN.DO.showError(_c);
}
}});
}
catch(e){
this.log("\u6570\u636e\u53d1\u9001\u5931\u8d25");
}
};
ns.prototype={gid:0,uid:0,userLike:false,likeCount:null,likeList:[],ilikeButton:null,ilikeBox:null,ilikeHeader:null,ilikeDetailBox:null,baseUrl:"http://like."+XN.env.domain,addUrl:"/addlike",removeUrl:"/removelike",viewCountUrl:"/showlike",veiwDetailUrl:"/showlikedetail",urlProfile:"http://"+XN.env.domain+"/profile.do",loadingStr:"<span id=\"temp-loading\">\u52a0\u8f7d\u4e2d&nbsp;<img src=\""+XN.env.staticRoot+"imgpro/bg/indicator_blue_small.gif\" /></span>",isDetailShow:false,oldDetailShow:null,guestName:null,ownerId:null,itemName:null,cookieNameHour:null,cookieNameDay:null,maxHourLikeCounts:30,maxDayLikeCounts:80,hourAlertMsg:"\u60a8\u8d5e\u7684\u6b21\u6570\u592a\u591a\u4e86\uff0c\u8bf7\u4f11\u606f\u4e00\u5c0f\u65f6\u518d\u8d5e\u5427!",dayAlertMsg:"\u60a8\u4eca\u5929\u8d5e\u7684\u6b21\u6570\u592a\u591a\u4e86\uff0c\u8bf7\u660e\u5929\u518d\u8d5e\u5427\uff01",lastLikeTime:null,limitInteval:3,limitAlertMsg:"\u60a8\u7684\u64cd\u4f5c\u592a\u5feb\u4e86\uff0c\u8bf7\u7a0d\u540e\u518d\u91cd\u8bd5",init:function(){
if(!(!!this.type&&!!this.id&&!!this.userId)){
log("type|id|userId must needed!!");
return false;
}
this.gid=this.type+"_"+this.id;
this.uid=this.userId;
this.params={gid:this.gid,uid:this.uid};
_3[this.gid]=this;
_4=this.gid;
this.cookieNameHour="IL_H";
this.cookieNameDay="IL_D";
log("gid : "+this.gid);
},add:function(){
var _11;
switch(this.type){
case "blog":
_11=0;
break;
case "album":
_11=1;
break;
case "photo":
_11=2;
break;
case "share":
_11=3;
break;
}
var _12=$extend(this.params,{owner:this.ownerId,type:_11,name:this.guestName});
var url=this.getUrl(this.addUrl,_12);
this.fireEvent("startAdd");
var c=this.checkHasLiked();
if(c.alreadyMax){
XN.DO.alert(c.msg);
return false;
}
if(!this.checkActionInteval()){
XN.DO.showError(this.limitAlertMsg);
return false;
}
_7.call(this,{url:url,callback:this.addCallback});
},addCallback:function(o){
log(o);
this.likeCount=o.likeCount;
this.userLike=o.ownerLike;
this.likeList=o.likeList;
this.setCheckCookie();
this.fireEvent("addSuccess");
},remove:function(){
var url=this.getUrl(this.removeUrl,this.params);
this.fireEvent("remove");
var c=this.checkHasLiked();
if(c.alreadyMax){
XN.DO.alert(c.msg);
return false;
}
if(!this.checkActionInteval()){
XN.DO.showError(this.limitAlertMsg);
return false;
}
_7.call(this,{url:url,callback:this.removeCallback});
},removeCallback:function(o){
log(o);
this.likeCount=o.likeCount;
this.userLike=o.ownerLike;
this.likeList=o.likeList;
this.setCheckCookie();
this.fireEvent("removeSuccess");
},viewCount:function(){
var url=this.getUrl(this.viewCountUrl,this.params);
this.fireEvent("getViewCount");
if(getILike(this.gid).likeCount!=null){
this.fireEvent("getViewCountSuccess");
return false;
}
_7.call(this,{url:url,callback:this.viewCountCallback});
},viewCountCallback:function(o){
log(o);
this.likeCount=o.likeCount;
this.userLike=o.ownerLike;
this.fireEvent("getViewCountSuccess");
},viewDetail:function(){
var url=this.getUrl(this.veiwDetailUrl,this.params);
this.fireEvent("getViewDetail");
if(this.likeList.length!=0){
this.fireEvent("getViewDetailSuccess");
return;
}
_7.call(this,{url:url,callback:this.veiwDetailCallback});
this.addLoading();
},veiwDetailCallback:function(o){
log(o);
this.likeCount=o.likeCount;
this.userLike=o.ownerLike;
this.likeList=o.likeList;
this.removeLoading();
this.fireEvent("getViewDetailSuccess");
},getUrl:function(_1d,_1e){
$extend(_1e,{t:Math.random()});
return this.baseUrl+_1d+"?"+XN.array.toQueryString(_1e);
},setCheckCookie:function(){
this.setHourLiked();
this.setDayLiked();
},setCookie:function(_1f,_20,_21,_22,_23,_24){
var _25;
if(isNumber(_21)){
var _26=new Date();
var _27=new Date(_26.getTime()+(_21*1000));
_25=_27.toGMTString();
}else{
if(isString(_21)){
_25=_21;
}else{
_25=false;
}
}
_23=_23||XN.env.domain;
_22="/";
document.cookie=_1f+"="+encodeURIComponent(_20)+(_25?";expires="+_25:"")+(_22?";path="+_22:"")+(_23?";domain="+_23:"")+(_24?";secure":"");
},setHourLiked:function(){
var _28=60-new Date().getMinutes();
if(!(!!XN.cookie.get(this.cookieNameHour))){
this.setCookie(this.cookieNameHour,1,_28*60);
}else{
var _29=parseInt(XN.cookie.get(this.cookieNameHour));
this.setCookie(this.cookieNameHour,_29+1,_28*60);
}
},setDayLiked:function(){
var _2a=new Date();
_2a.setDate(_2a.getDate()+1);
_2a.setHours(0);
_2a.setMinutes(0);
_2a.setSeconds(0);
_2a.setMilliseconds(0);
var _2b=_2a.getTime()-new Date().getTime();
if(!XN.cookie.get(this.cookieNameDay)){
this.setCookie(this.cookieNameDay,1,_2b/1000);
}else{
var _2c=parseInt(XN.cookie.get(this.cookieNameDay));
this.setCookie(this.cookieNameDay,_2c+1,_2b/1000);
}
},checkHourLiked:function(){
var _2d=parseInt(XN.cookie.get(this.cookieNameHour));
return _2d>this.maxHourLikeCounts;
},chekcDayLiked:function(){
var _2e=parseInt(XN.cookie.get(this.cookieNameDay));
return _2e>this.maxDayLikeCounts;
},checkHasLiked:function(){
if(this.checkHourLiked()){
return {alreadyMax:true,msg:this.hourAlertMsg};
}
if(this.chekcDayLiked()){
return {alreadyMax:true,msg:this.dayAlertMsg};
}
return {alreadyMax:false};
},checkActionInteval:function(){
if(!this.lastLikeTime){
this.lastLikeTime=new Date().getTime();
return true;
}else{
var _d=new Date().getTime();
var _t=(_d-this.lastLikeTime)/1000;
this.lastLikeTime=_d;
return _t>this.limitInteval;
}
},addLoading:function(){
this.ilikeHeader.innerHTML+=this.loadingStr;
},removeLoading:function(){
var _31=this.ilikeHeader.getElementsByTagName("span")[0];
if(_31){
this.ilikeHeader.removeChild(_31);
}
},elShow:function(el){
el.style.display="";
},elHide:function(el){
el.style.dispay="none";
}};
XN.EVENT.enableCustomEvent(ns.prototype);
})(XN.app.ILike);
var ILike={ilike:null,init:function(p){
var s=this;
var gid=p.type+"_"+p.id;
if(!!getILike(gid)){
this.ilike=getILike(gid);
}else{
this.ilike=new XN.app.ILike(p);
}
log(this.ilike.likeCount);
this.ilike.init();
this.ilike.addEvent("getViewCountSuccess",function(){
s.renderButton();
s.renderHeaderBox();
});
if(this.ilike.ilikeBox){
delete this.ilike.ilikeBox;
}
this.createBox();
this.ilike.isDetailShow=false;
this.ilike.guestName=$("guestName").value;
this.ilike.viewCount();
this.inputParams=p;
try{
if(Blog){
Blog.addEvent("onShowMoreComments",function(){
ILike.patchShowMoreComments();
});
}
}
catch(e){
}
try{
if(AlbumComments&&AlbumComments.albumId){
AlbumComments.addEvent("onShowMoreComments",function(){
ILike.patchShowMoreComments();
});
}
}
catch(e){
}
try{
if(XN.PAGE.albumPhoto&&XN.PAGE.albumPhoto.currentPhotoId){
XN.PAGE.albumPhoto.addEvent("onShowMoreComments",function(){
ILike.patchShowMoreComments();
});
XN.PAGE.albumPhoto.addEvent("onPhotoRefresh",ILike.patchPhotoRefresh);
}
}
catch(e){
}
},toggleUserLike:function(){
var il=this.ilike;
var s=this;
if(il.userLike==false){
il.addEvent("addSuccess",function(){
s.renderAll();
});
il.add();
}else{
il.addEvent("removeSuccess",function(){
s.renderAll();
});
il.remove();
}
},toggleShowDetail:function(){
var il=this.ilike;
var s=this;
if(il.isDetailShow===true){
il.ilikeDetailBox.style.display="none";
}else{
il.addEvent("getViewDetailSuccess",function(){
s.renderLikeList();
});
il.viewDetail();
}
il.isDetailShow=il.isDetailShow===true?false:true;
},renderAll:function(){
var s=this;
var il=this.ilike;
s.renderButton();
s.renderHeaderBox();
if(il.isDetailShow){
s.renderLikeList();
}
},renderButton:function(){
var il=this.ilike;
if(il.userLike==true){
il.ilikeButton.innerHTML="\u4e0d\u8d5e";
XN.element.delClass(il.ilikeButton,"ilike_icon");
}else{
il.ilikeButton.innerHTML="\u8d5e";
XN.element.addClass(il.ilikeButton,"ilike_icon");
}
if(il.ilikeButtonAddtional){
if(il.userLike==true){
il.ilikeButtonAddtional.innerHTML="\u4e0d\u8d5e";
}else{
il.ilikeButtonAddtional.innerHTML="\u8d5e";
}
}
},renderHeaderBox:function(){
var il=this.ilike;
var _3f;
var _40;
var _41="ILike.toggleShowDetail();return false;";
if(il.likeCount>0){
if(il.userLike===true){
if(il.likeCount-1>0){
_3f="<a onclick=\""+_41+"\" href=\"#nogo\">\u6211\u548c"+(il.likeCount-1)+"\u4e2a\u4eba\u89c9\u5f97\u8fd9\u5f88\u8d5e!</a>";
}
if((il.likeCount-1)==0){
_3f="\u6211\u89c9\u5f97\u8fd9\u5f88\u8d5e!";
}
}else{
_3f="<a onclick=\""+_41+"\" href=\"#nogo\">"+il.likeCount+"\u4e2a\u4eba\u89c9\u5f97\u8fd9\u5f88\u8d5e!</a>";
}
}
if(!!_3f){
il.ilikeHeader.parentNode.style.display="block";
il.ilikeHeader.innerHTML=_3f;
}else{
il.ilikeHeader.parentNode.style.display="none";
}
},renderLikeList:function(){
var il=this.ilike;
var _43=il.likeList;
var _44="<ul class=\"figures\">";
for(var i=0,l=_43.length;i<l;i++){
_44+=["<li><div class=\"figure\">","<a href=\""+il.urlProfile+"?id="+_43[i].id+"\">","<img src=\""+_43[i].headUrl+"\" alt=\""+_43[i].name+"\" />","</a>","<div class=\"label name\">","<a href=\""+il.urlProfile+"?id="+_43[i].id+"\">"+_43[i].name+"</a>","</div>","</div></li>"].join("");
}
_44+="</ul>";
il.ilikeDetailBox.innerHTML=_44;
il.ilikeDetailBox.style.display="block";
},createBox:function(){
if($("ILike_Box")){
$("ILike_Box").parentNode.removeChild($("ILike_Box"));
}
this.ilike.ilikeBox=document.createElement("dl");
this.ilike.ilikeBox.id="ILike_Box";
var _47=["<dt class = \"digged\" style=\"display:none;\">","<span  id=\"ILike_Text_"+this.ilike.id+"\">","</span>","</dt>","<dd id=\"ILike_Detail_"+this.ilike.id+"\" class = \"diggers\" style=\"display:none;\"></dd>"].join("");
this.ilike.ilikeBox.innerHTML=_47;
this.ilike.ilikeBox.className="replies  with-arrow";
var _48=XN.dom.getElementsByClassName("replies","document","dl")[0];
if(_48!=undefined){
_48.className=_48.className.replace(/\swith-arrow/ig,"");
_48.parentNode.insertBefore(this.ilike.ilikeBox,_48);
}else{
XN.dom.getElementsByClassName("replies","document","div")[0].appendChild(this.ilike.ilikeBox);
}
this.getHTMLhandles();
},getHTMLhandles:function(){
this.ilike.ilikeButton=$("ILike_UserLike_Handle");
if($("photoGood")){
this.ilike.ilikeButtonAddtional=$("photoGood");
}
this.ilike.ilikeHeader=$("ILike_Text_"+this.ilike.id);
this.ilike.ilikeDetailBox=$("ILike_Detail_"+this.ilike.id);
},patchShowMoreComments:function(){
this.createBox();
this.renderAll();
},patchPhotoRefresh:function(pid){
XN.page.albumPhoto.delEvent("onPhotoRefresh",ILike.patchPhotoRefresh);
ILike.inputParams.id=pid;
ILike.init(ILike.inputParams);
}};
(function(){
var _4a=function(gid){
var il=getILike(gid);
var _4d=il.likeList;
var _4e="";
for(var i=0,l=_4d.length;i<l;i++){
_4e+=["<li>","<a href=\""+il.urlProfile+"?id="+_4d[i].id+"\">","<img src=\""+_4d[i].headUrl+"\" alt=\""+_4d[i].name+"\" />","</a>","<div class=\"label name\">","<a href=\""+il.urlProfile+"?id="+_4d[i].id+"\">"+_4d[i].name+"</a>","</div>","</li>"].join("");
}
il.ilikeDetailBox.innerHTML=_4e;
il.ilikeDetailBox.style.display="block";
};
var _51=function(gid){
var il=getILike(gid);
if(il.userLike==true){
il.ilikeButton.innerHTML="\u4e0d\u8d5e";
XN.element.delClass(il.ilikeButton,"ilike_icon");
}else{
il.ilikeButton.innerHTML="\u8d5e";
XN.element.addClass(il.ilikeButton,"ilike_icon");
}
};
var _54=function(gid){
var il=getILike(gid);
var _57;
if(il.likeCount>0){
if(il.userLike===true){
if(il.likeCount-1>0){
_57="<a href=\"#nogo\" onclick=\"ILike_toggleShow('"+il.type+"',"+il.id+","+il.userId+")\" href=\"#nogo\">\u6211\u548c"+(il.likeCount-1)+"\u4e2a\u4eba\u89c9\u5f97\u8fd9\u5f88\u8d5e!</a>";
}
if((il.likeCount-1)==0){
_57="\u6211\u89c9\u5f97\u8fd9\u5f88\u8d5e!";
}
}else{
_57="<a onclick=\"ILike_toggleShow('"+il.type+"','"+il.id+"',"+il.userId+")\" href=\"#nogo\">"+il.likeCount+"\u4e2a\u4eba\u89c9\u5f97\u8fd9\u5f88\u8d5e!";
}
}
if(!!_57){
il.ilikeHeader.parentNode.style.display="block";
il.ilikeHeader.innerHTML=_57;
}else{
il.ilikeHeader.parentNode.style.display="none";
}
};
var _58=function(gid){
var il=getILike(gid);
_51(gid);
_54(gid);
if(il.isDetailShow){
_4a(gid);
}
};
ILike_createBox=function(p){
var str="";
var _5d="none";
var _5e="";
p.digged=isNaN(p.digged)?0:p.digged;
if(p.digged&&!p.userDigged){
str="<a href=\"#nogo\" onclick=\"ILike_toggleShow('"+p.type+"','"+p.id+"','"+p.userId+"')\">"+p.digged+"\u4e2a\u4eba\u89c9\u5f97\u8fd9\u5f88\u8d5e\uff01</a>";
}else{
if(p.digged&&p.userDigged){
str="<a href=\"#nogo\" onclick=\"ILike_toggleShow('"+p.type+"','"+p.id+"','"+p.userId+"')\">\u6211\u548c"+p.digged+"\u4e2a\u4eba\u89c9\u5f97\u8fd9\u5f88\u8d5e\uff01</a>";
}else{
if(!p.digged&&p.userDigged){
str="\u6211\u89c9\u5f97\u8fd9\u5f88\u8d5e\uff01";
}
}
}
if(p.digged||p.userDigged){
_5d="block";
}
_5e+="<div class=\"mincmt-diggers statuscmtitem\" style=\"display:"+_5d+"\">";
_5e+="<p>"+str+"</p>";
_5e+="<ul id=\"diggers"+p.id+"\" class=\"digger\"></ul>";
_5e+="</div>";
var _5f=XN.cookie.get("id");
var _60=new XN.app.ILike({type:p.type,id:p.id,ownerId:p.ownerId,likeCount:p.digged,userLike:!!p.userDigged,userId:_5f});
_60.init();
log(_60);
return _5e;
};
ILike_toggleUserLike=function(_61,id,_63,_64,_65){
var il=getILike(_61+"_"+id);
var _67=$("feedbody"+id)||$("share_ilike_"+id);
il.ilikeButton=$("ILike"+id);
il.ilikeHeader=XN.dom.getElementsByClassName("mincmt-diggers",_67)[0].getElementsByTagName("p")[0];
il.ilikeDetailBox=$("diggers"+id);
il.ownerId=_64;
il.guestName=_65;
if(il.userLike==true){
il.addEvent("removeSuccess",function(){
_58(il.gid);
});
il.remove();
}else{
il.addEvent("addSuccess",function(){
_58(il.gid);
});
il.add();
}
};
ILike_toggleShow=function(_68,id,_6a){
var il=getILike(_68+"_"+id);
il.ilikeButton=$("ILike"+id);
il.ilikeHeader=XN.dom.getElementsByClassName("mincmt-diggers",$("feedbody"+id))[0].getElementsByTagName("p")[0];
il.ilikeDetailBox=$("diggers"+id);
if(il.isDetailShow===true){
il.ilikeDetailBox.style.display="none";
}else{
il.addEvent("getViewDetailSuccess",function(){
_4a(il.gid);
});
il.viewDetail();
}
il.isDetailShow=il.isDetailShow===true?false:true;
};
})();
try{
if(XN.APP.status){
XN.APP.status.addEvent("ILikeInit",function(_6c,_6d,id,_6f,_70,_71){
if(_6d=="blog"||_6d=="album"||_6d=="photo"||_6d=="share"){
var _72=ILike_createBox({type:_6d,id:id,ownerId:_6f,digged:_70,userDigged:_71});
_6c.push(_72);
}
});
}
}
catch(e){
}

