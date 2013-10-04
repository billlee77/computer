XN.namespace("ui");
XN.ui.miniEditor=function(p){
$extend(this,p);
this.getEmoList();
};
XN.ui.miniEditor.prototype=$extend({},XN.ui.element);
$extend(XN.ui.miniEditor.prototype,{_emoRendered:false,IDofEditor:"miniEditor",IDofForm:"miniEditorForm",IDofAction:"miniEditorAction",IDofEmoHolder:"miniEditorEmoHolder",IDofEmoHeader:"miniEditorEmoTabHolder",IDofEmoTab:"miniEditorEmoTab",IDofEmoList:"miniEditorEmoList",IDofTextarea:"miniEditorTextarea",IDofNotVipTip:"notVipTip",IDofUploadBtn:"addPhotoBtn",emoList:"",_emoList:null,ubbPrefix:"",ubbSuffix:"",_inputPos:{"start":0,"end":0,"item":[0,0]},allowAddLink:true,allowAddPhoto:false,isVip:false,emoAlignType:"3-2",emoOffsetX:0,emoOffsetY:-1,emoType:0,_emoKind:{"0":{name:"\u9ed8\u8ba4\u8868\u60c5"},"1":{name:"\u963f\u72f8"},"2":{name:"\u56e7\u56e7\u718a"}},getEmoList:function(){
var _2=this,_3="http://status."+XN.env.domain+"/getubblist.do?type="+this.emoType;
new XN.net.xmlhttp({url:_3,method:"GET",onSuccess:function(r){
_2.emoList=r.responseText;
XN.log(_2.emoList);
window.setTimeout(function(){
_2.init();
},0);
},onError:XN.func.empty});
},init:function(){
var _5=this;
this.initAction();
this.renderEmotion();
try{
this.renderUploadPhoto();
}
catch(e){
}
XN.event.addEvent($(this.IDofTextarea),"keyup",function(){
_5.getInputPos();
});
XN.event.addEvent($(this.IDofTextarea),"mouseup",function(){
_5.getInputPos();
});
XN.event.addEvent($(this.IDofTextarea),"focus",function(){
_5.getInputPos();
});
XN.dom.ready(function(){
_5.getInputPos();
});
if($("emoBtn")){
XN.event.addEvent($("emoBtn"),"click",function(e){
XN.event.stop(e||window.event);
if(!_5._emoRendered){
_5.renderEmotion();
}
_5.showEmotion();
});
XN.event.addEvent($(this.IDofEmoHolder),"click",function(e){
var e=e||window.event;
if(e.ctrlKey){
XN.event.stop(e);
}
_5.parseEmotion(e);
});
XN.event.addEvent(document,"click",function(e){
_5.hideEmotion(e);
});
XN.event.addEvent($(this.IDofEmoHolder),"mouseover",function(e){
XN.event.stop(e||window.event);
_5.previewEmotion(e);
});
XN.event.addEvent($(this.IDofEmoHolder),"mouseout",function(e){
_5.hidePreviewEmotion(e);
});
}
if($("addLinkBtn")){
XN.event.addEvent($("addLinkBtn"),"click",function(e){
XN.event.stop(e||window.event);
_5.showAddLinkFlyer();
});
}
XN.log("miniEditor inited");
},initAction:function(){
if(this.allowAddLink){
$(this.IDofAction).appendHTML("<a href=\"###\" id=\"addLinkBtn\" class=\"m-editor-addlink\">\u94fe\u63a5</a>");
}
if(this.allowAddPhoto){
$(this.IDofAction).appendHTML("<span href=\"###\" class=\"m-editor-photo\"><span id=\""+this.IDofUploadBtn+"\"></span><span id=\"miniEditorPhotoInfo\"></span><a id=\"miniEditorDeletePhoto\" href=\"#nogo\" class=\"delete\" style=\"display:none\">\u5220\u9664</a></span>");
}
$(this.IDofAction).appendHTML("<a href=\"###\" id=\"emoBtn\" class=\"m-editor-emo\">\u8868\u60c5</a>");
},showEmotion:function(){
XN.log("show emotion");
var _c=this;
if(!this._emoClicked){
setTimeout(function(){
$(_c.IDofEmoList).innerHTML=$(_c.IDofEmoList).innerHTML.replace(/emosrc/g,"src");
},0);
this._emoClicked=true;
}
this._emoHolder.show();
},hideEmotion:function(){
XN.log("hide emotion");
if(this._previewHolder){
this._previewHolder.hide();
}
if(this._emoHolder){
this._emoHolder.hide();
}
},renderEmotion:function(){
if(!this.emoList){
$("emoBtn").hide();
return;
}
var _d=this._emoList=XN.json.parse(this.emoList).ubbList;
var _e={},_f={},tab={},_11="",_12="",_13="",_14="",_15=0,_16=[];
for(var p in this._emoKind){
_e[p]=[];
_f[p]="";
tab[p]=this._emoKind[p].name;
}
for(var i=0;i<_d.length;i++){
var _19="";
if(XN.browser.IE6){
_19=" onmouseover='this.style.borderColor=\"#808080\"' onmouseout='this.style.borderColor=\"#B8D4E8\"'";
}
if(_d[i].size==2){
_12=" preview=\"true\" ";
}
if(_d[i].kind==1||_d[i].kind==2){
_13=" forvip=\"true\" ";
}else{
_13=" forvip=\"false\" ";
}
_e[_d[i].kind].push("<li title=\""+_d[i].alt+"\" "+_19+"><img emosrc=\"http://xnimg.cn/"+_d[i].src+"\" alt=\""+_d[i].alt+"\" emotion=\""+_d[i].ubb+"\""+_12+_13+" /></li>");
}
var _1a="style=\"display:block\"";
for(var p in _e){
if(_e[p].length>0){
_f[p]="<ul class=\"emo-list\" "+_1a+" id=\"emoList"+p+"\">";
_f[p]+=_e[p].join("");
_f[p]+="</ul>";
$(this.IDofEmoList).appendHTML(_f[p]);
if(p==1||p==2){
_11="<img src=\""+XN.env.staticRoot+"imgpro/minieditor/viptabbg.png\" align=\"top\" title=\"VIP\u4e13\u7528\" />";
}
$(this.IDofEmoTab).appendHTML("<li id=\"emoTab"+p+"\"><a href=\"###\" onfocus=\"this.blur()\">"+"&nbsp;"+tab[p]+"&nbsp;"+_11+"</a></li>");
_15++;
_16.push(p);
_1a="style=\"display:none\"";
}
}
if(_15>1){
var _1b=this;
$(this.IDofEmoHeader).show();
var tv=new XN.ui.tabView({activeClass:"current"});
for(var i=0;i<_16.length;i++){
tv.addTab({label:"emoTab"+_16[i],active:(i==0),onActive:(function(i){
return function(){
var _ct=tv.getCurrentTab().label;
$(_ct.replace("emoTab","emoList")).hide();
$("emoList"+_16[i]).show();
if(_1b._previewHolder){
_1b._previewHolder.hide();
}
_1b.hideNotVip();
};
})(i)});
}
}
var _1f={alignWith:this.IDofTextarea,tagName:"div",alignType:this.emoAlignType,offsetX:this.emoOffsetX,offsetY:this.emoOffsetY};
this._emoHolder=new XN.ui.fixPositionElement(_1f);
this._emoHolder.setContent($(this.IDofEmoHolder));
this._emoHolder.hide();
$(this.IDofEmoHolder).show();
this._emoRendered=true;
XN.log("emotion render ok");
},parseEmotion:function(e){
var img=XN.event.element(e),_22=this;
if(img.tagName.toLowerCase()=="li"){
img=img.getElementsByTagName("img")[0];
}
if(img&&img.tagName.toLowerCase()=="img"){
var _23=(img.getAttribute("forvip")==="true"),ubb=img.getAttribute("emotion"),_25=_22.isVip;
if(_23&&!_25){
_22.showNotVip(e);
}else{
_22.addEmotion(ubb);
}
}
},addEmotion:function(_26){
if(!this._inputHelper){
this._inputHelper=new XN.FORM.inputHelper($(this.IDofTextarea));
}
var _27=$(this.IDofTextarea);
var pos=this._inputPos;
var _29=this;
if(this.ubbPrefix){
_26=this.ubbPrefix+_26;
}
if(this.ubbSuffix){
_26+=this.ubbSuffix;
}
_27.value=_27.value.slice(0,pos.start)+_26+_27.value.slice(pos.end);
_27.blur();
setTimeout(function(){
_29._inputHelper.focus(pos.start+_26.length);
_29.getInputPos();
},10);
},showNotVip:function(e){
$(this.IDofEmoList).hide();
$(this.IDofNotVipTip).show();
if(this._previewHolder){
this._previewHolder.hide();
}
XN.event.stop(e||window.event);
},hideNotVip:function(e){
$(this.IDofNotVipTip).hide();
$(this.IDofEmoList).show();
},previewEmotion:function(e){
img=XN.event.element(e);
var _2d=this;
if(img.tagName.toLowerCase()=="a"){
img=img.getElementsByTagName("img")[0];
}
if(img&&img.tagName.toLowerCase()=="img"){
var _2e=img.getAttribute("preview");
if(_2e){
if(!this._previewHolder){
var _2f={alignWith:this.IDofEmoList,tagName:"div",alignType:"2-2",offsetX:(XN.browser.IE6?-1:(XN.browser.IE?1:0)),offsetY:(XN.browser.IE?1:0)};
this._previewHolder=new XN.ui.fixPositionElement(_2f);
this._previewHolder.container.setStyle("background:#fff;padding:1px;width:50px;height:50px;border:1px solid #B8D4E8;");
this._previewHolder.container.className="meditor-emo-preview";
this._previewHolder.container.id="mEditorPreviewHolder";
this._previewHolder.setContent("<img id=\"previewIMG\" class=\"m-editor-preview-img\" src=\""+img.src+"\" />");
XN.event.addEvent($("mEditorPreviewHolder"),"mouseover",function(){
var _30=_2d._previewHolder.alignType=="1-1"?"2-2":"1-1";
if(XN.browser.IE6){
var _31=_2d._previewHolder.alignType=="1-1"?-1:1;
_2d._previewHolder.setOffsetX(_31);
}
_2d._previewHolder.setAlignType(_30);
});
}
this._previewHolder.hide();
$("previewIMG").src=img.src;
this._previewHolder.show();
}
}
},hidePreviewEmotion:function(e){
el=XN.event.element(e);
if(el.tagName.toLowerCase()=="ul"&&this._previewHolder){
this._previewHolder.hide();
}
},showAddLinkFlyer:function(){
var _33=this,pos=this._inputPos,_35="";
if(pos.start!=pos.end){
_35="display:none";
}
var _36="<div style=\"text-align:center;\">"+"<label style=\"display:block;margin:5px 0;\">\u7f51\u5740\uff1a<input type=\"text\" class=\"input-text\" id=\"mEditorUrl\" style=\"width:230px;\" /></label>"+"<label style=\"display:block;margin:5px 0;"+_35+"\">\u6587\u5b57\uff1a<input type=\"text\" class=\"input-text\" id=\"mEditorTxt\" style=\"width:230px;\" /></label>"+"</div>";
XN.DO.confirm({msg:_36,title:"\u6dfb\u52a0\u94fe\u63a5",yes:"\u6dfb\u52a0",callBack:function(y){
if(y){
_33.addLink();
}
}});
},addLink:function(){
var _38=$("mEditorUrl").value,_39="",_3a=$(this.IDofTextarea),pos=this._inputPos,_3c=this;
if(!_38){
return;
}
if(!this._inputHelper){
this._inputHelper=new XN.FORM.inputHelper($(this.IDofTextarea));
}
if(pos.start!=pos.end){
_39=_3a.value.slice(pos.start,pos.end);
}else{
_39=$("mEditorTxt").value;
if(!_39){
_39=_38;
}
}
if(!/^(http:\/\/|https:\/\/)/.test(_38)){
_38="http://"+_38;
}
var _3d="[url="+encodeURI(_38)+"]"+_39+"[/url]";
_3a.value=_3a.value.slice(0,pos.start)+_3d+_3a.value.slice(pos.end);
_3a.blur();
setTimeout(function(){
_3c._inputHelper.focus(pos.start+_3d.length);
_3c.getInputPos();
},10);
},renderUploadPhoto:function(){
var btn=$(this.IDofUploadBtn);
if(!btn){
return;
}
if(!window.SWFUpload){
return;
}
var _3f=$(this.IDofUploadBtn).parentNode;
var _40=this;
var _41=new SWFUpload({upload_url:"http://upload."+XN.env.domain+"/uploadservice.fcgi?pagetype=gossipAddPhoto&societyguester="+XN.cookie.get("societyguester")+"&hostid="+XN.cookie.get("id")+"&t="+XN.cookie.get("t"),flash_url:"http://s.xnimg.cn/jspro/swfupload.v2.2.0.1/swfupload.swf",file_size_limit:"10 MB",file_types:"*.jpg;*.jpeg;*.png;*.bmp;*.gif",file_types_description:"All Image Files",file_upload_limit:60,file_queue_limit:0,debug:false,button_placeholder_id:this.IDofUploadBtn,button_cursor:SWFUpload.CURSOR.HAND,button_width:28,button_height:23,button_image_url:"http://xnimg.cn/a.gif",button_text:"<span class=\"text\">\u56fe\u7247</span>",button_text_style:".text {text-align:left;color:#005EAC;font-family:tahoma,simsun;font-size:12px;font-family:Tahoma,Verdana,simsun,sans-serif;}",button_text_top_padding:2,button_action:SWFUpload.BUTTON_ACTION.SELECT_FILE,button_cursor:SWFUpload.CURSOR.HAND,button_window_mode:SWFUpload.WINDOW_MODE.TRANSPARENT,file_queued_handler:function(){
try{
_41.setButtonDimensions(0,0);
}
catch(e){
XN.DO.showError("\u5bf9\u4e0d\u8d77\uff0c\u4f60\u7684\u6d4f\u89c8\u5668\u6682\u65f6\u4e0d\u652f\u6301\u6b64\u529f\u80fd\uff0c\u8bf7\u66f4\u6362\u6d4f\u89c8\u5668\u3002");
}
this.startUpload();
},upload_error_handler:function(_42,_43,_44){
XN.DO.showError(_44+""+_43+""+_42);
},upload_progress_handler:function(_45,_46,_47){
$("miniEditorPhotoInfo").show();
$("miniEditorPhotoInfo").innerHTML="\u6b63\u5728\u6dfb\u52a0... "+parseInt(_46/_47*100)+"%";
},upload_success_handler:function(_48,r){
var _4a=this;
function restoreUpload(){
$("emoBtn").show();
_4a.setButtonDimensions(28,23);
_4a.setButtonText("<span class=\"text\">\u56fe\u7247</span>");
$($("miniEditorPhotoInfo").parentNode).delClass("attached");
$("miniEditorDeletePhoto").hide();
$("miniEditorPhotoInfo").hide();
$("gossipLargeUrl").value="";
$("gossipHeadUrl").value="";
if(window.commentPost){
commentPost.hasPhoto=false;
}
_40.fireEvent("uploadDel");
}
var _4b=XN.json.parse(r);
if(_4b.code!=1){
XN.DO.showError(_4b.msg);
restoreUpload();
return;
}
$("gossipLargeUrl").value=_4b.large;
$("gossipHeadUrl").value=_4b.thumbnail;
$("emoBtn").hide();
function textEllipsis(str,_4d){
if(!_4d){
_4d=10;
}
return str.length>_4d?(str.substr(0,_4d)+"..."):str;
}
$("miniEditorPhotoInfo").innerHTML=textEllipsis(_48.name.substr(0,_48.name.lastIndexOf(".")),10)+_48.type;
$($("miniEditorPhotoInfo").parentNode).addClass("attached");
$("miniEditorPhotoInfo").className="file-name";
$("miniEditorPhotoInfo").show();
$("miniEditorDeletePhoto").show();
$("miniEditorDeletePhoto").onclick=restoreUpload;
this.setButtonDimensions(0,0);
if(window.commentPost){
commentPost.afterPost=restoreUpload;
commentPost.hasPhoto=true;
}
_40.fireEvent("uploadSus",{restore:restoreUpload});
}});
},getInputPos:function(){
var _4e=$(this.IDofTextarea);
var _4f=0,end=0;
if(typeof (_4e.selectionStart)=="number"){
_4f=_4e.selectionStart;
end=_4e.selectionEnd;
}else{
if(document.selection){
var _51=document.selection.createRange();
if(_51.parentElement()==_4e){
var _52=document.body.createTextRange();
_52.moveToElementText(_4e);
for(_4f=0;_52.compareEndPoints("StartToStart",_51)<0;_4f++){
_52.moveStart("character",1);
}
for(var i=0;i<=_4f;i++){
if(_4e.value.charAt(i)=="\n"){
_4f++;
}
}
var _52=document.body.createTextRange();
_52.moveToElementText(_4e);
for(end=0;_52.compareEndPoints("StartToEnd",_51)<0;end++){
_52.moveStart("character",1);
}
for(var i=0;i<=end;i++){
if(_4e.value.charAt(i)=="\n"){
end++;
}
}
}
}
}
this._inputPos={"start":_4f,"end":end,"item":[_4f,end]};
XN.log(this._inputPos);
}});
XN.event.enableCustomEvent(XN.ui.miniEditor.prototype);

