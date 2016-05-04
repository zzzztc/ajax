//版权 北京智能社©, 保留所有权利

//data 	后台要的数据
//options	=	url,data,type,timeout,success,error
function ajax(options){
	
	options=options||{};
	options.data=options.data||{};
	options.type=options.type||'get';
	options.timeout=options.timeout||0;
	
	
	//整理data数据
	options.data.t=Math.random();//给data创建一个t 键
	var arr=[];
	for(var key in options.data){
		arr.push(key+'='+encodeURIComponent(options.data[key]));	
	}
	var str=arr.join('&');
	
	if(window.XMLHttpRequest){//1
		var oAjax=new XMLHttpRequest();	
	}else{
		var oAjax=new ActiveXObject('Microsoft.XMLHTTP');	
	}
	
	if(options.type=='get'){
		oAjax.open('get',options.url+'?'+str,true);//2
	
		oAjax.send();//3
	}else{//post
		oAjax.open('post',options.url,true);
			
		//设定ajax的头信息
		oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		
		oAjax.send(str);
		
	}
	
	oAjax.onreadystatechange=function(){//4
		if(oAjax.readyState==4){
			if(oAjax.status>=200 && oAjax.status<300 || oAjax.status==304){
				clearInterval(timer);
				options.success && options.success(oAjax.responseText)
			}else{
				options.error && options.error(oAjax.status);
			}
		}
	};
	if(options.timeout){
		var timer=setTimeout(function(){
			alert('超时了');	
			oAjax.abort();	//终止加载	
		},options.timeout);
	}
	
}