/**
 * @author feng
 */
XN.namespace('XN.PAGE');

XN.PAGE.albumList = {
    showAllTitle: function(){
        $('describeAlbum').innerHTML =  this.albumTitle
    },
    showAlbumTitle: function(title){
		if(!title) {
			this.showNoTitle()
			return;
		}
		//title = XN.string.escapeHTML(title);
        this.albumTitle = title
        var str = this.cutStr(title, 140);
        if (str != this.albumTitle) 
            str = str + '<a id="showMoreAlbumTitle" href="javascript:void(0)">(展开全部)</a>'
        $('describeAlbum').innerHTML = str;
        var This = this;
        XN.event.addEvent('showMoreAlbumTitle', 'click', function(){
            This.showAllTitle()
        });
    },
	showNoTitle : function(){
		$('describeAlbum').addClass('cite')
		var href = window.location.href
		var id = /id=(\d+)/.exec(href)[1]
		if( visterId == ownerId && albumType % 2 == 0 && albumType != 12 ){
			$('describeAlbum').innerHTML = '该相册还没有描述，<a href="http://photo.'+ XN.env.domain + '/editalbum.do?id='+id+'">点此处添加 &raquo;</a>'
		}
	},
    cutStr: function cutstr(str, len){
        if(!str || !len) { return ''; }
	    var a = 0;
	   	var i = 0;
	    var temp = '';
	    for (i=0;i<str.length;i++)
	    {	       
		   str.charCodeAt(i)>255 ? a+=2 : a++;
		
	       if(a > len) { return temp; }
	         temp += str.charAt(i);
	    }
	    return str;
	}
    
}
var albumPhotoList = XN.PAGE.albumList;
XN.dom.ready(function(){
	albumPhotoList.showAlbumTitle(albumDes);
})


XN.dom.ready(function(){
	if(!$('friendSelectorCM')) return;
    var selector = new XN.ui.friendSelectorWithMenu({
			autoSelectFirst : true,
			noInput : '输入好友的姓名'
		});
    selector.input.style.width = '125px';
    $('friendSelectorCM').setContent(selector);
    selector.addEvent('select', function(p){
		location.href = 'http://photo.'+ XN.env.domain + '/getalbumlist.do?id=' + p.id
    });
	
	new XN.FORM.inputHelper( selector.input ).setDefaultValue( '查看其他好友相册' );
 });

