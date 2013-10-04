XN.namespace("XN.ui");
(function(ns){
selectors={};
function sortByName(_2){
return _2.sort(function(a,b){
return a.name.localeCompare(b.name);
});
}
getFriendSelectorMenu=function(id){
return selectors[id];
};
ns.friendSelectorMenu=function(p){
this._ID=XN.util.createObjID();
selectors[this._ID]=this;
this.config=this.config||{};
$extend(this.config,{tip:"\u8bf7\u9009\u62e9\u597d\u53cb",url:"/friendsSelector.do",multi:false,friendsCountPerPage:12,param:{}});
$extend(this.config,p);
this.init();
};
ns.friendSelectorMenu.prototype=$extend({},XN.ui.element);
var _7=ns.friendSelectorMenu.prototype;
$extend(_7,{_selected:"",_ready:false,mode:"normal",isReady:function(){
return this._ready;
},isLoading:function(){
return this._isLoading;
},getConfig:function(_8){
return this.config[_8];
},getID:function(id){
return "mfsm_"+this._ID+"_"+id;
},getEl:function(id){
if(id=="input"){
return $(this.getConfig("input"));
}
return $(this.getID(id));
},getFriendID:function(id){
return this.getID("friend_"+id);
},getFriendEl:function(id){
return $(this.getFriendID(id));
},getSelectedFriends:function(){
var _d=this._selected.split(",");
_d.shift();
return _d;
},reset:function(){
this._selected="";
this.refresh();
},init:function(){
var _e=this;
var _f=$element("span");
_f.setAttribute("id",this.getID("button"));
_f.addClass("frsAutoDown");
this.frame=_f;
this.buttonFloat=this.getConfig("buttonFloat")||"left";
this.desOnBottom=this.getConfig("buttonFloat")?"<span class=\"float-left\" style=\"color:#666;line-height:18px;\">"+this.getConfig("desOnBottom")+"</span>":"";
var _10=$element("div");
_10.addClass("autoRst").addClass("radio-choose");
_10.setContent(["<p class=\"tips\">","<span class=\"float-left\">"+this.getConfig("tip")+"</span>","<span class=\"float-right\" id=\""+this.getID("selectContainer")+"\">","</span>","</p>","<div class=\"holder\">","<form><ul id=\""+this.getID("list")+"\"></ul></form>","</div>","<div class=\"actionBtns\">",this.desOnBottom,"<input style=\"display:none;\" id=\""+this.getID("submit")+"\" onclick=\"getFriendSelectorMenu("+this._ID+").fireEvent( 'submit' );\" type=\"button\" class=\"input-button  float-"+this.buttonFloat+"\" value=\"\u786e\u5b9a\" />","</div>"].join(""));
this.menu=new XN.ui.menu({button:_f,menu:_10,alignType:this.getConfig("alignType")||"3-2",offsetX:this.getConfig("offsetX")||0,offsetY:this.getConfig("offsetY")||0,alignWith:this.getEl("input")});
this.menu.onShow=function(){
_f.delClass("frsAutoDown");
_f.addClass("frsAutoUp");
};
this.menu.onHide=function(){
_f.addClass("frsAutoDown");
_f.delClass("frsAutoUp");
};
_f.addEvent("click",function(){
if(_e._ready){
return;
}
if(_e._isLoading){
return;
}
_e.loadFriends();
});
if(this.getConfig("multi")){
this.getEl("submit").show();
}
},isSelected:function(uid){
return new RegExp(","+uid+"(?!d)").test(this._selected);
},mark:function(uid){
var _13=this;
setTimeout(function(){
if(!_13.getFriendEl(uid).checked){
_13.markAsDeselect(uid);
}else{
_13.markAsSelected(uid);
}
},0);
},markAsSelected:function(uid){
this._selected+=","+uid;
this.fireEvent("select",uid);
XN.log("mfsm select:"+uid);
this.menu.refresh();
},markAsDeselect:function(uid){
this._selected=this._selected.replace(new RegExp(","+uid+"(?!d)"),"");
this.fireEvent("deselect",uid);
this.menu.refresh();
},selectFriends:function(fs){
var _17=this;
XN.array.each(fs,function(i,v){
_17.select(v);
});
return this;
},deselectFriends:function(fs){
var _1b=this;
XN.array.each(fs,function(i,v){
_1b.deselect(v);
});
return this;
},select:function(uid){
if(isUndefined(uid)){
return;
}
if(this.isSelected(uid)){
return;
}
this.markAsSelected(uid);
if(this.getFriendEl(uid)){
this.getFriendEl(uid).checked=true;
}
},deselect:function(uid){
if(!this.isSelected(uid)){
return;
}
this.markAsDeselect(uid);
if(this.getFriendEl(uid)){
this.getFriendEl(uid).checked=false;
}
},refresh:function(){
var _20=this;
if(_20.mode=="normal"){
_20.renderList(0,_20._allFriends);
}else{
_20.renderList(0,_20._filterResults);
}
},renderList:function(n,_22){
XN.log(_22);
var i=0;
var j=_22.length;
var id,uid;
var _27=[];
while(i<=j){
if(!_22[i]){
break;
}
if((i+1)%3==1){
_27.push("<li>");
}
uid=_22[i].id;
id=this.getFriendID(uid);
_27.push("<span class=\"userCell\" onclick=\"getFriendSelectorMenu("+this._ID+").mark('"+uid+"');\">");
if(this.getConfig("multi")){
_27.push("<input ");
if(this.isSelected(uid)){
_27.push("checked=\"true\" ");
}
_27.push("id=\""+id+"\" type=\"checkbox\" name=\"user\" />");
}else{
_27.push("<input id=\""+id+"\" uid=\""+uid+"\" type=\"radio\" name=\"user\" />");
}
_27.push("&nbsp;<label for=\""+id+"\">"+_22[i].name+"</label>");
_27.push("</span>");
if((i+1)%3==0){
_27.push("</li>");
}
i++;
}
if(_27.length&&_27[_27.length-1]!=="</li>"){
_27.push("</li>");
}
this.getEl("list").innerHTML=_27.join("");
},loadFriends:function(r){
if(this.isLoading()){
return;
}
this._isLoading=true;
var _29=this;
var p={};
p["init"]=true;
p["uid"]=true;
p["uhead"]=false;
p["uname"]=true;
p["group"]=true;
p["net"]=false;
p["param"]=this.getConfig("param");
$extend(p,this.getConfig("initParam"));
this.getEl("list").innerHTML="<li>\u52a0\u8f7d\u4e2d...</li>";
new XN.NET.xmlhttp({useCache:true,url:this.getConfig("url"),method:"get",data:"p="+XN.JSON.build(p),onSuccess:function(r){
r=XN.JSON.parse(r.responseText);
_29._onload(r);
}});
},renderFilter:function(){
var _2c=this;
this.filter=new XN.util.DS_friends({url:this.getConfig("url"),qkey:this.getConfig("qkey"),useCache:true});
var _2d=["<select id=\""+this.getID("select")+"\">"];
_2d.push("<option value=\"\">\u5168\u90e8\u597d\u53cb</option>");
XN.array.each(this._groups,function(i,v){
if(v!==""){
_2d.push("<option value=\""+v+"\">"+v+"</option>");
}
});
_2d.push("</select>");
this.getEl("selectContainer").innerHTML=_2d.join("");
this.getEl("select").onchange=function(){
_2c.filterByGroup(this.value);
};
},filterByGroup:function(_30){
var _31=this;
if(_30===""){
this.resetFilter();
}else{
this.getEl("list").innerHTML="<li>\u6b63\u5728\u67e5\u8be2...</li>";
this.mode="filter";
this.filter.group=_30;
this.filter.query("",function(r){
XN.log(r);
sortByName(r);
_31._filterResults=r;
_31.refresh();
});
}
},resetFilter:function(){
this.mode="normal";
this.refresh();
},getUserByID:function(id){
id=String(id);
var rt=null;
XN.array.each(this._allFriends,function(i,v){
if(String(v.id)==id){
rt=v;
$extend(rt,{profile:"http://"+XN.env.domain+"/profile.do?id="+v.id});
return false;
}
});
return rt;
},_onload:function(r){
this.config.qkey=r.qkey;
this._allFriends=r.candidate;
sortByName(this._allFriends);
this._groups=r.groups;
XN.log(this._groups);
this.renderFilter();
this.resetFilter();
this.menu.refresh();
this.isLoading=false;
this._ready=true;
this.fireEvent("load");
}});
XN.event.enableCustomEvent(_7);
})(XN.ui);

