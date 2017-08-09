//加载公共头部
define(function(require,exports,module){
		var common=require("common");
		common.loadh();
		common.loadf();
		//模板引擎
		$.get("json/shuju.json",function(data){
			var arr=[];
			for(let i in data.productjson){
				arr.push(i)
			}			
			var html0="";
			for(let i=0;i<4;i++){
				html0+="<li><a href='particulars.html?"+arr[i]+"'><img src='"+data.productjson[arr[i]].img1url[0]+"'></a></li>"
			}
			$(".guild").html(html0);
			var number=location.search.substr(1);
			var data=data.productjson[number];
			var html=template("titles",data);
			$("#title").append(html);
			var html1=template("show",data);
			$(".show").append(html1);
			var html2=template("detail",data);
			$(".detail").append(html2);
			$(".zhong").hover(
			function(){
				$(".ze").css("display","block");
			},
			function(){
				$(".ze").css("display","none");
			}
			)		
			$(".zhong").mousemove(function(eve){
					var e=eve||event;
					var x1=e.pageX-$(".zhong").offset().left-$(".ze").width()/2;
					var y1=e.pageY-$(".zhong").offset().top-$(".ze").height()/2;
					if(x1<0){
						x1=0;
					}
					if(y1<0){
						y1=0;
					}
					if(x1>$(".zhong").width()-$(".ze").width()){
						x1=$(".zhong").width()-$(".ze").width()
					}
					if(y1>$(".zhong").height()-$(".ze").height()){
						y1=$(".zhong").height()-$(".ze").height()
					}
					$(".ze").css({left:x1,top:y1});
					var ox=$(".ze").position().left*$(".imgb").width()/$(".zhong").width();
					var oy=$(".ze").position().top*$(".imgb").height()/$(".zhong").height();
					$(".imgb").css({left:-ox,top:-oy});
					$(".da").css("display","block");
					return false;			
			})
			$(".zhong").mouseout(function(eve){
				$(".da").css("display","none");
			})
			$(".min").children().children().mouseover(function(){
				var imgSrc=$(this).attr("src");
				$(".zhong").find("img").attr({"src":imgSrc});
				$(".da").children().find("img").attr({"src":imgSrc});
			})
			
			/*设置购物车数量部分!!!!!!!!!*/
			var flag=false;
			$("#smsg").html("请选择");
			$(".pronu").attr("disabled","disabled");
			$("#checkpro").click(function(){
				$(this).toggleClass("ib");
				flag=($("#checkpro").attr("class")=="ib");
				//input改变数量事件
				if(flag==false){
						$(".pronu").attr("disabled","disabled");						
				}else{		
						$("#smsg").html("");
						$(".pronu").removeAttr("disabled");
					}
			})
					/*设置当加号被点击数量增加事件*/	
					$(".addbtn").click(function(){
						if(flag==true){
							$("#smsg").html("");
						$(".pronu").val(Number($(".pronu").val())+1);
						}
						else{
							$("#smsg").html("请选择");
						}
					})
					/*设置当减号被点击数量增加事件*/	
					$(".minusbtn").click(function(){
						if(flag==true){
							$("#smsg").html("");
						if($(".pronu").val()>0){
							$(".pronu").val(Number($(".pronu").val())-1);
						}
						}
						else{
							$("#smsg").html("请选择");
						}
					})
					/*设置加购物车存cookie事件*/
					var str=$.cookie("cart");
					var obj=str? JSON.parse(str):{};					
					function Sum(){
						var sum=0;
						for(var i in obj){
						sum+=obj[i];
						}
					$(".shopsum").html(sum);
					}
					Sum();
					$("#shopcar").click(function(){
						if(flag==false){
							alert("请选择商品种类");
						}else{
							if(obj[data.productId]==undefined){
							obj[data.productId]=Number($(".pronu").val());
							}else{
							obj[data.productId]+=Number($(".pronu").val());
							
							}
							$("#carmsg").css("display","block");
							var objTostr=JSON.stringify(obj);
							$.cookie("cart",objTostr,{expires:7});
							Sum();
							
						}						
					})
					$("#carmsg").height(document.body.clientHeight);
					/*设置关闭事件*/
					setInterval(function(){
						$("#carmsg").css("display","none");
					},4000)
					$(".cha").click(function(){
						$("#carmsg").css("display","none");
					})
		})
})
			

		