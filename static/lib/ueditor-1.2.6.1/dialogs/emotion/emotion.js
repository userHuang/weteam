window.onload = function () {
    editor.setOpt({
        emotionLocalization:false
    });

    emotion.SmileyPath = editor.options.emotionLocalization === true ? 'images/' : "http://img.baidu.com/hi/";
    emotion.SmileyBox = createEmotionTable();
    //emotion.tabExist = createArr( emotion.tabNum );

    //initImgName();
    //initEvtHandler( "tabHeads" );
};

window.WEIXIN_EMOTIONS = [
    {path:"1.gif", name:"/微笑"},
    {path:"2.gif", name:"/撇嘴"},
    {path:"3.gif", name:"/色"},
    {path:"4.gif", name:"/发呆"},
    {path:"5.gif", name:"/得意"},
    {path:"6.gif", name:"/流泪"},
    {path:"7.gif", name:"/害羞"},
    {path:"8.gif", name:"/闭嘴"},
    {path:"9.gif", name:"/睡"},
    {path:"10.gif", name:"/大哭"},
    {path:"11.gif", name:"/尴尬"},
    {path:"12.gif", name:"/发怒"},
    {path:"13.gif", name:"/调皮"},
    {path:"14.gif", name:"/呲牙"},
    {path:"15.gif", name:"/惊讶"},
    {path:"16.gif", name:"/难过"},
    {path:"17.gif", name:"/酷"},
    {path:"18.gif", name:"/冷汗"},
    {path:"19.gif", name:"/抓狂"},
    {path:"20.gif", name:"/吐"},
    {path:"21.gif", name:"/偷笑"},
    {path:"22.gif", name:"/可爱"},
    {path:"23.gif", name:"/白眼"},
    {path:"24.gif", name:"/傲慢"},
    {path:"25.gif", name:"/饥饿"},
    {path:"26.gif", name:"/困"},
    {path:"27.gif", name:"/惊恐"},
    {path:"28.gif", name:"/流汗"},
    {path:"29.gif", name:"/憨笑"},
    {path:"30.gif", name:"/大兵"},
    {path:"31.gif", name:"/奋斗"},
    {path:"32.gif", name:"/咒骂"},
    {path:"33.gif", name:"/疑问"},
    {path:"34.gif", name:"/嘘"},
    {path:"35.gif", name:"/晕"},
    {path:"36.gif", name:"/折磨"},
    {path:"37.gif", name:"/衰"},
    {path:"38.gif", name:"/骷髅"},
    {path:"39.gif", name:"/敲打"},
    {path:"40.gif", name:"/再见"},
    {path:"41.gif", name:"/擦汗"},
    {path:"42.gif", name:"/抠鼻"},
    {path:"43.gif", name:"/鼓掌"},
    {path:"44.gif", name:"/糗大了"},
    {path:"45.gif", name:"/坏笑"},
    {path:"46.gif", name:"/左哼哼"},
    {path:"47.gif", name:"/右哼哼"},
    {path:"48.gif", name:"/哈欠"},
    {path:"49.gif", name:"/鄙视"},
    {path:"50.gif", name:"/委屈"},
    {path:"51.gif", name:"/快哭了"},
    {path:"52.gif", name:"/阴险"},
    {path:"53.gif", name:"/亲亲"},
    {path:"54.gif", name:"/吓"},
    {path:"55.gif", name:"/可怜"},
    {path:"56.gif", name:"/菜刀"},
    {path:"57.gif", name:"/西瓜"},
    {path:"58.gif", name:"/啤酒"},
    {path:"59.gif", name:"/篮球"},
    {path:"60.gif", name:"/乒乓"},
    {path:"61.gif", name:"/咖啡"},
    {path:"62.gif", name:"/饭"},
    {path:"63.gif", name:"/猪头"},
    {path:"64.gif", name:"/玫瑰"},
    {path:"65.gif", name:"/凋谢"},
    {path:"66.gif", name:"/示爱"},
    {path:"67.gif", name:"/爱心"},
    {path:"68.gif", name:"/心碎"},
    {path:"69.gif", name:"/蛋糕"},
    {path:"70.gif", name:"/闪电"},
    {path:"71.gif", name:"/炸弹"},
    {path:"72.gif", name:"/刀"},
    {path:"73.gif", name:"/足球"},
    {path:"74.gif", name:"/瓢虫"},
    {path:"75.gif", name:"/便便"},
    {path:"76.gif", name:"/月亮"},
    {path:"77.gif", name:"/太阳"},
    {path:"78.gif", name:"/礼物"},
    {path:"79.gif", name:"/拥抱"},
    {path:"80.gif", name:"/强"},
    {path:"81.gif", name:"/弱"},
    {path:"82.gif", name:"/握手"},
    {path:"83.gif", name:"/胜利"},
    {path:"84.gif", name:"/抱拳"},
    {path:"85.gif", name:"/勾引"},
    {path:"86.gif", name:"/拳头"},
    {path:"87.gif", name:"/差劲"},
    {path:"88.gif", name:"/爱你"},
    {path:"89.gif", name:"/NO"},
    {path:"90.gif", name:"/OK"},
    {path:"91.gif", name:"/爱情"},
    {path:"92.gif", name:"/飞吻"},
    {path:"93.gif", name:"/跳跳"},
    {path:"94.gif", name:"/发抖"},
    {path:"95.gif", name:"/怄火"},
    {path:"96.gif", name:"/转圈"},
    {path:"97.gif", name:"/磕头"},
    {path:"98.gif", name:"/回头"},
    {path:"99.gif", name:"/跳绳"},
    {path:"100.gif", name:"/挥手"},
    {path:"101.gif", name:"/激动"},
    {path:"102.gif", name:"/街舞"},
    {path:"103.gif", name:"/献吻"},
    {path:"104.gif", name:"/左太极"},
    {path:"105.gif", name:"/右太极"},
]

function initImgName() {
    for ( var pro in emotion.SmilmgName ) {
        var tempName = emotion.SmilmgName[pro],
                tempBox = emotion.SmileyBox[pro],
                tempStr = "";

        if ( tempBox.length ) return;
        for ( var i = 1; i <= tempName[1]; i++ ) {
            tempStr = tempName[0];
            if ( i < 10 ) tempStr = tempStr + '0';
            tempStr = tempStr + i + '.gif';
            tempBox.push( tempStr );
        }
    }
}

function initEvtHandler( conId ) {
    var tabHeads = $G( conId );
    for ( var i = 0, j = 0; i < tabHeads.childNodes.length; i++ ) {
        var tabObj = tabHeads.childNodes[i];
        if ( tabObj.nodeType == 1 ) {
            domUtils.on( tabObj, "click", (function ( index ) {
                return function () {
                    switchTab( index );
                };
            })( j ) );
            j++;
        }
    }
    switchTab( 0 );
    $G( "tabIconReview" ).style.display = 'none';
}

function InsertSmiley( url, evt ) {
    var obj = {
        src: url
    };
    obj.data_ue_src = obj.src;
    editor.execCommand( 'insertimage', obj );
    if ( !evt.ctrlKey ) {
        dialog.popup.hide();
    }
}

function autoHeight( index ) {
    var iframe = dialog.getDom( "iframe" ),
            parent = iframe.parentNode.parentNode;
    iframe.style.height = "195px";
    parent.style.height = "205px";
    iframe.style.width = "470px";
    parent.style.width = "470px";
}


function createEmotionTable() {
    autoHeight();
    var faceVersion = "?v=1.1", //版本号
            tab = $G('tabBodys'), //获取将要生成的Div句柄
            imagePath = '/static/lib/ueditor-1.2.6.1/dialogs/emotion/images/weixin/' //获取显示表情和预览表情的路径
            positionLine = 15 / 2, //中间数
            iWidth = iHeight = 24, //图片长宽
            iColWidth = 3, //表格剩余空间的显示比例
            textHTML = ['<table class="smileytable">'],
            imgColNum = 15, faceImage = null,
            sUrl = null, realUrl = null, posflag = null, offset = null, infor = null;

    for (var i = 0; i < 7; ++i) {
        textHTML.push( '<tr>' );
        for (var j = 0; j < imgColNum; ++j) {
            var index = i*imgColNum + j;
            faceImage = WEIXIN_EMOTIONS[index];
            if ( faceImage ) {
                sUrl = imagePath + faceImage['path'] + faceVersion;
                realUrl = imagePath + faceImage['path'];
                posflag = j < positionLine ? 0 : 1;
                offset = 0 - (index * 24);
                infor = faceImage['name'];

                textHTML.push( '<td class="weixin" border="1" width="24px" style="border-collapse:collapse;" align="center"  bgcolor="transparent" onclick="InsertSmiley(\'' + realUrl.replace( /'/g, "\\'" ) + '\',event)" onmouseover="over(this,\'' + sUrl + '\',\'' + posflag + '\')" onmouseout="out(this)">' );
                textHTML.push( '<span>' );
                textHTML.push( '<img  style="background-position:' + offset + 'px 0px;" title="' + infor + '" src="/static/lib/ueditor-1.2.6.1/dialogs/emotion/images/0.gif" width="' + iWidth + '" height="' + iHeight + '"></img>' );
                textHTML.push( '</span>' );
            } else {
                textHTML.push( '<td width="24px" bgcolor="#FFFFFF">' );
            }
            textHTML.push( '</td>' );
        }
        textHTML.push( '</tr>' );
    }
    textHTML.push( '</table>' );
    textHTML = textHTML.join( "" );
    tab.innerHTML = textHTML;
}


function over( td, srcPath, posFlag ) {
    td.style.backgroundColor = "#ACCD3C";
    $G( 'faceReview' ).style.backgroundImage = "url(" + srcPath + ")";
    if ( posFlag == 1 ) $G( "tabIconReview" ).className = "show";
    $G( "tabIconReview" ).style.display = 'block';
}

function out( td ) {
    td.style.backgroundColor = "transparent";
    var tabIconRevew = $G( "tabIconReview" );
    tabIconRevew.className = "";
    tabIconRevew.style.display = 'none';
}


