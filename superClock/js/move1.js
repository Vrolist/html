function getStyle(obj,attr){
　if(obj.currentStyle){
　　　return obj.currentStyle[attr];//IE
　  }else{
　　　return getComputedStyle(obj,false)[attr];//FF
　　}
}
function startMove(obj,json,sv,svr,fn) //sv调整速度，svr调整延时时间 svr,sv必须传值，不传值只能放在后面
{			
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var sTop=true;       //假设所有的都运动到了	
		for(var attr in json){
			var cur=0;
			if(attr=='opacity'){
				cur=Math.round(parseFloat(getStyle(obj,attr))*100);   //round主要是去除浮点数 比如7.00000001
			}
			else{
				cur=parseInt(getStyle(obj,attr));
			}
			var speed=(json[attr]-cur)/(sv||5);//如果没有传入sv，则为5
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			if(cur!=json[attr])sTop=false;//如果循环过程中存在尚未结束的运动，sTop为假
			if(attr=='opacity'){
				obj.style.filter='alpha(opacity:'+cur+speed+')';    //IE
				obj.style.opacity=(cur+speed)/100;     //FF
			}
			else{
				obj.style[attr]=cur+speed+'px';
			}	
		}
		if(sTop){
			clearInterval(obj.timer);
			if(fn)fn();
		}								
	},(svr||30));	//如果没有传入svr，则为30
}