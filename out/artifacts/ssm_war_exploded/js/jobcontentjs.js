//querystring()获取通过url传过来的参数id
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

function redxin(){
	// 当点击收藏先判断用户是否登录
	$.post(
		"showuserinfo.do",
		function(data) {
			//console.log("当前session里的对象："+data.toString());
			var obj=$("#aixin").attr("class");
			//console.log("这是爱心的状态class"+obj);
            var flag="";
			if(obj=="glyphicon glyphicon-heart aria-hidden='true'"){
				flag=0;
			}
            if(obj=="glyphicon glyphicon-heart-empty aria-hidden='true'"){
                flag=1;
            }
			//console.log(data);
			if (data == "") {
				alert("您当前未登录状态,请先登录!")
				document.getElementById("aixin").className="glyphicon glyphicon-heart-empty aria-hidden='true'"
			}else if(flag==1){
				//console.log("添加收藏为1："+flag);
				var id1=getQueryVariable("id");
				var info_id=id1+",";
				//console.log(info_id);
				document.getElementById("aixin").className="glyphicon glyphicon-heart aria-hidden='true'";
				$.post(
					"shoucang.do",
					{"info_id":info_id},
					function(data) {
						// alert("收藏成功！")
					}

				);
			}
			else {
                var info_id1=getQueryVariable("id");
                //console.log("这是flag："+flag);
                // 当网页被收藏的时候再次点击取消
                document.getElementById("aixin").className="glyphicon glyphicon-heart-empty aria-hidden='true'";
                $.post(
                    "hiddenaixin.do",
                    {"info_id":info_id1},
                    function (data) {
                        // alert("取消收藏成功")
                    }
                );

			}
		}
	);
}

//进入网页后一系列的操作
$(function () {
	$.post(
		"shownewuserinfo.do",
		function (data) {
			if (data == "") {
				
			} else {
				var jobcontent_id = getQueryVariable("id");
				// 页面刷新后显示简历按钮状态，该用户是都向本工作投入简历
				$.post(
					"findyhinthisjobcontent.do",
					{"info_id": jobcontent_id},
					function (data) {
						// console.log(data.toString());

						if (data == 0) {
							//按钮样式不变，弹出隐藏框
							$("#postjl").html("发送简历")
						} else {
							$("#postjl").css("background-color","#c2c2c2");
						}
					}
				);
			}
		});

	// 点击 发送简历按钮判断当前状态是否登录
	 $("#postjl").click(function () {
		 // $('#myModal').modal('show');
		 // $('#jltijiaots').modal('show');
		$.post(
			"shownewuserinfo.do",
			function (data) {
				if (data == "") {
					// alert("您当前未登录状态,请先登录!")
					$('#jltijiaots').modal('show');
				} else{
					// 查看当前用户的信息是否填写完整，否则不能投简历
					console.log("当前用户的邮箱地址:"+data.email);
					if(data.email==''||data.number==''){
						$("#grinfots").modal('show');
					}else{
					//获取当前页面的id和用户的id
					var jobcontent_id=getQueryVariable("id");
					//查询当前页面是否被用户投过简历
					$.post(
						"findyhinthisjobcontent.do",
						//传入当前页面的id和用户的id
						{"info_id":jobcontent_id},
						function (data) {
							if(data == 0){
								//按钮样式不变，弹出隐藏框
								$('#myModal').modal('show');
							}else{
								$("#postjl").css("background-color","#c2c2c2");
								// $('#jltijiaots').modal('show');
								//$("#postjl").html("简历待处理...")
							}
						}

					);
				}
				}
			});
	 });
		//未登录不进行查询
		$.post(
			"showuserinfo.do",
			function (data) {
				if (!(data == "")) {
					var info_id = getQueryVariable("id");
					$.post(
						"showshoucang.do",
						{"info_id": info_id},
						function (data) {
							if (data == 1) {
								//用js改变红心特效为空白
								//alert("此网页已经被收藏")
								document.getElementById("aixin").className = "glyphicon glyphicon-heart aria-hidden='true'"
							} else {
								//用js改变红心特效为红色
								//alert("此网页未被收藏")
								document.getElementById("aixin").className = "glyphicon glyphicon-heart-empty aria-hidden='true'"
							}
						});
				}
			});

//详细信息页面展示
	$(function () {
		var id = getQueryVariable("id");
		$.post(
			"showjobcontent.do",
			{"id": id},
			function (data) {
				$("#job").html(data.job);
				$("#pay").html(data.pay);
				$("#place").html(data.place);
				$("#time").html(data.time);
				$("#level").html(data.level);
				//console.log(data.gs_image);
				if (!(data.gs_image == null)) {
					$("#image").attr("src", data.gs_image);
				}
				$("#jobcontent2").html(data.jobcontent);
				$("#company2").html(data.company);

				//通过公司名字name去关联Gsyh表
				$.post(
					"jobcontentshowgsname.do",
					{"name": data.name},
					function (data) {
						$("#ordername").html(data.ordername);
					}
				);
			}
		);
	});
});

//上传简历部分
// function selectjl(obj) {
// 	// var a=obj.files[0].name;
// 	// var jllujing="jl/"+a;
// 	//console.log("将要上传的简历路径"+jllujing);
// 	var info_id=getQueryVariable("id");
// 	console.log("info_id+"+info_id);
// 	$.post(
// 		"uploadjl.do",
// 		 // {"info_id":info_id,"jl":jllujing},
// 		{"info_id":info_id},
// 		function (data) {
//
// 		}
// 	);
// }


$(function () {
	// 输入框搜索跳转
	$(".input3 div span button").click(function(){
		var span=$(".input3 div input").val();
		$(".input3 div input").val("");
		window.open("jobinfo.html?span="+span);
	});
});


