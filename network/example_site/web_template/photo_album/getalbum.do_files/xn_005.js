try{
var href=window.location.href;
var currPid=/id=(\d+)/.exec(href)[1];
var hash=/#(\d+)/.exec(href);
if(hash&&hash[1]!=currPid){
href=href.replace(/id=\d+/g,"id="+hash[1]);
window.location.href=href;
}
}
catch(e){
}
XN.PAGE.albumPhoto={bDisable:false,urlPhoto:"http://photo."+XN.env.domain+"",urlLoadPhoto:"/ajaxgetphoto.do",urlProfile:"http://"+XN.env.domain+"/profile.do",urlMessage:"http://msg."+XN.env.domain+"/SendMessage.do",urlEditPhoto:"http://photo."+XN.env.domain+"/editphoto.do",urlGetPhoto:"http://photo."+XN.env.domain+"/getphoto.do",urlDeletePhoto:"/deletephoto.do",urlDeletePhotoTag:"/delphototag.do",urlPhoto2Class:"http://class."+XN.env.domain+"/outerphoto.do",urlPhoto2Gift:"http://diy."+XN.env.domain+"/coop/diy.html",urlMobile:"http://mobile."+XN.env.domain+"",urlPhotoReport:"http://admin."+XN.env.domain+"/admin/newuserreport.do",urlGetExif:"http://photo."+XN.env.domain+"/demo/getexif.do",urlMobileIcon:"http://s.xnimg.cn/img/mobile-intro/tinymobile.gif",urlVipIcon:"http://s.xnimg.cn/imgpro/icons/vip_f.gif",urlVipActionUrl:"http://i."+XN.env.domain+"/index.action?wc=290000",urlSaveTitle:"/ajaxeditphoto.do",urlSetAsCover:"/ajaxsetascover.do",cssPhotoTitleHover:"photo-title-hover",tsc:"",adminAuth:15,albumType:0,albumOwner:0,photoCount:0,albumControl:0,passwordProtected:false,currentPhotoId:0,firstPhotoId:0,currentUserId:0,currentUserAuth:0,currentUserName:"",currentGuestId:0,currentGuestName:"",currentUserHeadUrl:"",cache:{},errorIdCache:{"0":1},cacheIds:{},maxPhotoInCache:300,uiLink:"/getphoto.do",uiIdPrevious:"previous",uiIdNext:"next",uiIdPhoto:"photo",uiIdPhotoDate:"photoDate",uiIdPhotoContainer:"photoContainer",uiIdTags:"tagList",commentsBoxId:"talk",viewCountId:"viewCount",commentCountId:"commentCount",uiIdPhotoPosition:"photoPosition",uiIdLinkPhotoEdit:"urlPhotoEdit",uiIdLinkPhotoDelete:"urlPhotoDelete",uiIdLinkPhoto2Class:"urlPhoto2Class",uiIdLinkPhoto2Gift:"urlPhoto2Gift",uiIdLinkPhotoReport:"urlPhotoReport",uiIdPhotoReportUrlContainer:"photoReportUrlContainer",uiIdPhotoTagUrlContainer:"photoTagUrlContainer",uiIdPhotoEditUrlContainer:"photoEditUrlContainer",uiIdPhotoDeleteUrlContainer:"photoDeleteUrlContainer",uiIdPhoto2ClassUrlContainer:"photo2ClassUrlContainer",uiIdPhoto2GiftUrlContainer:"photo2GiftUrlContainer",uiIdPhoto2HeadUrlContainer:"photoProfileSetContainer",uiIdPhotoGetExifUrlContainer:"photoGetExifUrlContainer",uiIdPhotobeautify:"photo_beautify",uiIdShare:"share-actions",uiIdShareLink:"link",uiIdShareType:"type",uiIdShareTitle:"title",uiIdSharePic:"pic",uiIdShareFromno:"fromno",uiIdShareFromname:"fromname",uiIdShareFromuniv:"fromuniv",uiIdShareAlbumid:"albumid",uiIdShareSummary:"summary",uiIdShareLargeUrl:"largeurl",uiIdPhotoTitle:"photoTitle",uiIdPhotoTitleEditError:"photoTitleEditErr",uiIdPhotoTitleEditor:"photoTitleEditor",uiIdPhotoTitleEditForm:"photoTitleEditForm",uiIdPhotoTitleSaveBtn:"btnSaveTitle",uiIdPhotoTitleCancelBtn:"btnCancelTitle",msgTitleEditPrompt:"\u5355\u51fb\u6b64\u5904\u6dfb\u52a0\u63cf\u8ff0",msgTitleEditDescLong:"\u63cf\u8ff0\u4e0d\u80fd\u591a\u4e8e200\u4e2a\u5b57\u7b26",uiIdCommentEditorForm:"commentEditorForm",uiIdCommentEditorBtn:"editorFormBtn",uiIdCommentEditorError:"ajax_msgerror",uiIdSetAsCover:"photoEditSetAsCover",historyTimer:null,dir:"next",firstRender:false,hasMore:false,curOldestCommentId:null,isRefresh:false,init:function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d){
this.currentUserId=_1;
this.currentUserAuth=_2;
this.currentUserName=_3;
this.currentGuestId=_4;
this.currentGuestName=_5;
this.albumOwner=_7;
this.albumType=_8;
this.albumControl=_9;
this.currentUserHeadUrl=_6;
this.photoCount=_a;
this.tsc=_c;
this.passwordProtected=_d;
var _e=new SliderGallery(this.photoCount);
this.gallery=_e;
this.addCachedPhoto(_b);
this.firstPhotoId=_b.photo.id;
this.currentPhotoId=_b.photo.id;
TagManage.init(this.currentUserId);
_b.image=new Image();
_b.image.src=_b.photo.large;
this.updateCurOldestCommentId(_b);
this.updateHasMore(_b);
if(SpeedTest){
SpeedTest.cached=true;
SpeedTest.uid=_4;
}
this.imgLazyload=new HeadLazyload();
var s=this;
this.no_image="http://s.xnimg.cn/img/no-image.png";
if(this.currentUserId==this.albumOwner){
$(this.uiIdPhotoTitle).hover(this.cssPhotoTitleHover);
XN.EVENT.addEvent(this.uiIdPhotoTitle,"click",function(e){
s.titleEditorShow();
},false);
XN.EVENT.addEvent(this.uiIdPhotoTitleSaveBtn,"click",function(e){
s.titleEditorSave();
},false);
XN.EVENT.addEvent(this.uiIdPhotoTitleCancelBtn,"click",function(e){
s.titleEditorHide();
},false);
}
this.ban=false;
XN.EVENT.addEvent("cmtbody","focus",function(e){
if(s.ban){
s.commentEditorShowError("\u5f53\u524d\u7167\u7247\u88ab\u5c01\u7981\u4e0d\u80fd\u7559\u8a00");
var _14=$("editorFormBtn");
_14.disabled=true;
_14.value="\u7981\u6b62\u7559\u8a00";
_14.className="input-button gray";
}
},false);
XN.EVENT.addEvent(this.uiIdCommentEditorBtn,"click",function(e){
s.commentEditorSave();
},false);
XN.EVENT.addEvent(this.uiIdPhotoGetExifUrlContainer,"mouseover",function(e){
s.uiGetExif();
},false);
XN.EVENT.addEvent(this.uiIdPhotoGetExifUrlContainer,"mouseout",function(e){
s.hideExif();
},false);
if(this.photoCount<=1){
$("photoContainer").title="\u53ea\u6709\u8fd9\u4e00\u5f20\u56fe\u7247";
$("photoContainer").style.cursor="";
}else{
XN.EVENT.addEvent("photoContainer","mousemove",function(e){
if(s.bDisable){
return;
}
var obj=$("photoContainer");
var _1a=obj.offsetWidth;
var x=s.getElementX(e);
if(x>_1a*0.4){
if(obj.style.cursor!="url(\"http://s.xnimg.cn/imgpro/arrow/next.cur\"),auto"){
obj.style.cursor="url(\"http://s.xnimg.cn/imgpro/arrow/next.cur\"),auto";
}
obj.title="\u70b9\u51fb\u67e5\u770b\u4e0b\u4e00\u5f20";
s.dir="next";
}else{
if(obj.style.cursor!="url(\"http://s.xnimg.cn/imgpro/arrow/pre.cur\"),auto"){
obj.style.cursor="url(\"http://s.xnimg.cn/imgpro/arrow/pre.cur\"),auto";
}
obj.title="\u70b9\u51fb\u67e5\u770b\u4e0a\u4e00\u5f20";
s.dir="prev";
}
});
this.lastTime=new Date().valueOf();
this.clickToNextFun=function(e){
if(s.bDisable){
return;
}
var d=new Date().valueOf();
if(d-s.lastTime<200){
return;
}
s.lastTime=d;
var _1e=s.getCachedPhoto(s.currentPhotoId);
if(_1e){
(s.dir=="next")?_e.showNext():_e.showPrevious();
}
XN.Event.stop(e);
};
XN.EVENT.addEvent("photoContainer","click",this.clickToNextFun);
}
XN.DOM.readyDo(function(){
(function(){
s.checkBrowserHistory();
setTimeout(arguments.callee,200);
})();
});
this.firstRender=true;
this.view(this.currentPhotoId);
},getElementX:function(e){
return XN.event.pointerX(e)-$("photoContainer").realLeft();
},checkBrowserHistory:function(){
var pid;
try{
if(XN.BROWSER.IE){
pid=$("albumHistoryIframe").contentWindow.document.getElementById("photoId").value;
}else{
pid=window.location.hash.substring(1,1000);
}
if(pid&&pid!=this.currentPhotoId){
this.isRefresh=true;
if(parseInt(pid)>0){
this.view(pid);
}
}
}
catch(e){
}
},showPhotoLoading:function(){
var p=$("photo");
if(p){
p.hide();
p.src="";
p.title="";
}
$("photoContainer").style.background="#F7F7F7 url(http://s.xnimg.cn/imgpro/bg/bg_line_loading.gif) no-repeat center center";
},view:function(id){
this.isRefresh=true;
this.showPhotoLoading();
if(this.clearloadImgFun){
this.clearloadImgFun();
}
this.fireEvent("photoBeginLoad");
this.delErrorIDCache(id);
this.imgLazyload.init();
this.updateUI(id);
if(!this.firstRender&&$("info")){
$("info").style.display="none";
}
this.firstRender=false;
},ajaxGetPhoto:function(id){
if(this.getCachedPhoto(id)!=null){
return;
}
if(this.cacheIds[id]){
return;
}
if(this.isErrorID(id)){
return;
}
this.cacheIds[id]=1;
var s=this;
var _25="id="+id+"&owner="+this.albumOwner+"&t="+this.tsc;
if(this.currentPhotoId!=this.firstPhotoId&&this.currentPhotoId!=id){
_25+="&photoViewed="+this.currentPhotoId;
}
var _26=0;
var _27=function(r){
clearTimeout(_29);
delete s.cacheIds[id];
var t=r.responseText;
try{
var obj=XN.JSON.parse(t);
}
catch(e){
s.addErrorIDCache(id,t);
return;
}
var img=new Image();
img.src=obj.photo.large;
s.addCachedPhoto(obj,id);
};
var _2d=function(){
clearTimeout(_29);
get();
};
var _29;
var get=function(){
if(_26++>5){
delete s.cacheIds[id];
s.addErrorIDCache(id);
return;
}
_29=setTimeout(function(){
if(_2f){
_2f.abort();
}
get();
},10000);
var _2f=new XN.NET.xmlhttp({url:s.urlLoadPhoto,data:_25,onSuccess:_27,onError:_2d});
};
get();
},isErrorID:function(id){
return !!this.errorIdCache[id];
},addErrorIDCache:function(id,obj){
if(!id){
return;
}
this.errorIdCache[id]=obj||1;
},delErrorIDCache:function(id){
if(!id){
return;
}
delete this.errorIdCache[id];
},_cacheIDList:[],addCachedPhoto:function(obj,id){
if(!obj){
return;
}
var id=id||obj.photo.id;
this.cache[id]=obj;
this._cacheIDList.push(id);
delete this.errorIdCache[obj.photo.id];
var _36={};
var _37=obj.photo;
_36.currId=_37.id;
_36.currUrl=_37.tinyUrl;
_36.nextId=_37.previous;
_36.nextUrl=_37.previousUrl;
_36.prevId=_37.next;
_36.prevUrl=_37.nextUrl;
_36.flag=[!!_37.nextBanFlag,!!_37.ban,!!_37.preBanFlag];
this.gallery.addData(_36);
},getCachedPhoto:function(id){
if(id==0){
return;
}
return this.cache[id];
},getRanomCachePhoto:function(){
var _39=this._cacheIDList||[];
var i=(Math.random()*_39.length)>>0;
var id=_39[i];
return id?this.cache[id]:null;
},removeCachedPhoto:function(id){
delete this.cache[id];
},cleanCache:function(){
return;
for(var i=0;i<this.cache.length;i++){
if(this.cache[i].photo.id==this.currentPhotoId){
break;
}
}
this.cache=this.cache.slice(i-50,i+50);
},updateUI:function(id){
if(id==0){
this.addErrorIDCache(0);
}
var p=this.getCachedPhoto(id);
if(!p){
if(this.isErrorID(id)){
p=this.getRanomCachePhoto();
if(!p){
XN.DO.showError("\u52a0\u8f7d\u56fe\u7247\u5931\u8d25\uff0c\u8bf7\u60a8\u5237\u65b0\u91cd\u8bd5\uff01");
return;
}
}else{
this.ajaxGetPhoto(id);
var s=this;
setTimeout(function(){
s.updateUI(id);
},100);
return;
}
}
var id=p.photo.id;
this.currentPhotoId=id;
this.updateImage(p.photo);
this.updateLink(p.photo);
this.updateTitle(p.photo.title);
this.updateViewCount(p.photo.viewCount);
this.updateBrowserHistory(id);
try{
this.updateHasMore(p);
this.updateCurOldestCommentId(p);
}
catch(e){
}
this.updateCommBan(p);
this.updateCommentCount(p.commentCount);
this.updateAllCount(p.photoSum);
this.updateSerial(p.photo);
this.updateTag(p.tags);
this.updatePhotoTag();
this.updateShare(p);
this.gallery.Move();
this.updateComment(p.comments);
$(this.uiIdCommentEditorForm).elements["id"].value=this.currentPhotoId;
var _41=this;
setTimeout(function(){
_41.ajaxGetPhoto(_41.dir=="next"?p.photo.previous:p.photo.next);
},500);
},updateCommBan:function(p){
this.ban=!!p.photo.ban;
this.commentEditorHideError();
var _43=$("editorFormBtn");
_43.disabled=false;
_43.value="\u53d1\u8868\u8bc4\u8bba";
_43.className="input-button";
},updateBrowserHistory:function(id){
window.location.hash=id;
try{
if(XN.BROWSER.IE){
if($("albumHistoryIframe")){
var doc=$("albumHistoryIframe").contentWindow.document;
var el=doc.getElementById("photoId");
if(!el||el.value!=this.currentPhotoId){
doc.open();
doc.write("<html><body><input type=\"text\" id=\"photoId\" value=\""+id+"\"/>"+id+"</body>");
doc.write("<script>");
doc.write("document.domain = \""+XN.env.domain+"\";");
doc.write("</script>");
doc.write("</html>");
doc.close();
}
}
}
}
catch(e){
}
},updateLink:function(_47){
if(_47.ban==false&&!this.passwordProtected&&this.albumControl!=-1){
$(this.uiIdPhotoTagUrlContainer).show();
$("photoTagUrlPipe").show();
}else{
$(this.uiIdPhotoTagUrlContainer).hide();
$("photoTagUrlPipe").hide();
}
if(_47.ban==false&&this.currentUserId!=this.currentGuestId){
if($(this.uiIdPhotoReportUrlContainer)){
$(this.uiIdPhotoReportUrlContainer).show();
}
if($(this.uiIdLinkPhotoReport)){
$(this.uiIdLinkPhotoReport).href=this.urlPhotoReport+"?type=2&contentId="+_47.id+"&userId="+this.currentGuestId+"&origURL="+encodeURIComponent(this.urlGetPhoto+"?id="+_47.id+"&owner="+this.currentGuestId);
}
}else{
if($(this.uiIdPhotoReportUrlContainer)){
$(this.uiIdPhotoReportUrlContainer).hide();
}
if($(this.uiIdLinkPhotoReport)){
$(this.uiIdLinkPhotoReport).href="#";
}
}
if(!!$(this.uiIdPhotobeautify)){
$(this.uiIdPhotobeautify).href="http://i."+XN.env.domain+"/pe/home.action?photoid="+_47.id;
}
if(this.currentUserId!=this.currentGuestId&&this.currentUserAuth>=this.adminAuth){
$("edit-buttonContainer").show();
$("photo_editPipe").show();
$(this.uiIdPhotoEditUrlContainer).hide();
$(this.uiIdPhotoDeleteUrlContainer).show();
$(this.uiIdLinkPhotoDelete).href=this.urlDeletePhoto+"?id="+_47.id+"&owner="+_47.owner;
$(this.uiIdSetAsCover).hide();
$(this.uiIdPhoto2HeadUrlContainer).hide();
return;
}
if(this.currentUserId==this.currentGuestId){
$("edit-buttonContainer").show();
$("photo_editPipe").show();
}else{
$("edit-buttonContainer").hide();
$("photo_editPipe").hide();
return;
}
if(_47.ban==false){
$(this.uiIdPhotoEditUrlContainer).show();
$(this.uiIdLinkPhotoEdit).href=this.urlEditPhoto+"?id="+_47.id;
}else{
$(this.uiIdPhotoEditUrlContainer).hide();
$(this.uiIdLinkPhotoEdit).href="#";
}
if(this.currentUserAuth>=this.adminAuth||this.currentUserId==this.currentGuestId&&(_47.headUrl2!=this.currentUserHeadUrl)){
$(this.uiIdPhotoDeleteUrlContainer).show();
$(this.uiIdLinkPhotoDelete).href=this.urlDeletePhoto+"?id="+_47.id+"&owner="+_47.owner;
}else{
$(this.uiIdPhotoDeleteUrlContainer).hide();
$(this.uiIdLinkPhotoDelete).href="#";
}
if(_47.ban==false&&this.albumType!=1){
$(this.uiIdSetAsCover).show();
}else{
$(this.uiIdSetAsCover).hide();
}
if(_47.ban==false&&_47.headUrl2!=this.currentUserHeadUrl){
$(this.uiIdPhoto2HeadUrlContainer).show();
}else{
$(this.uiIdPhoto2HeadUrlContainer).hide();
}
},updateImage:function(_48){
var _49=$("photoContainer");
_48.ban=!!_48.ban;
this.ban=_48.ban;
var _4a=this,_4b=this.currentPhotoId;
if($("update_time")){
$("update_time").innerHTML=_48.date;
}
var _4c=function(url,id){
if(id!=_4b){
return;
}
var _4f="",_50=null;
if(_48.ban){
url="http://s.xnimg.cn/imgpro/album/banned_photo.jpg";
_4f="\u6b64\u7167\u7247\u5df2\u88ab\u5c01\u7981";
}
$("photo").title=_4f;
var img=new Image();
var _52=function(){
clearTimeout(_50);
img.onload=img.onabort=img.onerror=null;
img.src="";
};
var _53=function(){
clearTimeout(_50);
$("photo").src=_4a.no_image;
$("photoContainer").style.background="#F7F7F7";
$("photo").show();
};
var _54=function(){
_52();
_53();
};
_4a.clearloadImgFun=_52;
_50=setTimeout(_54,40000);
img.onload=function(){
clearTimeout(_50);
$("photo").src=url;
$("photoContainer").style.background="#F7F7F7";
$("photo").show();
_4a.fireEvent("photoLoaded");
};
img.onabort=img.onerror=_53;
img.src=url;
_4a.fireEvent("photoUpdate");
};
if(SpeedTest&&SpeedTest.check()){
new SpeedTest(_48.large,_4b,_4c);
}else{
_4c(_48.large,_4b);
}
if(SpeedTest){
SpeedTest.flush();
}
},updateCommentCount:function(_55){
$(this.commentCountId).innerHTML=_55?_55:0;
},updateComment:function(_56){
var _56=_56||[];
if(this.isRefresh){
this.commentEditorReset();
}
var _57="";
var _58=XN.dom.getElementsByClassName("replies","content","dl")[0];
_58.className=_58.className.replace(/\swith-arrow/ig,"");
_58.style.display="none";
if(this.hasMore){
if($("show-all-id")==null){
_57+="<dt id=\"show-all-id\" class=\"show-all\"><a href=\"#nologo\" id=\"showMoreComments\" onclick=\"showMoreComments();return false;\">\u663e\u793a\u8f83\u65e9\u4e4b\u524d\u7684\u8bc4\u8bba</a></dt>";
}else{
var tDt=$("show-all-id");
tDt.parentNode.removeChild(tDt);
_57+="<dt id=\"show-all-id\" class=\"show-all\"><a href=\"#nologo\" id=\"showMoreComments\" onclick=\"showMoreComments();return false;\">\u663e\u793a\u8f83\u65e9\u4e4b\u524d\u7684\u8bc4\u8bba</a></dt>";
}
}else{
var tDt=$("show-all-id");
if(tDt!=null){
tDt.parentNode.removeChild(tDt);
}
}
if(_56.length!=0){
_58.style.display="block";
for(var i=_56.length-1;i>-1;i--){
var _5b=_56[i];
_57+="<dd id=\"talk"+_5b.id+"\">"+"    <a title=\""+_5b.name+"\" href=\""+this.urlProfile+"?id="+_5b.author+"\"><img alt=\""+_5b.name+"\" lazyload-src=\""+_5b.headUrl+"\" class=\"avatar\"/></a>"+"    <div class=\"info\">";
if(this.currentUserId==_5b.author){
_57+="<span class=\"float-right\"> <a class=\"x-to-hide\" onclick=\"XN.PAGE.albumPhoto.commentEditorDelete("+_5b.id+","+_5b.owner+");return false;\" href=\"#nogo\"></a></span>";
}else{
if(this.currentUserId==_5b.owner||this.currentUserAuth>=this.adminAuth){
_57+="<span class=\"float-right\">\t<a class=\"x-to-hide\" onclick=\"XN.PAGE.albumPhoto.commentEditorDelete("+_5b.id+","+_5b.owner+");return false;\" href=\"#nogo\"></a></span>";
}
}
if(_5b.whisper){
_57+="<span class=\"whisper float-right\">\u6084\u6084\u8bdd</span>";
}
_57+="<a title=\""+_5b.name+"\" href=\""+this.urlProfile+"?id="+_5b.author+"\">"+_5b.name+"</a>";
if(_5b.isVip===true){
_57+="&nbsp;<a href=\""+this.urlVipActionUrl+"\" target=\"_blank\" title=\"VIP\"><img src="+this.urlVipIcon+" alt =\" VIP\"/></a>";
}
_57+=" <span class=\"time\">"+_5b.time+"</span>";
_57+="</div>";
var _5c=_5b.body.replace(/\n/g,"<br />").replace("<xiaonei_wap/>","<a href=\""+this.urlMobile+"\"><img class=\"mb-message\" src=\""+this.urlMobileIcon+"\" alt=\"\u901a\u8fc7\u624b\u673a\u53d1\u5e03\" title=\"\u901a\u8fc7\u624b\u673a\u53d1\u5e03\"/></a>");
_5c=_5c.replace(/((%[0-9A-F]{2}){3})/g,function(_5d){
try{
return decodeURIComponent(_5d);
}
catch(e){
return _5d;
}
});
_57+="<div class=\"reply\"><p class=\"content\">"+_5c+"</p>";
if(this.currentUserId!=_5b.author){
_57+="&nbsp;<a onclick=\"XN.PAGE.albumPhoto.replyComment("+"'"+_5b.name+"','"+_5b.author+"', "+(_5b.whisper?"true":"false")+");return false;\" href=\"#nogo\">\u56de\u590d</a>";
}
_57+="</div>"+"</dd>";
}
var tdl=$element("dl");
tdl.className="replies";
tdl.innerHTML=_57;
(function(con,_60){
setTimeout(function(){
_60.imgLazyload.addContainer(tdl);
},100);
})(tdl,this);
if(this.isRefresh){
var _61=_58.parentNode;
var _62=XN.dom.getElementsByClassName("replies","content","dl");
for(var i=0;i<_62.length;i++){
_61.removeChild(_62[i]);
}
_61.appendChild(tdl);
}else{
_58.parentNode.insertBefore(tdl,_58);
}
}
if(_56.length==0&&this.isRefresh){
try{
var _61=_58.parentNode;
var _62=XN.dom.getElementsByClassName("replies","document","dl");
for(var i=1;i<_62.length;i++){
_61.removeChild(_62[i]);
}
}
catch(e){
}
_58.innerHTML="";
}
if(this.isRefresh){
XN.page.albumPhoto.fireEvent("onPhotoRefresh",this.currentPhotoId);
}
this.isRefresh=false;
},updateCurOldestCommentId:function(_63){
if(_63.comments.length==0){
return;
}
this.curOldestCommentId=_63.comments[_63.comments.length-1].id;
},updateHasMore:function(_64){
this.hasMore=_64.hasMore;
},updateViewCount:function(_65){
$(this.viewCountId).innerHTML=_65;
},updateAllCount:function(_66){
if(typeof _66!="number"){
return;
}
this.photoCount=_66;
$("allPhotoPosition").innerHTML=this.photoCount;
},updateSerial:function(_67){
var pos=_67.position;
$(this.uiIdPhotoPosition).innerHTML=this.photoCount-pos+1;
},updateTag:function(_69){
TagManage.updateTag(_69);
this.fireEvent("photoTagUpdate");
},updateTitle:function(_6a){
this.titleEditorHide();
$(this.uiIdPhotoTitle).show();
this.photoTitleVal="";
if(XN.STRING.isBlank(_6a)){
var frm=$(this.uiIdPhotoTitleEditForm);
if(frm){
frm.description.value="";
}
if(this.albumOwner==this.currentUserId){
$(this.uiIdPhotoTitle).innerHTML=this.msgTitleEditPrompt;
}else{
$(this.uiIdPhotoTitle).hide();
$(this.uiIdPhotoTitle).innerHTML="";
return;
}
}else{
_6a=_6a.replace(/\n/g,"<br/>");
$(this.uiIdPhotoTitle).innerHTML=_6a.replace(/\s/g,"&nbsp;");
this.photoTitleVal=XN.string.unescapeHTML(_6a);
this.photoTitleVal=this.photoTitleVal.replace(/&shy;/g,"");
this.photoTitleVal=this.photoTitleVal.replace(/<br\/>/g,"\n");
var frm=$(this.uiIdPhotoTitleEditForm);
if(frm){
frm.description.value=this.photoTitleVal;
}
}
},updateShare:function(_6c){
var c=$(this.uiIdShare);
if(c&&_6c){
if(_6c.share&&$(this.uiIdShareLink)){
if($("popShareParams")){
$("popShareParams").id="xxxx";
}
c.show();
$(this.uiIdShareLink).value=this.urlGetPhoto+"?id="+_6c.photo.id+"&owner="+this.albumOwner;
$(this.uiIdShareType).value=_6c.share.type;
$(this.uiIdShareTitle).value=_6c.share.title;
$(this.uiIdSharePic).value=_6c.share.pic;
$(this.uiIdShareFromno).value=_6c.share.fromno;
$(this.uiIdShareFromname).value=_6c.share.fromname;
$(this.uiIdShareFromuniv).value=_6c.share.fromuniv;
$(this.uiIdShareAlbumid).value=_6c.share.albumid;
$(this.uiIdShareSummary).value=_6c.share.summary;
$(this.uiIdShareLargeUrl).value=_6c.photo.large;
}else{
c.hide();
}
}
},exifCache:{},uiGetExif:function(){
this.showExifLoading();
var str=this.exifCache[this.currentPhotoId];
if(str){
this.showExif(str);
return;
}
var p="id="+this.currentPhotoId+"&owner="+this.albumOwner;
var s=this;
new XN.NET.xmlhttp(this.urlGetExif,p,function(r){
s.exifCache[s.currentPhotoId]=r.responseText;
s.showExif(r.responseText);
});
},showExifLoading:function(){
if(!this.exifFixDiv){
this.exifFixDiv=new XN.UI.fixPositionElement();
this.exifFixDiv.container.addClass("infor-camera");
}
this.exifFixDiv.setContent("\u52a0\u8f7d\u4e2d...");
this.exifFixDiv.show();
this.exifFixDiv.moveTo(this.uiIdPhotoGetExifUrlContainer);
this.exifFixDiv.setAlignType("3-2");
},showExif:function(str){
if(this.exifFixDiv){
this.exifFixDiv.setContent(str);
this.exifFixDiv.moveTo(this.uiIdPhotoGetExifUrlContainer);
this.exifFixDiv.setAlignType("3-2");
}
},hideExif:function(){
if(this.exifFixDiv){
this.exifFixDiv.hide();
}
},titleEditorShowError:function(err){
var e=$(this.uiIdPhotoTitleEditError);
e.innerHTML=err;
e.show();
},titleEditorHideError:function(){
$(this.uiIdPhotoTitleEditError).hide();
},titleEditorShow:function(){
$(this.uiIdPhotoTitleEditor).show();
$(this.uiIdPhotoTitle).className="";
$(this.uiIdPhotoTitle).hide();
var frm=$(this.uiIdPhotoTitleEditForm);
if(frm){
frm.description.value=this.photoTitleVal;
}
setTimeout(function(){
new XN.form.inputHelper(frm.description).focus();
frm=null;
},10);
},titleEditorHide:function(){
$(this.uiIdPhotoTitleEditor).hide();
$(this.uiIdPhotoTitle).show();
this.titleEditorHideError();
},titleEditorSave:function(){
var frm=$(this.uiIdPhotoTitleEditForm);
var _77=frm.description.value;
if(_77.length>200){
this.titleEditorShowError(this.msgTitleEditDescLong);
return;
}
var _78="id="+this.currentPhotoId+"&description="+encodeURIComponent(_77);
var s=this;
new XN.NET.xmlhttp(this.urlSaveTitle,_78,function(r){
var _7b=XN.JSON.parse(r.responseText);
if(_7b.code==0){
s.updateTitle(_7b.msg);
s.titleEditorHide();
var p=s.getCachedPhoto(s.currentPhotoId);
if(p){
p.photo.title=_7b.msg;
}
}else{
s.titleEditorShowError(_7b.msg);
}
});
},commentEditorShowError:function(msg){
$(this.uiIdCommentEditorError).innerHTML=msg;
$(this.uiIdCommentEditorError).show();
},commentEditorHideError:function(){
$(this.uiIdCommentEditorError).hide();
},commentEditorSwitchButton:function(_7e,_7f,_80){
var e=$(this.uiIdCommentEditorBtn);
e.disabled=_7e;
e.value=_7f;
e.className=_80;
},commentEditorSave:function(){
var frm=$(this.uiIdCommentEditorForm);
var cmt=XN.STRING.trim($("cmtbody").value);
if(cmt.length==0){
this.commentEditorShowError("\u8bf7\u586b\u5199\u8bc4\u8bba");
return;
}
if(cmt.length>500){
this.commentEditorShowError("\u8bc4\u8bba\u4e0d\u80fd\u591a\u4e8e500\u5b57\u7b26");
return;
}
this.commentEditorSwitchButton(true,"\u8bf7\u7a0d\u5019","input-button gray");
this.commentEditorHideError();
var s=this;
new XN.NET.xmlhttp("/ajaxcommentphoto2.do",XN.FORM.serialize(frm),function(r){
s.commentEditorSwitchButton(false,"\u53d1\u8868\u8bc4\u8bba","input-button");
if(r.responseText.substring(0,3)=="af:"){
s.commentEditorShowError(r.responseText.substring(3));
}else{
s.commentEditorReset();
try{
$("realWhisper").value="false";
$("whisper").checked=false;
$("whisper").disabled=false;
}
catch(e){
}
var _86=XN.JSON.parse(r.responseText);
if(!_86){
return;
}
if(_86.code=="1"){
return;
}
s.addCommentToCache(s.currentPhotoId,_86);
s.appendOneComment(_86);
}
},{onError:function(){
s.commentEditorShowError("\u7cfb\u7edf\u5fd9\uff0c\u8bf7\u7a0d\u5019\u518d\u8bd5\u3002");
s.commentEditorSwitchButton(false,"\u53d1\u8868\u8bc4\u8bba","input-button");
}});
},commentEditorReset:function(){
$("cmtbody").value="";
$("whisper").checked=false;
$("whisper").disabled=false;
$("cmttoid").value="0";
},appendOneComment:function(_87){
var tdd=$element("dd");
tdd.id="talk"+_87.id;
var _89=[" <a class=\"avatar\" title=\""+_87.name+"\" href=\""+this.urlProfile+"?id="+_87.author+"\"><img alt=\""+_87.name+"\" src=\""+_87.headUrl+"\" class=\"avatar\"/></a>","<div class=\"info\">","<span class=\"float-right\"> <a class=\"x-to-hide\" onclick=\"XN.PAGE.albumPhoto.commentEditorDelete("+_87.id+","+_87.owner+");return false;\" href=\"#nogo\"></a></span>"].join("");
if(_87.whisper){
_89+="<span class=\"whisper float-right\">\u6084\u6084\u8bdd</span>";
}
var _8a;
if(_87.isVip===true){
_8a="&nbsp;<a href=\""+this.urlVipActionUrl+"\" target=\"_blank\" title=\"VIP\"><img src="+this.urlVipIcon+" alt =\" VIP\"/></a>";
}else{
_8a="";
}
_89+=["<span class=\"author me\"><a href=\"http://"+XN.env.domain+"/profile.do?id="+_87.id+"\">"+_87.name+"</a></span>",_8a," <span class=\"time\">"+_87.time+"</span>","</div>"].join("");
var _8b=_87.body.replace(/\n/g,"<br />").replace("<xiaonei_wap/>","<a href=\""+this.urlMobile+"\"><img class=\"mb-message\" src=\""+this.urlMobileIcon+"\" alt=\"\u901a\u8fc7\u624b\u673a\u53d1\u5e03\" title=\"\u901a\u8fc7\u624b\u673a\u53d1\u5e03\"/></a>");
_8b=_8b.replace(/((%[0-9A-F]{2}){3})/g,function(_8c){
return decodeURIComponent(_8c);
});
_89+=["<div class=\"reply\"><p class=\"content\">"+_8b+"</p>","</div>"].join("");
tdd.innerHTML=_89;
var _8d=XN.dom.getElementsByClassName("reply",document,"div");
if(_8d.length==0){
var _8e=XN.dom.getElementsByClassName("replies","document","dl")[0];
}else{
var _8e=_8d[_8d.length-1].parentNode.parentNode;
}
_8e.appendChild(tdd);
},commentEditorDelete:function(id,_90){
this.commentEditorHideError();
var s=this;
XN.DO.confirm({title:"\u5220\u9664\u8bc4\u8bba",msg:"\u786e\u5b9a\u5220\u9664\u8fd9\u6761\u8bc4\u8bba\u5417\uff1f",callBack:function(g){
if(g){
new XN.NET.xmlhttp("/ajaxdeletephotocomment.do","id="+id+"&owner="+_90,function(r){
if(r.responseText.substring(0,3)=="af:"){
s.commentEditorShowError(r.responseText.substring(3));
}else{
if(r.responseText.substring(0,3)=="ao:"){
$("talk"+id).hide();
s.removeCommentFromCache(s.currentPhotoId,id);
}
}
},{onError:function(){
s.commentEditorShowError("\u7cfb\u7edf\u5fd9\uff0c\u8bf7\u7a0d\u5019\u518d\u8bd5\u3002");
}});
}
}});
},addCommentToCache:function(id,_95){
var _96=this.getCachedPhoto(id);
if(_96){
_96.comments.unshift(_95);
}
},removeCommentFromCache:function(id,_98){
var o=this.getCachedPhoto(id);
if(o){
for(var i=0;i<o.comments.length;i++){
if(o.comments[i].id==_98){
o.comments.splice(i,1);
break;
}
}
}
},replyComment:function(_9b,id,_9d){
$("cmttoid").value=id;
var _9e=$("cmtbody").value;
if(this._replyPreFix){
_9e=_9e.replace(this._replyPreFix,"");
}
this._replyPreFix="\u56de\u590d"+_9b+"\uff1a";
$("cmtbody").value=this._replyPreFix+_9e;
new XN.FORM.inputHelper($("cmtbody")).focus();
if(_9d){
try{
if($("realWhisper")){
$("realWhisper").value="true";
}
$("whisper").checked=true;
$("whisper").disabled=true;
$("feedComment").value="";
$("feedComment").checked=false;
}
catch(e){
}
}else{
try{
if($("realWhisper")){
$("realWhisper").value="false";
}
$("whisper").checked=false;
$("whisper").disabled=false;
}
catch(e){
}
}
try{
AlbumComments.editor.getInputPos();
}
catch(e){
}
},updatePhotoTag:function(){
if(initTag){
initTag(1,this.currentUserId,this.currentUserName,this.currentPhotoId,this.currentGuestId,this.currentGuestName);
}
},uiShowSetAsCoverConfirm:function(){
var s=this;
XN.DO.confirm("\u8bbe\u7f6e\u6b64\u7167\u7247\u4e3a\u76f8\u518c\u5c01\u9762\uff1f","\u8bbe\u4e3a\u5c01\u9762",function(r){
if(r){
new XN.NET.xmlhttp(s.urlSetAsCover,"photo="+s.currentPhotoId,function(r){
if(r.responseText.substring(0,2)=="ok"){
XN.DO.showMessage("\u5df2\u7ecf\u8bbe\u4e3a\u7167\u7247\u5c01\u9762","\u8bbe\u4e3a\u5c01\u9762");
}else{
XN.DO.alert({callBack:function(){
},message:r.responseText,title:"\u8bbe\u4e3a\u5c01\u9762"});
}
});
}
},"\u662f","\u53d6\u6d88");
},uiShowSetAsProfileConfirm:function(){
var s=this;
if($("photo").height<50||$("photo").width<50){
XN.DO.alert({callBack:function(){
},message:"\u8fd9\u5f20\u7167\u7247\u7684\u5c3a\u5bf8\u4e0d\u7b26\u5408\u8981\u6c42\uff0c\u65e0\u6cd5\u4f5c\u4e3a\u5934\u50cf\u3002\u8bf7\u6362\u5f20\u7167\u7247\u5427",title:"\u8bbe\u7f6e\u5931\u8d25"});
return;
}
XN.DO.confirm(""+XN.env.siteName+"\u662f\u4e00\u4e2a\u771f\u5b9e\u7684\u7f51\u7edc\uff0c\u8bf7\u4f7f\u7528\u60a8\u672c\u4eba\u7684\u7167\u7247\uff0c\u5176\u4ed6\u56fe\u7247\u8bf7\u4e0d\u8981\u8bbe\u4e3a\u5934\u50cf\u3002\u786e\u8ba4\u662f\u60a8\u672c\u4eba\u7167\u7247\u5417\uff1f","\u8bf7\u60a8\u4e0a\u4f20\u771f\u5b9e\u7684\u7167\u7247",function(r){
if(r){
try{
new XN.NET.xmlhttp({url:"http://head.upload."+XN.env.domain+"/profile/AjaxCertificate.do",onSuccess:function(r){
var m=XN.JSON.parse(r.responseText);
new XN.NET.xmlhttp({url:"http://head2.upload."+XN.env.domain+"/head2/Photo2Head.do",data:"url="+$("photo").src+"&hostid="+m.hostid+"&tsc="+m.tsc,onSuccess:function(_a6){
var mn=XN.JSON.parse(_a6.responseText);
if(mn.code!=0){
XN.DO.showMessage("\u8bbe\u7f6e\u5934\u50cf\u6210\u529f","\u8bbe\u4e3a\u5934\u50cf");
}else{
XN.DO.showError(mn.msg);
}
},onError:function(){
XN.DO.showError("\u670d\u52a1\u5668\u9519\u8bef\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5");
return;
}});
},onError:function(){
XN.DO.showError("\u670d\u52a1\u5668\u9519\u8bef\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5");
return;
}});
}
catch(e){
XN.DO.showError("\u670d\u52a1\u5668\u9519\u8bef\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5");
return;
}
}
},"\u786e\u5b9a","\u53d6\u6d88");
}};
XN.event.enableCustomEvent(XN.page.albumPhoto);
window.showMoreComments=function(){
var _a8=XN.PAGE.albumPhoto;
var _a9=_a8.currentPhotoId;
var _aa=_a8.curOldestCommentId;
if($("show-all-id")!=null){
$("show-all-id").innerHTML+=" <span id=\"temp-loading\">\u52a0\u8f7d\u4e2d&nbsp;<img src=\""+XN.env.staticRoot+"imgpro/bg/indicator_blue_small.gif\" /></span>";
}
new XN.NET.xmlhttp({url:"http://photo."+XN.env.domain+"/ajaxgetphotocomment.do",data:"commentId="+_aa+"&photo="+_a9+"&owner="+_a8.albumOwner,onSuccess:function(r){
if(_a9!=_a8.currentPhotoId){
return;
}
try{
var _ac=XN.JSON.parse(r.responseText);
if(_ac.code==0){
if($("temp-loading")){
$("show-all-id").removeChild($("temp-loading"));
}
_a8.updateHasMore(_ac);
_a8.updateCurOldestCommentId(_ac);
_a8.updateComment(_ac.comments);
XN.PAGE.albumPhoto.fireEvent("onShowMoreComments");
}else{
XN.DO.showError(_ac.msg);
}
}
catch(e){
}
}});
};
(function(){
function getSlice(_ad){
var _ae="";
var _af=XN.dom.getElementsByClassName("replies","document","dl")[0];
_af.className=_af.className.replace(/\swith-arrow/ig,"");
if(AlbumComments.hasMore){
if($("show-all-id")==null){
_ae+="<dt id=\"show-all-id\" class=\"show-all\"><a href=\"#nologo\" id=\"showMoreComments\" onclick=\"AlbumComments.showMoreComments();return false;\">\u663e\u793a\u8f83\u65e9\u4e4b\u524d\u7684\u8bc4\u8bba</a></dt>";
}else{
var tDt=$("show-all-id");
tDt.parentNode.removeChild(tDt);
_ae+="<dt id=\"show-all-id\" class=\"show-all\"><a href=\"#nologo\" id=\"showMoreComments\" onclick=\"AlbumComments.showMoreComments();return false;\">\u663e\u793a\u8f83\u65e9\u4e4b\u524d\u7684\u8bc4\u8bba</a></dt>";
}
}else{
var tDt=$("show-all-id");
if(tDt!=null){
tDt.parentNode.removeChild(tDt);
}
}
if(_ad.length==0){
return;
}
for(var i=_ad.length-1;i>-1;i--){
var _b2=_ad[i];
_ae+="<dd id=\"talk"+_b2.id+"\">"+"    <a title=\""+_b2.name+"\" href=\""+AlbumComments.urlProfile+"?id="+_b2.author+"\"><img alt=\""+_b2.name+"\" src=\""+_b2.headUrl+"\" class=\"avatar\"/></a>"+"    <div class=\"info\">";
if(AlbumComments.userId==_b2.author){
_ae+=" <span class=\"float-right\"> <a class=\"x-to-hide\" onclick=\"AlbumComments.remove("+_b2.id+");return false;\" href=\"#nogo\"></a></span>";
}else{
if(AlbumComments.userId==_b2.owner||AlbumComments.isAdmin){
_ae+=" <span class=\"float-right\"> <a class=\"x-to-hide\" onclick=\"AlbumComments.remove("+_b2.id+");return false;\" href=\"#nogo\"></a></span>";
}
}
if(_b2.whisper){
_ae+="<span class=\"whisper float-right\">\u6084\u6084\u8bdd</span>";
}
_ae+="<a title=\""+_b2.name+"\" href=\""+AlbumComments.urlProfile+"?id="+_b2.author+"\">"+_b2.name+"</a>";
if(_b2.isVip===true){
_ae+="&nbsp;<a href=\""+AlbumComments.urlVipActionUrl+"\" target=\"_blank\" title=\"VIP\"><img src="+AlbumComments.urlVipIcon+" alt =\" VIP\"/></a>";
}
_ae+=" <span class=\"time\">"+_b2.time+"</span>"+"</div>";
var _b3=_b2.body.replace(/\n/g,"<br />").replace("<xiaonei_wap/>","<a href=\""+AlbumComments.urlMobile+"\"><img class=\"mb-message\" src=\""+AlbumComments.urlMobileIcon+"\" alt=\"\u901a\u8fc7\u624b\u673a\u53d1\u5e03\" title=\"\u901a\u8fc7\u624b\u673a\u53d1\u5e03\"/></a>");
_b3=_b3.replace(/((%[0-9A-F]{2}){3})/g,function(_b4){
try{
return decodeURIComponent(_b4);
}
catch(e){
return _b4;
}
});
_ae+="<div class=\"reply\"><p class=\"content\">"+_b3+"</p>";
if(AlbumComments.userId!=_b2.author){
_ae+="&nbsp;<a onclick=\"AlbumComments.reply('"+_b2.author+"','"+_b2.name+"',"+(_b2.whisper?"true":"false")+");return false;\" href=\"#nogo\">\u56de\u590d</a>";
}
_ae+="</div>"+"</dd>";
}
var tdl=$element("dl");
tdl.className="replies with-arrow";
tdl.innerHTML=_ae;
_af.parentNode.insertBefore(tdl,_af);
}
function append(_b6,_b7){
var _b8=$element("div");
_b8.innerHTML=_b7;
while(_b8.hasChildNodes()){
_b6.appendChild(_b8.childNodes[0]);
alert(i?i=0:i++);
}
}
function check(){
var _b9=$("cmtbody");
var _ba=$("ajax_msgerror");
var _bb=true;
var _bc=XN.STRING.trim(_b9.value);
if(_bc==""){
_ba.innerHTML="\u8bf7\u586b\u5199\u8bc4\u8bba";
_b9.value="";
_bb=false;
}else{
if(_bc.length>500){
_ba.innerHTML="\u8bc4\u8bba\u4e0d\u80fd\u591a\u4e8e500\u5b57\u7b26";
_bb=false;
}
}
if(_bb){
_ba.hide();
}else{
_ba.show();
_b9.focus();
}
return _bb;
}
var _bd=0;
var _be=0;
var _bf=0;
var _c0=false;
var to=0;
var _c2=null;
window.AlbumComments={hasMore:false,urlProfile:"http://"+XN.env.domain+"/profile.do",urlMobile:"http://mobile."+XN.env.domain+"",urlVipIcon:"http://s.xnimg.cn/imgpro/icons/vip_f.gif",urlMobileIcon:"http://s.xnimg.cn/img/mobile-intro/tinymobile.gif",urlVipActionUrl:"http://i."+XN.env.domain+"/index.action?wc=290000",isAdmin:false,userId:0,albumId:0,ownerId:0,currentUserHeadUrl:"",curOldestCommentId:0,reset:function(){
to=0;
$("editorFormBtn").disabled=false;
$("editorFormBtn").value="\u53d1\u8868\u8bc4\u8bba";
$("editorFormBtn").className="input-button";
$("cmtbody").value="";
$("whisper").checked=false;
$("whisper").disabled=false;
try{
$("feedComment").checked="true";
$("to").value="0";
$("feedComment").value="true";
}
catch(e){
}
},add:function(_c3){
getSlice(_c3);
},remove:function(id){
var _c5=this;
XN.DO.confirm({title:"\u5220\u9664\u8bc4\u8bba",msg:"\u786e\u5b9a\u5220\u9664\u8fd9\u6761\u8bc4\u8bba\u5417\uff1f",callBack:function(r){
if(r){
_c5.send("remove",id);
$("talk"+id).parentNode.removeChild($("talk"+id));
}
}});
},appendOneComment:function(_c7){
var tdd=document.createElement("dd");
tdd.id="talk"+_c7.id;
var _c9=[" <a class=\"avatar\" title=\""+_c7.name+"\" href=\""+this.urlProfile+"?id="+_c7.author+"\"><img alt=\""+_c7.name+"\" src=\""+_c7.headUrl+"\" class=\"avatar\"/></a>","<div class=\"info\">","<span class=\"float-right\"> <a class=\"x-to-hide\" onclick=\"AlbumComments.remove("+_c7.id+");return false;\" href=\"#nogo\"></a></span>"].join("");
if(_c7.whisper){
_c9+="<span class=\"whisper float-right\">\u6084\u6084\u8bdd</span>";
}
var _ca;
if(_c7.isVip===true){
_ca="&nbsp;<a href=\""+this.urlVipActionUrl+"\" target=\"_blank\" title=\"VIP\"><img src="+this.urlVipIcon+" alt =\" VIP\"/></a>";
}else{
_ca="";
}
_c9+=["<span class=\"author me\"><a  href=\"http://"+XN.env.domain+"/profile.do?id="+_c7.id+"\">"+_c7.name+"</a></span>",_ca," <span class=\"time\">"+_c7.time+"</span>","</div>"].join("");
var _cb=_c7.body.replace(/\n/g,"<br />").replace("<xiaonei_wap/>","<a href=\""+this.urlMobile+"\"><img class=\"mb-message\" src=\""+this.urlMobileIcon+"\" alt=\"\u901a\u8fc7\u624b\u673a\u53d1\u5e03\" title=\"\u901a\u8fc7\u624b\u673a\u53d1\u5e03\"/></a>");
_c9+=["<div class=\"reply\"><p class=\"content\">"+_cb+"</p>","</div>"].join("");
tdd.innerHTML=_c9;
var _cc=XN.dom.getElementsByClassName("reply",document,"div");
if(_cc.length==0){
var _cd=XN.dom.getElementsByClassName("replies","document","dl")[0];
}else{
var _cd=_cc[_cc.length-1].parentNode.parentNode;
}
_cd.appendChild(tdd);
},send:function(_ce){
if(_ce=="add"&&check()){
var _cf=$("editorFormBtn");
_cf.disabled=true;
_cf.value="\u8bf7\u7a0d\u5019";
_cf.className="input-button gray";
if(XN.STRING.trim($("cmtbody").value).length>500){
this.commentEditorShowError("\u8bc4\u8bba\u4e0d\u80fd\u591a\u4e8e500\u5b57\u7b26");
return false;
}
var _d0="id="+this.albumId;
_d0+="&owner="+this.ownerId+"&body="+encodeURIComponent(XN.STRING.trim($("cmtbody").value));
try{
_d0+="&to="+$("to").value;
}
catch(e){
}
_d0+="&only_to_me="+$("whisper").checked;
_d0+="&feedComment="+($("feedComment")?$("feedComment").checked:"");
var _d1=this;
new XN.net.xmlhttp({url:"/ajaxcommentalbum.do",data:_d0,onSuccess:function(_d2){
try{
_d1.reset();
var _d3=XN.JSON.parse(_d2.responseText);
if(!_d3){
return;
}
if(_d3.code=="1"){
return;
}
_d1.appendOneComment(_d3);
}
catch(e){
if(_d2.responseText.substring(0,3)=="af:"){
_d1.showError(_d2.responseText.substring(3));
}else{
_d1.showError("\u53d1\u9001\u56de\u590d\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\u3002");
}
}
},onError:function(){
XN.DO.showError("\u53d1\u9001\u56de\u590d\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\u3002");
}});
}else{
if(_ce=="remove"){
new XN.net.xmlhttp({url:"/ajaxdeletealbumcomment.do",data:"id="+arguments[1]+"&owner="+this.ownerId});
}
}
},showError:function(_d4){
$("ajax_msgerror").innerHTML=_d4;
$("ajax_msgerror").show();
this.reset();
},refresh:function(_d5){
$("talk").innerHTML="";
var _d6=null;
var _d7=this;
new XN.net.xmlhttp({url:"/ajaxgetalbumcomment.do",data:"owner="+_bf+"&album="+_be+"&curpage="+(_d5-1),onSuccess:function(_d8){
_d6=XN.JSON.parse(_d8.responseText);
for(var i=0;i<_d6.comments.length;i++){
_d7.add(_d6.comments[i]);
}
_d7.setPageBar(parseInt((_d6.commentCount-1)/30+1),_d5);
_d7.fireEvent("load");
},onError:function(){
XN.DO.showError("\u53d1\u9001\u56de\u590d\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\u3002");
}});
},reply:function(id,_db,_dc){
if(!$("to")){
var to=document.createElement("input");
to.id="to";
to.value=id;
to.type="hidden";
$("cmtbody").parentNode.appendChild(to);
}else{
$("to").value=id;
}
var _de=$("cmtbody").value;
if(this._replyPreFix){
_de=_de.replace(this._replyPreFix,"");
}
this._replyPreFix="\u56de\u590d"+_db+"\uff1a";
$("cmtbody").value=this._replyPreFix+_de;
new XN.FORM.inputHelper($("cmtbody")).focus();
if(_dc){
$("whisper").checked=true;
$("whisper").disabled=true;
try{
$("feedComment").value="";
$("feedComment").checked=false;
}
catch(e){
}
}else{
$("whisper").checked=false;
$("whisper").disabled=false;
}
try{
AlbumComments.editor.getInputPos();
}
catch(e){
}
},setPageBar:function(_df,_e0){
var old=$("pageBar");
if(old){
old.parentNode.removeChild(old);
}
if(_df>1){
var _e2=document.createElement("ul");
_e2.className="pagerpro";
_e2.id="pageBar";
$("pagerCon").appendChild(_e2);
_c2=new XN.ui.pager({container:"pageBar",showPageCount:5}).setPageCount(_df).setCurrentPage(_e0).addEvent("pageChange",function(num){
AlbumComments.refresh(num);
});
}
},init:function(_e4,_e5){
this.userId=_e4.userId;
this.albumId=_e4.albumId;
this.ownerId=_e4.ownerId;
this.isAdmin=_e4.isAdmin;
this.updateHasMore(_e4.comments);
this.updateCurOldestCommentId(_e4.comments);
getSlice(_e4.comments.comments);
$("comment").className+=" clearfix";
if(XN.browser.IE){
var _e6=document.createElement("div");
_e6.style.clear="both";
$("content").appendChild(_e6);
}
},updateCurOldestCommentId:function(_e7){
if(_e7.comments.length==0){
return;
}
this.curOldestCommentId=_e7.comments[_e7.comments.length-1].id;
},updateHasMore:function(_e8){
this.hasMore=_e8.hasMore;
},showMoreComments:function(){
if($("show-all-id")!=null){
$("show-all-id").innerHTML+=" <span id=\"temp-loading\">\u52a0\u8f7d\u4e2d&nbsp;<img src=\""+XN.env.staticRoot+"imgpro/bg/indicator_blue_small.gif\" /></span>";
}
new XN.NET.xmlhttp({url:"/ajaxgetalbumcomment.do",data:"commentId="+AlbumComments.curOldestCommentId+"&album="+AlbumComments.albumId+"&owner="+AlbumComments.ownerId,onSuccess:function(r){
try{
var _ea=XN.JSON.parse(r.responseText);
if(_ea.code==0){
if($("temp-loading")){
$("show-all-id").removeChild($("temp-loading"));
}
AlbumComments.updateHasMore(_ea);
AlbumComments.updateCurOldestCommentId(_ea);
getSlice(_ea.comments);
AlbumComments.fireEvent("onShowMoreComments");
}else{
XN.DO.showError(_ea.msg);
}
}
catch(e){
}
}});
}};
XN.event.enableCustomEvent(AlbumComments);
})();
XN.dom.ready(function(){
var bt=$("editorFormBtn"),url=window.location.href;
if(!bt){
return;
}
if(url.indexOf("getalbum.do")!==-1||url.indexOf("getalbumprofile.do")!==-1||url.indexOf("deletephoto.do")!==-1){
XN.event.addEvent(bt,"click",function(){
AlbumComments.send("add");
});
}else{
if(url.indexOf("gettagphoto.do")!==-1){
XN.event.addEvent(bt,"click",function(e){
commentPhoto(XN.event.element(e||window.event).form);
});
}
}
});
function scrollToEdit(){
var el=$("cmtbody");
if(el){
scrollShow(el);
el.focus();
}
}
function scrollShow(el){
var el=$(el);
if(el){
el.scrollIntoView();
}
}
XN.dom.ready(function(){
var _f0=null;
function editButtonHover(){
clearTimeout(_f0);
$("edit-buttonContainer").addClass("edithover");
}
function Mout(){
clearTimeout(_f0);
_f0=setTimeout(function(){
$("edit-buttonContainer").delClass("edithover");
},50);
}
function openrMover(){
clearTimeout(_f0);
}
XN.event.addEvent("edit-buttonContainer","mouseover",editButtonHover);
XN.event.addEvent("edit-buttonContainer","mouseout",Mout);
XN.event.addEvent("edit-menus","mouseout",Mout);
XN.event.addEvent("edit-menus","mouseover",openrMover);
});
TagManage={uiIdTags:"tagList",uiIdPhoto:"photo",urlProfile:"http://"+XN.env.domain+"/profile.do",urlDeletePhotoTag:"/delphototag.do",urlPhoto:"http://photo."+XN.env.domain+"",init:function(_f1){
this.tagList=[];
this.isDisable=true;
this.currentUserId=_f1;
this.bAll=false;
var _f2=this;
$("showpacktag").onclick=function(){
_f2.updateTag();
};
$("showalltag").onclick=function(){
_f2.updateTag(null,true);
};
},enable:function(){
this.isDisable=false;
},disable:function(){
this.isDisable=true;
clearTimeout(this.hideTagTimer);
this.hideTag(true);
},getAllTag:function(){
return this.tagList;
},addTagCache:function(tag){
this.tagList.push(tag);
},getTagLen:function(){
return this.tagList.length;
},addOneTag:function(tag){
if(!tag){
return;
}
this.addTagCache(tag);
this.updateMoreBut(this.bAll);
if(this.getTagLen()>5&&!this.bAll){
return;
}
var _f5=this.getTagHTML(tag,this.getTagLen()-1);
_f5=$(this.uiIdTags).innerHTML+_f5;
this.updataTagList(_f5);
},cutStr:function cutstr(str,len){
if(!str||!len){
return "";
}
var a=0;
var i=0;
var _fa="";
for(i=0;i<str.length;i++){
str.charCodeAt(i)>255?a+=2:a++;
if(a>len){
return _fa;
}
_fa+=str.charAt(i);
}
return str;
},getTagHTML:function(tag,_fc){
if(!tag){
return "";
}
var t=tag,_fe="",_fc=_fc||0;
var _ff=this.cutStr(t.targetName,10);
var evt="onmouseover=\"TagManage.show("+_fc+");\"  onmouseout=\"TagManage.hideTag();\"";
if(t.targetId>0){
_fe+="<li><a href=\""+this.urlProfile+"?id="+t.targetId+"\""+evt+" target=\"_blank\">"+_ff+"</a>";
}else{
_fe+="<li><a "+evt+">"+_ff+"</a>";
}
if(this.currentUserId==t.ownerId||this.currentUserId==t.targetId){
_fe+="<a title=\"\u5220\u9664\" class=\"close\" href=\""+this.urlDeletePhotoTag+"?id="+t.id+"\""+evt+"></a>";
}
_fe+="</li>";
return _fe;
},updateTag:function(tags,bAll){
if(tags){
this.tagList=tags;
}
var tags=this.tagList,html="";
for(var i=0;i<tags.length;i++){
html+=this.getTagHTML(tags[i],i);
if(i>=4&&!bAll){
break;
}
}
this.bAll=bAll;
this.updataTagList(html);
this.updateMoreBut(bAll);
},updateMoreBut:function(bAll){
if(this.getTagLen()<6){
$("showalltag").hide();
$("showpacktag").hide();
return;
}
$("alltagcount").innerHTML=this.getTagLen();
if(bAll){
$("showalltag").hide();
$("showpacktag").show();
}else{
$("showalltag").show();
$("showpacktag").hide();
}
},updataTagList:function(html){
var html=html||"";
$(this.uiIdTags).innerHTML=html;
if(html){
$("tagListTitle").show();
$(this.uiIdTags).show();
}else{
$(this.uiIdTags).hide();
$("tagListTitle").hide();
}
},getTagFriend:function(e){
if(!$(this.uiIdPhoto)){
return;
}
var px=XN.event.pointerX(e);
var py=XN.event.pointerY(e);
this.rleft=$(this.uiIdPhoto).realLeft();
this.rtop=$(this.uiIdPhoto).realTop();
var x=px-this.rleft;
var y=py-this.rtop;
var rt=[];
XN.array.each(this.tagList,function(i,v){
if(v.leftToPhoto<=x&&v.leftToPhoto+v.frameWidth>=x&&v.topToPhoto<=y&&v.topToPhoto+v.frameHeight>y){
rt.push(v);
}
});
rt.sort(function(a,b){
return a.frameWidth*a.frameHeight-b.frameWidth*b.frameHeight;
});
return rt[0];
},lastTime:new Date().valueOf(),showTagFriend:function(e){
if(this.isDisable){
return;
}
var e=e||window.event;
if(!e){
return;
}
var d=new Date().valueOf();
if(d-this.lastTime<50){
return;
}
this.lastTime=d;
var f=this.getTagFriend(e);
if(f){
this.showTagObj(f);
}else{
this.hideTag(true);
}
},show:function(_114){
var t=this.tagList[_114];
this.showTagObj(t);
},showTagObj:function(t){
if(!t){
return;
}
this.showTag(t.leftToPhoto,t.topToPhoto,t.frameWidth,t.frameHeight,t.taggerId,t.targetName);
},showTag:function(left,top,_119,_11a,_11b,_11c){
if(this.isDisable){
return;
}
var el=$(this.uiIdPhoto);
if(!el){
return;
}
if(!this.showTagEl){
this.showTagEl=document.createElement("div");
document.body.appendChild(this.showTagEl);
this.showTagEl=$(this.showTagEl);
this.showTagEl.className="tagshowcon";
var fun=XN.PAGE.albumPhoto.clickToNextFun;
if(fun){
XN.EVENT.addEvent(this.showTagEl,"click",fun);
}
this.showTagEl.innerHTML="<div id=\"taglayout\"></div><div id=\"taglayin\"></div><div id=\"innerTagName\"></div>";
XN.event.addEvent(this.showTagEl,"mousemove",function(e){
TagManage.showTagFriend(e);
});
}
var x=el.realLeft();
var y=el.realTop();
clearTimeout(this.hideTagTimer);
var r=x+el.clientWidth;
var b=y+el.clientHeight;
if(left<0){
_119=Math.max(_119+left,0);
left=0;
}
if(top<0){
top=Math.max(_11a+top,0);
top=0;
}
if(left+_119+x>r){
_119=Math.max(r-left-x,0);
}
if(top+_11a+y>b){
_11a=Math.max(b-top-y,0);
}
this.showTagEl.style.left=x+left+"px";
this.showTagEl.style.top=y+top+"px";
this.showTagEl.style.width=_119+"px";
this.showTagEl.style.height=_11a+"px";
$("taglayout").style.width=_119+2+"px";
$("taglayout").style.height=_11a+2+"px";
$("taglayin").style.width=_119-2+"px";
$("taglayin").style.height=_11a-2+"px";
this.showTagEl.show();
$("innerTagName").innerHTML=_11c;
$("innerTagName").style.top=_11a+5+"px";
},hideTag:function(now){
if(!this.showTagEl){
return;
}
var el=this.showTagEl;
clearTimeout(this.hideTagTimer);
if(now){
el.hide();
return;
}
this.hideTagTimer=setTimeout(function(){
el.hide();
},2000);
}};
XN.dom.ready(function(){
XN.event.addEvent("photoContainer","mousemove",function(e){
TagManage.showTagFriend(e);
});
});
(function(){
XN.PAGE.albumPhoto.addEvent("photoBeginLoad",function(){
TagManage.disable();
});
XN.PAGE.albumPhoto.addEvent("photoLoaded",function(){
TagManage.enable();
});
endTag=function(){
$("photoNote").hide();
XN.PAGE.albumPhoto.bDisable=false;
TagManage.enable();
};
disableTag=true;
XN.PAGE.albumPhoto.addEvent("photoBeginLoad",function(){
disableTag=true;
});
XN.PAGE.albumPhoto.addEvent("photoLoaded",function(){
disableTag=false;
});
beginTag=function(){
if(disableTag){
setTimeout(function(){
XN.DO.alert({message:"\u56fe\u7247\u52a0\u8f7d\u4e2d\u4e0d\u80fd\u5708\u4eba\uff0c\u8bf7\u7a0d\u5019\u518d\u8bd5",autoHide:3});
},0);
return;
}
TagManage.disable();
XN.PAGE.albumPhoto.bDisable=true;
$("photoNote").style.display="block";
$("tagNote").innerHTML="\u5708\u4eba\u6570\u636e\u52a0\u8f7d\u4e2d...";
scrollShow("photoNote");
XN.loadFile("http://s.xnimg.cn/jspro/albumtag.js");
};
initTag=function(type,_128,_129,_12a,_12b,_12c,_12d){
backInitTag=function(){
initTag(type,_128,_129,_12a,_12b,_12c,_12d);
};
};
})();
SliderGallery=function(_12e){
this.pcount=_12e||1;
this.initialize();
};
SliderGallery.prototype={initialize:function(_12f){
this.ContEL=$("photoGallery");
this.items=this.ContEL.getElementsByTagName("li");
this.data={};
this.albumInfo=XN.PAGE.albumPhoto;
this.owner=this.albumInfo.albumOwner;
this.dir="next";
var This=this;
XN.event.addEvent(this.ContEL,"click",function(e){
var e=e||window.event;
var _132=XN.event.element(e);
var id=This[_132.id];
if(id){
This.albumInfo.view(id);
}
});
this.init();
if(this.pcount<=1){
this.defel="all";
$("prevbtn").addClass("nogo-top");
$("nextbtn").addClass("nogo-bottom");
return;
}else{
if(this.pcount==2){
this.defel="prev";
}
}
XN.event.addEvent("prevbtn","click",function(e){
This.dir="prev";
This.showPrevious();
});
XN.event.addEvent("nextbtn","click",function(e){
This.dir="next";
This.showNext();
});
},Move:function(){
var curr=this.albumInfo.currentPhotoId;
this.drawHTML(curr);
},init:function(){
var str="<li><a href=\"javascript:void(0)\"><img %style% id=\"prevId\" src=\"%src%\"/></a></li>"+"<li class=\"photo-selected\"><a href=\"javascript:void(0)\"><img %style% id=\"currId\" src=\"%src%\" /></a></li>"+"<li><a href=\"javascript:void(0)\"><img %style% id=\"nextId\" src=\"%src%\"/></a></li>";
var str=str.replace(/%src%/g,this.loddingImg);
var str=str.replace(/%style%/g,"style=\"width:50px;height:50px;\"");
this.ContEL.innerHTML=str;
},addData:function(data){
this.data[data.currId]=data;
},setSlideInfo:function(data){
this.prevId=data["prevId"];
this.currId=data["currId"];
this.nextId=data["nextId"];
},loddingImg:"http://s.xnimg.cn/imgpro/indicator/loading.gif",drawHTML:function(id){
var data=this.getData(id);
this.setSlideInfo(data);
var a=["prev","curr","next"];
var fel,html="";
switch(this.defel){
case "all":
fel="all";
break;
case "next":
fel="prev";
break;
case "prev":
fel="next";
break;
default:
fel=0;
}
this.defel=fel;
var This=this;
var _140=function(i,v){
$(v+"Id").src=This.loddingImg;
var id=data[v+"Id"];
var url=data[v+"Url"];
if(fel&&i!=1){
if((fel=="all"||fel=="next")&&i==2){
id="first";
url="http://s.xnimg.cn/imgpro/bg/last.gif";
}else{
if((fel=="all"||fel=="prev")&&i==0){
id="last";
url="http://s.xnimg.cn/imgpro/bg/first.gif";
}
}
}
$(v+"Id").pid=id;
if(data.flag[i]){
url="http://s.xnimg.cn/imgpro/album/banned_photo_tiny.jpg";
}
(function(id,url,c){
setTimeout(function(){
GalleryImageLoad.load(id,url,v);
},0);
})(id,url,v);
};
XN.array.each(a,_140);
},getData:function(id){
return this.data[id];
},showNext:function(){
var s=this.albumInfo;
if(s.bDisable){
return;
}
clearTimeout(this._showPTimer);
var _14a=function(){
var _14b=s.getCachedPhoto(s.currentPhotoId);
if(_14b){
s.dir="next";
s.view(_14b.photo.previous);
return;
}
this._showPTimer=setTimeout(_14a,20);
}.bind(this);
this._showPTimer=setTimeout(_14a,20);
},showPrevious:function(){
var s=this.albumInfo;
if(s.bDisable){
return;
}
clearTimeout(this._showPTimer);
var _14d=function(){
var _14e=s.getCachedPhoto(s.currentPhotoId);
if(_14e){
s.dir="prev";
s.view(_14e.photo.next);
return;
}
this._showPTimer=setTimeout(_14d,20);
}.bind(this);
this._showPTimer=setTimeout(_14d,20);
}};
GalleryImageLoad={load:function(id,url,v){
if(!id||!url){
return;
}
var This=this,_153=0,_154=null;
var suc=function(){
clearTimeout(_154);
This._sucF(id,url,v);
};
var err=function(){
_153++;
clearTimeout(_154);
_157();
};
var _158=function(){
};
var _157=function(){
if(_153>2){
return;
}
var img=new Image();
img.onload=suc;
img.onerror=img.onabort=function(){
err();
};
_158=function(){
};
_154=setTimeout(_158,15000);
img.src=url;
};
_157();
},_sucF:function(id,url,v){
var el=$(v+"Id");
if(el&&el.pid==id){
el.src=url;
}
}};
function photoILikeToShow(){
XN.effect.scrollTo($("ILike_UserLike_Handle"),10);
ILike.toggleUserLike();
}
function confirmbox_whenset(link){
XN.DO.confirm({title:"\u8bf7\u60a8\u4e0a\u4f20\u771f\u5b9e\u7684\u7167\u7247",msg:""+XN.env.siteName+"\u662f\u4e00\u4e2a\u771f\u5b9e\u7f51\u7edc\uff0c\u8bf7\u4f7f\u7528\u60a8\u672c\u4eba\u7684\u7167\u7247\uff0c\u5176\u4ed6\u56fe\u7247\u8bf7\u4e0d\u8981\u8bbe\u4e3a\u5934\u50cf\u3002<br />\u786e\u8ba4\u662f\u60a8\u672c\u4eba\u7167\u7247\u5417\uff1f",width:465,callBack:function(r){
if(r){
window.location=link;
}
}});
}
HeadLazyload=function(){
var This=this,_161=null;
function loader(_162){
if(_161){
return;
}
_161=setTimeout(function(){
This._loadImgs(_162);
_161=null;
},100);
}
this.images=[];
this.DATA_SRC="lazyload-src";
this.diff=100;
this.threshold=this._getThreshold();
XN.event.addEvent(window,"scroll",loader);
XN.event.addEvent(window,"resize",function(){
This.threshold=This._getThreshold();
loader(true);
});
};
HeadLazyload.prototype={init:function(diff){
this.images=[];
this.diff=diff||100;
},addContainer:function(_164){
var imgs=_164.getElementsByTagName("img");
var img=null,_167=null,ret=this.images,_169=this.DATA_SRC;
for(var i=0;img=imgs[i++];){
_167=img.getAttribute(_169);
if(_167){
ret.push(img);
}
}
var This=this;
setTimeout(function(){
This._loadImgs(true);
},100);
},_loadImgs:function(_16c){
var _16d=this._getScroll();
if(!_16c&&_16d<=this.diff){
return;
}
var imgs=this.images,_16f=[],_170=this.threshold+_16d,img=null,_172=null;
var _173=this.DATA_SRC;
for(var i=0;img=imgs[i++];){
var t=$(img).realTop();
if(t<=_170&&t>_16d){
_172=img.getAttribute(_173);
if(_172&&img.src!=_172){
img.src=_172;
img.removeAttribute(_173);
}
}else{
_16f.push(img);
}
}
this.images=_16f;
},_getThreshold:function(){
var _176=self.innerHeight,mode=document["compatMode"];
var isIE=XN.Browser.IE,_179=XN.Browser.Opera;
if((mode||isIE)&&!_179){
_176=(mode=="CSS1Compat")?document.documentElement.clientHeight:document.body.clientHeight;
}
return _176;
},_getScroll:function(){
return Math.max(document["documentElement"].scrollTop,document.body.scrollTop);
}};

