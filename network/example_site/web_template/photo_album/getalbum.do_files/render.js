(function(){
var _1="http://shaft.jebe."+_2+"/show";
var _3="http://jebe.xnimg.cn/";
var _4={};
var _5=null;
var _6=0;
if(window.XN){
var _2=XN.env.domain;
var _7=XN.cookie.get;
var _8=window.$element;
var _9=XN.dom.ready;
var _a=XN.array.each;
var _b=XN.string.isBlank;
var $=xn_getEl;
}
if(_2=="renren.com"){
var _d=["1000000005","1000000006","1000000039","1000000040","1000000014"];
var _e={"ad1000000015":"adTextLink1","ad1000000020":"adTextLink2","ad1000000043":"adTextLink2"};
}else{
var _d=["1000010003","1000010019","1000010023"];
var _e={"ad1000010020":"adTextLink1","ad1000010026":"adTextLink2"};
}
_4[1]=function(ad){
var _10=(ad.adzoneid=="1000000054"||ad.adzoneid=="1000000055");
var str="<a target=\"_blank\" href=\""+ad.click_url+"\">"+ad.text1.replace(/%%\(.*?\)(.*?)%%/g,"<span style=\"color:red\">$1</span>")+"</a>";
if(_10){
str="<p>"+str+"</p>";
}
return str;
};
_4[2]=function(ad){
if(ad.media_uri&&!/^http:\/\//.test(ad.media_uri)){
ad.media_uri=_3+ad.media_uri;
}
if(/\.swf$/.test(ad.media_uri)){
var _13="<div style=\"position:relative;\">";
_13+="<embed src=\""+ad.media_uri;
var _14=parseInt(ad.flash_click_type,0);
if(isNaN(_14)){
_14=0;
}
if(_14==1){
_13+="?"+ad.flash_click_value+"="+encodeURIComponent(ad.click_url);
}
_13+="\" type=\"application/x-shockwave-flash\" "+"width=\""+ad.width+"\" height=\""+ad.height+"\" wmode=\"transparent\" FlashVars=\"xname="+(typeof jebe_username!="undefined"&&jebe_username?jebe_username:"\u60a8\u597d")+"\">";
_13+="</embed>";
if(_14==0){
_13+="<div style=\""+(XN.browser.IE?"filter:alpha(opacity=1);background-color:#fff;":"")+"width:"+ad.width+"px; height: "+ad.height+"px;cursor:pointer;position: absolute; left: 0px; top: 0px; z-index: 999;\" onclick=\"window.open('"+ad.click_url+"');\"></div>";
}
_13+="</div>";
return _13;
}else{
return ["<a target=\"_blank\" href=\""+ad.click_url+"\">","<img width=\""+ad.width+"\"","height=\""+ad.height+"\"","src=\""+ad.media_uri+"\""," />","</a>"].join("");
}
};
_4[3]=function(ad){
return "";
};
function buildAD(obj){
XN.log(obj);
var div=$("ad"+obj.adzoneid);
_6--;
if(!div){
return;
}
var _18=[];
_a(obj.ads,function(i,v){
v.adzoneid=obj.adzoneid;
_18.push(_4[v.format](v));
});
div.innerHTML=_18.join("");
}
window.render_jebe_ads=window.render_jebe_ads_load=function(_1b){
if($("banner")){
$("banner").show();
}
if($("bannerBottom")){
$("bannerBottom").show();
}
setTimeout(function(){
XN.array.each(_d,function(i,v){
var el=$("ad"+v);
if(el){
el.show();
}
});
},0);
setTimeout(function(){
checkLoad();
},1000);
var ads=_1b.result;
for(var i=0,len=ads.length;i<len;i++){
(function(v){
if(!v){
return;
}
_6++;
setTimeout(function(){
buildAD(v);
},20);
})(ads[i]);
}
_1b=null;
};
function checkLoad(){
if(_6>0){
setTimeout(arguments.callee,500);
return;
}
XN.array.each(_d,function(i,v){
var el=$("ad"+v);
if(!el){
return;
}
if(_b(el.innerHTML)){
el.hide();
}
});
if(_2=="renren.com"){
var tl=$("ad1000000003")||$("ad1000000037"),tr=$("ad1000000004")||$("ad1000000038"),bl=$("ad1000000007")||$("ad1000000041"),br=$("ad1000000008")||$("ad1000000042");
if(tl&&tr&&_b(tl.innerHTML)&&_b(tr.innerHTML)){
if($("banner")){
$("banner").hide();
}
}
if(bl&&br&&_b(bl.innerHTML)&&_b(br.innerHTML)){
if($("bannerBottom")){
$("bannerBottom").hide();
}
}
}
_a(_e,function(i,v){
if(!$(i)){
return;
}
if(_b($(i).innerHTML)){
$(v).hide();
}
});
}
checkJebeLoad=function(){
};
})();

