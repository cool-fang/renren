$(document).ready(function(){
infoview("选择地区","薪资要求","工作经验","学历要求");
});
//清空筛选条件
function clearall() {
    var address=document.getElementById("address").innerHTML = "选择地区";
    var paywant=document.getElementById("paywant").innerHTML = "薪资要求";
    var worktime=document.getElementById("worktime").innerHTML = "工作经验";
    var studylevel=document.getElementById("studylevel").innerHTML = "学历要求";
    document.getElementById("infoview").innerHTML = "";
    infoview(address,paywant,worktime,studylevel);
}

//发送条件列表数据至后台查询
//地区选择

function adr() {
    var address = document.getElementById("ress").getElementsByTagName("a");
    var menu1 = document.getElementById("address");
    for (i = 0; i < address.length; i++) {
        address[i].onclick = function () {
            menu1.innerHTML = this.innerHTML;
            var address=menu1.innerHTML;
            // 当点击事件发生后 获取其他三个条件
            var paywant = document.getElementById("paywant").innerHTML;
            var worktime = document.getElementById("worktime").innerHTML;
            var studylevel = document.getElementById("studylevel").innerHTML;
            //清除页面当前查询结果
            document.getElementById("infoview").innerHTML = "";
            infoview(address,paywant,worktime,studylevel);
            //将查询条件发送到后台处理
        }
    }
}

function pay() {
    var want = document.getElementById("want").getElementsByTagName("a");
    var paywant1 = document.getElementById("paywant");
    for (i = 0; i < want.length; i++) {
        want[i].onclick = function () {
            paywant1.innerHTML = this.innerHTML;
            var paywant=paywant1.innerHTML;
            var address = document.getElementById("address").innerHTML;
            var worktime = document.getElementById("worktime").innerHTML;
            var studylevel = document.getElementById("studylevel").innerHTML;
            document.getElementById("infoview").innerHTML = "";
            infoview(address,paywant,worktime,studylevel);
        }
    }
}

function work() {
    var time = document.getElementById("time").getElementsByTagName("a");
    var worktime1 = document.getElementById("worktime");
    for (i = 0; i < time.length; i++) {
        time[i].onclick = function () {
            worktime1.innerHTML = this.innerHTML;
            var worktime=worktime1.innerHTML;
            var address = document.getElementById("address").innerHTML;
            var paywant = document.getElementById("paywant").innerHTML;
            var studylevel = document.getElementById("studylevel").innerHTML;
            document.getElementById("infoview").innerHTML = "";
            infoview(address,paywant,worktime,studylevel);

        }
    }
}

function stu() {
    var level = document.getElementById("level").getElementsByTagName("a");
    var studylevel1 = document.getElementById("studylevel");
    for (i = 0; i < level.length; i++) {
        level[i].onclick = function () {
            studylevel1.innerHTML = this.innerHTML;
            var studylevel=studylevel1.innerHTML;
            var address = document.getElementById("address").innerHTML;
            var paywant = document.getElementById("paywant").innerHTML;
            var worktime = document.getElementById("worktime").innerHTML;
            document.getElementById("infoview").innerHTML = "";
            infoview(address,paywant,worktime,studylevel);
		}
	}
}

function infoview(address,paywant,worktime,studylevel){
	 $('#infoview').empty();
	var span=getQueryVariable("span");
	console.log("拼接的参数的值："+span);
	$.post(
	    "infoview.do",
	    {"place": address, "pay": paywant, "time": worktime, "level": studylevel,"span":span},
	    function (data) {
	        var li = "";
	        //alert("回调函数已经被加载!")
	        if (data == "") {
	            // alert("未查询到符合当前条件数据!")
				$("#infoview").css("background-image","url(image/404.png)");
	        } else {
				$("#infoview").css("background-image","");
	            //输出到前端控制器
	            //alert(data.length)
	            for (var i = 0; i < data.length; i++) {
	            	if(data[i].gs_image==null){
						data[i].gs_image='image/timg.jpg';
					}
	                li += '<li class="infoli" onclick="getvaule('+data[i].id+')">' +
	                    '<div class="info">' +
	                    '<div class="info1">' +
	                    '<span class="job">' + data[i].job + '</span>' + '<span class="didian">' + '[' + data[i].place + ']' + '</span>' +
	                    '<span class="company">' + data[i].name + '</span>' +
	                    '<div class="tupian">' + '<img src="'+data[i].gs_image+'">' + '</div>' +
	                    '</div>' +
	                    '<div class="info2">' +
	                    '<span class="gongzi">' + data[i].pay + '</span>' + '<span class="jingyan">' + data[i].time + '</span>' + '|' + '<span class="xueli">' + data[i].level + '</span>' +
	                    '</div>' +
	                    '</div>' +
	                    '</li>';
	            }
	            $('#infoview').append(li);
	            //alert("成功查询到数据")
	            goPage(1,10);
	            //获取跳转当前页
	            var tempOption="";
	            for(var i=1;i<=totalPage;i++)
	            {
	                tempOption+='<option value='+i+'>'+i+'</option>'
	            }
	            $("#jumpWhere").html(tempOption);
	        }
	    }
	);
}


//显示快捷登录弹出框
$(function () {
    $(".tbox").click(function () {
        $('#myModal').modal('show') //显示模态框
    })

});


//前台用户名展示
$(function () {
    $.post(
        "showuserinfo.do",
        function (data) {
            //console.log("当前session存入的值："+data.name);
            if(!(data=="")){
                var loginid='<a href=\"#\" data-container=\"body\" id=\"showusername\">'+data.name+'</a>';
				// 用户暂未设置头像
				if(data.yh_image==null){
					$("#login").html('<img src='+'image/timg.jpg'+' id="yhimage">');
					}else{
					$("#login").html('<img src='+data.yh_image+' id="yhimage">');
					}
                $("#register").html(loginid);
            }
        }
    );

	$("#register").on("click","#showusername",function() {
		window.open("ptyhinfo.html");
	});
});
// data-trigger="mouseover"

//提示弹出框
// $(document).on("mouseover mouseout","#register a",function(event){
//     $("[data-toggle='popover']").popover();
// });
// 固定条件列

// $(function(){
// //获取要定位元素距离浏览器顶部的距离
// var navH = $("#selector").offset().top;
// //滚动条事件
// $(window).scroll(function(){
// //获取滚动条的滑动距离
// var scroH = $(this).scrollTop();
// //滚动条的滑动距离大于等于定位元素距离浏览器顶部的距离，就固定，反之就不固定
// if(scroH>=navH){
// $("#selector").css({"position":"fixed","top":0});
// }else if(scroH<navH){
// $("#selector").css({"position":"static"});
// }
// })
// });

// 点击招聘信息跳转页面
function getvaule(id) {
    console.log(id);
   window.open("jobcontent.html?id="+id);
}

// 悬浮层菜单展示
 $(document).ready(function(){
				$("#showalljob").mouseenter(function() {
	 		       $("#alljob").show();
	 		   });
	 		   $("#showalljob").mouseleave(function() {
	 		       $("#alljob").hide();
	 		   });
	 			 $("#alljob").hover(function () {
	 			 $("#alljob").show();
	 			 }, function () {
	 			 $("#alljob").hide();
	 			 });
				 $("#alljob").mouseleave(function() {
					 $("#alljob").hide();
				 });
		
		   $(".li0").mouseenter(function() {
		       $("#divli0").show();
		   });
		   $(".li0").mouseleave(function() {
		       $("#divli0").hide();
		   });
			 $("#divli0").hover(function () {
			 $("#divli0").show();
			 $(".li0").css("background", "#5dd5c8");		
			 }, function () {
			$(".li0").css("background", "");
			 $("#divli0").hide();
			 });
			 
			 
		 $(".li1").mouseenter(function() {
					$("#divli1").show();
					});
					$(".li1").mouseleave(function() {
					   $("#divli1").hide();
					});
					 $("#divli1").hover(function () {
					  $("#divli1").show();
					  $(".li1").css("background", "#5dd5c8");
					  }, function () {
					 $(".li1").css("background", "");
					  $("#divli1").hide();
					  });
		 $(".li2").mouseenter(function() {
					   $("#divli2").show();
				   });
				   $(".li2").mouseleave(function() {
					   $("#divli2").hide();
				   });
					 $("#divli2").hover(function () {
					  $("#divli2").show();
					  $(".li2").css("background", "#5dd5c8");
					  }, function () {
					 $(".li2").css("background", "");
					  $("#divli2").hide();
					  });
		$(".li3").mouseenter(function() {
				       $("#divli3").show();
				   });
				   $(".li3").mouseleave(function() {
				       $("#divli3").hide();
				   });
					 $("#divli3").hover(function () {
					  $("#divli3").show();
					  $(".li3").css("background", "#5dd5c8");
					  }, function () {
					 $(".li3").css("background", "");
					  $("#divli3").hide();
					  });
		 $(".li4").mouseenter(function() {
		 		       $("#divli4").show();
		 		   });
		 		   $(".li4").mouseleave(function() {
		 		       $("#divli4").hide();
		 		   });
		 			 $("#divli4").hover(function () {
		 			  $("#divli4").show();
		 			  $(".li4").css("background", "#5dd5c8");
		 			  }, function () {
		 			 $(".li4").css("background", "");
		 			  $("#divli4").hide();
		 			  });
		 $(".li5").mouseenter(function() {
		 		       $("#divli5").show();
		 		   });
		 		   $(".li5").mouseleave(function() {
		 		       $("#divli5").hide();
		 		   });
		 			 $("#divli5").hover(function () {
		 			  $("#divli5").show();
		 			  $(".li5").css("background", "#5dd5c8");
		 			  }, function () {
		 			 $(".li5").css("background", "");
		 			  $("#divli5").hide();
		 			  });
		 $(".li6").mouseenter(function() {
		 		       $("#divli6").show();
		 		   });
		 		   $(".li6").mouseleave(function() {
		 		       $("#divli6").hide();
		 		   });
		 			 $("#divli6").hover(function () {
		 			  $("#divli6").show();
		 			  $(".li6").css("background", "#5dd5c8");
		 			  }, function () {
		 			 $(".li6").css("background", "");
		 			  $("#divli6").hide();
		 			  });
		$(".li7").mouseenter(function() {
				    $("#divli7").show();
				    });
				    $(".li7").mouseleave(function() {
				        $("#divli7").hide();
				    });
					$("#divli7").hover(function () {
					 $("#divli7").show();
					 $("#alljob").show();
					 $(".li7").css("background", "#5dd5c8");
					 }, function () {
					$("#alljob").hide();
					$(".li7").css("background", "");
					 $("#divli7").hide();
					 });
		$(".li8").mouseenter(function() {
				       $("#divli8").show();
				   });
				   $(".li8").mouseleave(function() {
				       $("#divli8").hide();
				   });
					 $("#divli8").hover(function () {
					  $("#divli8").show();
					  $("#alljob").show();
					  $(".li8").css("background", "#5dd5c8");
					  }, function () {
					$("#alljob").hide();
					 $(".li8").css("background", "");
					  $("#divli8").hide();
					  });
		
		$(".li9").mouseenter(function() {
				       $("#divli9").show();
				   });
				   $(".li9").mouseleave(function() {
				       $("#divli9").hide();
				   });
					$("#divli9").hover(function () {
					 $("#divli9").show();
					 $("#alljob").show();
					 $(".li9").css("background", "#5dd5c8");
					 }, function () {
						$("#alljob").hide();				
					$(".li9").css("background", "");
					 $("#divli9").hide();
					 });
					 
		$(".li10").mouseenter(function() {
				       $("#divli10").show();
				   });
				   $(".li10").mouseleave(function() {
				       $("#divli10").hide();
				   });
					 $("#divli10").hover(function () {
					  $("#divli10").show();
					  $("#alljob").show();
					  $(".li10").css("background", "#5dd5c8");
					  }, function () {
					 	$("#alljob").hide();				
					 $(".li10").css("background", "");
					  $("#divli10").hide();
					  });
		
		$(".li11").mouseenter(function() {
				       $("#divli11").show();
				   });
				   $(".li11").mouseleave(function() {
				       $("#divli11").hide();
				   });
					 $("#divli11").hover(function () {
					  $("#divli11").show();
					  $("#alljob").show();
					  $(".li11").css("background", "#5dd5c8");
					  }, function () {
					 $("#alljob").hide();					
					 $(".li11").css("background", "");
					  $("#divli11").hide();
					  });
		$(".li12").mouseenter(function() {
				       $("#divli12").show();
				   });
				   $(".li12").mouseleave(function() {
				       $("#divli12").hide();
				   });
					$("#divli12").hover(function () {
					$("#divli12").show();
					$("#alljob").show();
					$(".li12").css("background", "#5dd5c8");
					}, function () {
					$("#divli12").hide();
					$("#alljob").hide();
					$(".li12").css("background", "");
					});
		$(".li13").mouseenter(function() {
				       $("#divli13").show();
				   });
				   $(".li13").mouseleave(function() {
				       $("#divli13").hide();
				   });
					 $("#divli13").hover(function () {
					 $("#divli13").show();
					 $("#alljob").show();
					 $(".li13").css("background", "#5dd5c8");
					 }, function () {
					 $("#divli13").hide();
					 $("#alljob").hide();
					 $(".li13").css("background", "");
					 });
		$(".li14").mouseenter(function() {
				       $("#divli14").show();
				   });
				   $(".li14").mouseleave(function() {
				       $("#divli14").hide();
				   });
					 $("#divli14").hover(function () {
					 $("#divli14").show();
					 $("#alljob").show();
					 $(".li14").css("background", "#5dd5c8");
					 }, function () {
					 $("#divli14").hide();
					 $("#alljob").hide();
					 $(".li14").css("background", "");
					 });
		$(".li15").mouseenter(function() {
				       $("#divli15").show();
				   });
				   $(".li15").mouseleave(function() {
				       $("#divli15").hide();
				   });
					 $("#divli15").hover(function () {
					 $("#divli15").show();
					 $("#alljob").show();
					 $(".li15").css("background", "#5dd5c8");
					 }, function () {
					 $("#divli15").hide();
					 $("#alljob").hide();
					 $(".li15").css("background", "");
					 });
		$(".li16").mouseenter(function() {
				       $("#divli16").show();
				   });
				   $(".li16").mouseleave(function() {
				       $("#divli16").hide();
				   });
					 $("#divli16").hover(function () {
					 $("#divli16").show();
					 $("#alljob").show();
					 $(".li16").css("background", "#5dd5c8");
					 }, function () {
					 $("#divli16").hide();
					 $("#alljob").hide();
					 $(".li16").css("background", "");
					 });
});

// 点击主页的列表中的span标签把span标签的内容添加到url中发送到后天jobinfo页面输出
 $(document).ready(function(){
	  $("#showjoblist").on("click","span",function(){
	    //console.log($(this).text());
	    var span=$(this).text();
		setjobtourl(span);
	});
	$("#divli").on("click","span",function(){
	    //console.log($(this).text());
		setjobtourl($(this).text());
	});
	// 点击li让workspan变色
	$(document).on("mouseenter",".jobviewdiv li",function(){
		$(this).find('span[id="workspan"]').attr("style","color:#5dd5c8;transition-duration: 0.5s;");
	});
	$(document).on("mouseleave",".jobviewdiv li",function(){
		$(this).find('span[id="workspan"]').attr("style","");
	});
	// 输入框圆角
	$('.canvainput input').focus(function(){
		$('.canvainput input').attr("style","border-top-left-radius: 30px;border-bottom-left-radius: 30px;transition-duration: 0.5s;");
		$('.canvainput span').attr("style","border-top-right-radius: 30px;border-bottom-right-radius: 30px;transition-duration: 0.5s;");
	});
	$('.canvainput input').blur(function(){
		$('.canvainput input').attr("style","transition-duration: 0.5s;");
		$('.canvainput span').attr("style","transition-duration: 0.5s;");
	});	
}); 

function setjobtourl(span){
		$('#infoview').empty();
	  window.open("jobinfo.html?span="+span);
}
//回去url中的参数
function getQueryVariable(variable)
{
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		if(pair[0] == variable){return pair[1];}
	}
	return(false);
}
//特推工作推荐
// 声明全局变量
var dianjispan="IT.互联网";
 $(document).ready(function(){
	 // 点击对应的li修改其样式
	 hotjob();
	 $(".hotjoblist ul li:first").attr("style","color:#5dd5c8;font-weight: 600;	border-bottom: 3px solid #5dd5c8;");
	 //默认选中第一个li加载出的数据
	 $(".jobviewdiv").empty();
	 $.post(
	 "hostjobview.do",
	 {"span":"IT.互联网"},
	 	function (data) {
			var li = "";
			for (var i = 0; i < data.length; i++) {
				li += '<li onclick="getvaule('+data[i].id+')">' +
					'<div>' +
					'<img src="' + data[i].gs_image + '" />' +
					'<span id="workspan">' + data[i].job + '</span>' +
					'<span id="adrspan">' + data[i].place + '</span>' +
					'<span class="shuxian">' + '|' + '</span>' +
					'<span id="timespan">' + data[i].time + '</span>' +
					'<span id="levelspan">' + data[i].level + '</span>' +
					'<span class="yuandian">' + '.' + '</span>' +
					'<span id="payspan">' + data[i].pay + '</span>' +
					'</div>' +
					'</li>';
			}
			$(".jobviewdiv").append(li);
		}
	 );
	 $(".hotjoblist ul li").click(function(){
	 		 $(this).siblings().attr("style","");
	 		 $(this).attr("style","color:#5dd5c8;font-weight: 600;	border-bottom: 3px solid #5dd5c8;");
	 }); 
	 
	 // 点击查看更多
	 $(".morejob").click(function(){ 
		  //console.log("这是全局变量的值:"+dianjispan);		  
		  window.open("jobinfo.html?span="+dianjispan);
	 });
 });

function hotjob(){
var lilist=$(".hotjoblist ul li");
	 for(var i=0;i<9;i++){
		 lilist[i].onclick=function(){
			 dianjispan=this.innerHTML;
			// console.log(this.innerHTML);
			$(".jobviewdiv").empty();
			$.post(
			"hostjobview.do",
			{"span":this.innerHTML},
				function (data) {
					var li="";
					for (var i = 0; i < data.length; i++) {
					li+='<li onclick="getvaule('+data[i].id+')">'+
							'<div>'+
								'<img src="'+data[i].gs_image+'" />'+
								'<span id="workspan">'+data[i].job+'</span>'+
								'<span id="adrspan">'+data[i].place+'</span>'+
								'<span class="shuxian">'+'|'+'</span>'+
								'<span id="timespan">'+data[i].time+'</span>'+
								'<span id="levelspan">'+data[i].level+'</span>'+
								'<span class="yuandian">'+'.'+'</span>'+
								'<span id="payspan">'+data[i].pay+'</span>'+
							'</div>'+
						'</li>';
						
						}
						$(".jobviewdiv").append(li);
				}
				
			);
		 }
	 }
}
// 搜索框传值URL
 $(document).ready(function(){
	 // 主页input
	 $('.canvainput span').click(function(){
		 var span=$('.canvainput input').val();
		 $('.canvainput input').val("");
		 window.location.href ="jobinfo.html?span="+span;
	 });
	 
	 // jobinfo页面的input input2
	 $('.input2 span').click(function(){
	 		 var span=$('.input2 input').val();
	 		 $('.input2 input').val("");
	 		 window.location.href ="jobinfo.html?span="+span;
	 });
	 //悬浮固定函数(被固定的div需设定z-index)
	 $.fn.smartFloat = function() {
	  var position = function(element) {
	   var top = element.position().top, pos = element.css("position");
	   $(window).scroll(function() {
	    var scrolls = $(this).scrollTop();
	    if (scrolls > top) {
	     if (window.XMLHttpRequest) {
	      element.css({
	       position: "fixed",
	       top: 0
	      }); 
	     } else {
	      element.css({
	       top: scrolls
	      }); 
	     }
	    }else {
	     element.css({
	      position: pos,
	      top: top
	     }); 
	    }
	   });
	  };
	  return $(this).each(function() {
	   position($(this));      
	  });
	 };
	 $("#selector").smartFloat();
});