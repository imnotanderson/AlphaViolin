var bSayWord = [];
var f;
var oSeeIfMessage = setInterval(function() {
	var oMessages = document.getElementsByClassName('member_msg text_ellipsis');
	for (var i = 0; i < oMessages.length; i++) {
		if (bSayWord[i] == null) {
			bSayWord.push(false);
		};
		if (oMessages[i].innerHTML != '' && oMessages[i].id.indexOf('recent-item-') != -1) {
			if (oMessages[i].innerHTML.indexOf('召唤') != -1) {
				bSayWord[i] = true;
			} else if (oMessages[i].innerHTML.indexOf('走开') != -1) {
				bSayWord[i] = false;
				oMessages[i].click();
				document.getElementById('chat_textarea').value = '(ಥ _ ಥ)悄悄的我走了。。';
				document.getElementById('send_chat_btn').click();
				oMessages[i].innerHTML = '';
				document.getElementById('panelRightButton-5').click();
			};
			if (!bSayWord[i]) {
				return;
			};
			console.log(oMessages[i].innerHTML);
			oMessages[i].click();
			var iNowTalkCount = document.getElementById('panelBody-5').getElementsByTagName('div').length;
			var sSayAsk = 'NoGet';

			if(document.getElementById('panelBody-5').getElementsByTagName('div')[iNowTalkCount - 1].className.indexOf('self')!=-1){
				return
			}
			
			if (document.getElementById('panelBody-5').getElementsByTagName('div')[iNowTalkCount - 1].getElementsByClassName('chat_content').length > 0) {
				sSayAsk = document.getElementById('panelBody-5').getElementsByTagName('div')[iNowTalkCount - 1].getElementsByClassName('chat_content')[0].innerHTML
			} else {
				sSayAsk = document.getElementById('panelBody-5').getElementsByTagName('div')[1].getElementsByClassName('chat_content')[0].innerHTML
			};

			f = function(str){
				document.getElementById('chat_textarea').value = str;
				document.getElementById('send_chat_btn').click();
				oMessages[i].innerHTML = '';
				document.getElementById('panelRightButton-5').click();	
			}

			sendAjaxRequest("http://127.0.0.1:4000/?q="+sSayAsk);

		}
	}
}, 900);

var XMLHttpReq;  
function createXMLHttpRequest() {  
    try {  
        XMLHttpReq = new ActiveXObject("Msxml2.XMLHTTP");//IE高版本创建XMLHTTP  
    }  
    catch(E) {  
        try {  
            XMLHttpReq = new ActiveXObject("Microsoft.XMLHTTP");//IE低版本创建XMLHTTP  
        }  
        catch(E) {  
            XMLHttpReq = new XMLHttpRequest();//兼容非IE浏览器，直接创建XMLHTTP对象  
        }  
    }  
  
}  
function sendAjaxRequest(url) {  
    createXMLHttpRequest();                                //创建XMLHttpRequest对象  
    XMLHttpReq.open("post", url, true);  
    XMLHttpReq.onreadystatechange = processResponse; //指定响应函数  
    XMLHttpReq.send(null);
}  
//回调函数  
function processResponse() {  
    if (XMLHttpReq.readyState == 4) {  
        if (XMLHttpReq.status == 200) {  
            var text = XMLHttpReq.responseText;  
  
            /** 
             *实现回调 
             */  
            text = window.decodeURI(text);  
            f(text);
  
        }  
    }  
  
}  
