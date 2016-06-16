
/*无缝滚动*/

window.onload=function(){
	var speed=30;
	var box=document.getElementById("box1");
	var left=document.getElementById("left");
	var right=document.getElementById("right");

	right.innerHTML=left.innerHTML;

	var time=setInterval(fun,speed);
	function fun()
	{
		if(left.offsetWidth-box.scrollLeft<=0)
		{
			box.scrollLeft=0;
		}
		else
		{
			box.scrollLeft++;
		}
	}

	$(box).mouseover(function(event) {
		clearInterval(time);

	},function(){
		
		time=setInterval(fun, speed);
	});
}

