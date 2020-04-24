window.onload = function () {
    // 默认选择状态
    //document.getElementById("a1").click();
    // $("#a1").click(function(){
    document.getElementById("show2").style.display = "block";
    document.getElementById("show1").style.display = "none";
    document.getElementById("show3").style.display = "none";
    document.getElementById("show5").style.display = "none";
    document.getElementById("show4").style.display = "none";
    document.getElementById("a2").style.background = "#c80000";
    document.getElementById("a1").style.background = "#2e363f";
    document.getElementById("a3").style.background = "#2e363f";
    document.getElementById("a5").style.background = "#2e363f";
    document.getElementById("a4").style.background = "#2e363f";
    // });
    $("#a1").click(function () {
        document.getElementById("show1").style.display = "block";
        document.getElementById("show2").style.display = "none";
        document.getElementById("show3").style.display = "none";
        document.getElementById("show4").style.display = "none";
        document.getElementById("show5").style.display = "none";
        document.getElementById("a1").style.background = "#c80000";
        document.getElementById("a2").style.background = "#2e363f";
        document.getElementById("a3").style.background = "#2e363f";
        document.getElementById("a4").style.background = "#2e363f";
        document.getElementById("a5").style.background = "#2e363f";
    });
    $("#a2").click(function () {
        document.getElementById("show2").style.display = "block";
        document.getElementById("show1").style.display = "none";
        document.getElementById("show3").style.display = "none";
        document.getElementById("show4").style.display = "none";
        document.getElementById("show5").style.display = "none";
        document.getElementById("a2").style.background = "#c80000";
        document.getElementById("a1").style.background = "#2e363f";
        document.getElementById("a3").style.background = "#2e363f";
        document.getElementById("a4").style.background = "#2e363f";
        document.getElementById("a5").style.background = "#2e363f";
    });
    $("#a3").click(function () {
        document.getElementById("show3").style.display = "block";
        document.getElementById("show2").style.display = "none";
        document.getElementById("show1").style.display = "none";
        document.getElementById("show4").style.display = "none";
        document.getElementById("show5").style.display = "none";
        document.getElementById("a3").style.background = "#c80000";
        document.getElementById("a2").style.background = "#2e363f";
        document.getElementById("a1").style.background = "#2e363f";
        document.getElementById("a4").style.background = "#2e363f";
        document.getElementById("a5").style.background = "#2e363f";
    });
    $("#a4").click(function () {
        document.getElementById("show4").style.display = "block";
        document.getElementById("show2").style.display = "none";
        document.getElementById("show3").style.display = "none";
        document.getElementById("show1").style.display = "none";
        document.getElementById("show5").style.display = "none";
        document.getElementById("a4").style.background = "#c80000";
        document.getElementById("a2").style.background = "#2e363f";
        document.getElementById("a3").style.background = "#2e363f";
        document.getElementById("a1").style.background = "#2e363f";
        document.getElementById("a5").style.background = "#2e363f";
    });
    $("#a5").click(function () {
        document.getElementById("show5").style.display = "block";
        document.getElementById("show2").style.display = "none";
        document.getElementById("show3").style.display = "none";
        document.getElementById("show4").style.display = "none";
        document.getElementById("show1").style.display = "none";
        document.getElementById("a5").style.background = "#c80000";
        document.getElementById("a2").style.background = "#2e363f";
        document.getElementById("a3").style.background = "#2e363f";
        document.getElementById("a4").style.background = "#2e363f";
        document.getElementById("a1").style.background = "#2e363f";
    });
    $.post(
        "showgsinfo.do",
        function (data) {
            //alert("回调函数已经执行")
            $("#username").html(data.name);
            $("#gs_id").html(data.gs_id);
            // var a =$("input[name='sex']:checked").val();
            if (data.gs_image == null) {
				$("#show").attr('src', 'image/timg.jpg');
            } else {
                $("#show").attr('src', data.gs_image);
            }

            var ordername = document.getElementById("ordername");
            ordername.value = data.ordername;
            //alert(name.value);
            if (data.email == "") {

            } else {
                var email = document.getElementById("email");
                email.value = data.email;
            }

            if (data.number == "") {

            } else {
                var number = document.getElementById("number");
                number.value = data.number;
            }
        }
    );
};

//修改用户信息
$(document).ready(function () {
    $("#send").click(function () {
        var ordername = $("#ordername").val();
        var gs_id = $("#gs_id").html();
        var email = $("#email").val();
        var number = $("#number").val();
        var pwd = $("#pwd").val();
        // var gs_image=$("#show").attr("src");
        //alert(yh_id);
        $.post(
            "updategsyhinfo.do",
            {"ordername": ordername, "gs_id": gs_id, "email": email, "number": number, "pwd": pwd},
            function (data) {
                if (data == 1) {
                    alert("修改成功！")
                    // location.reload(true);
                    var gs_id = $("#gs_id").html();
                    $.post(
                        "shownewgsinfo.do",
                        {"gs_id": gs_id},
                        function (data) {
                            $("#ordername").html(data.ordername);
                            $("#gs_id").html(data.gs_id);
                            // var a =$("input[name='sex']:checked").val();
                            if (data.gs_image == "") {

                            } else {
                                $("#show").attr('src', data.gs_image);
                            }

                            var ordername = document.getElementById("ordername");
                            ordername.value = data.ordername;
                            //alert(name.value);
                            if (data.email == "") {

                            } else {
                                var email = document.getElementById("email");
                                email.value = data.email;
                            }

                            if (data.number == "") {

                            } else {
                                var number = document.getElementById("number");
                                number.value = data.number;
                            }
                        }
                    );

                } else {
                    alert("修改失败！")
                }
            }
        );
    });

    // 搜索公司发布的工作类型
    // 1.获取公司名称
    // 2.用公司名字去info表中查找工作
    $.post(
        "findgsjoblist.do",
        function (data) {
            if (data == null) {
                alert("当前未发布任何招聘信息！");
            } else {
                //console.log("前台打印收到的数组："+data[0].job);
                var li = "";
                for (var i = 0; i < data.length; i++) {
                    //console.log(data.length+data[i].job);
                    li += '<li>' +
                        '<a href="#infoview" aria-controls="home" role="tab" data-toggle="tab">' +
                        data[i].job + '</a>' + '</li>';
                }
                $('#forjoblist').append(li);
                var li = document.getElementById("forjoblist").getElementsByTagName("a");
                var liarr = $("#forjoblist li").length;
                //console.log("数组的长度：" + liarr);
                for (var i = 0; i < liarr; i++) {
                    li[i].onclick = function () {
                        document.getElementById("infoview").innerHTML = "";
                        // 获取当前点击的li标签内容
                        //console.log("这是当前点击的li:" + this.innerHTML);
                        $.post(
                            "showjl.do",
                            {"info_job": this.innerHTML},
                            function (data) {
                                var li = "";
                                //console.log("对象数组的长度：" + data.length);
                                for (var i = 0; i < data.length; i++) {
									if(data[i].yh_image==null){
										data[i].yh_image='image/timg.jpg';
									}
									//console.log("这是用户头像路径:"+data[i].yh_image)
                                    li += '<li id="forjl" class="forjl">' + '<div id="ygjl">' +
                                        '<img src="' + data[i].yh_image + '"/>' +
                                        '<h4 style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' +
                                        data[i].name + '</h4>' +
                                        '<h5>' + '<span class="glyphicon glyphicon-phone-alt" aria-hidden="true">' + '</span>' +
                                        data[i].number + '</h5>' +
                                        '<button class="btn btn-info" id="seejl" onclick="getjllujing(' + data[i].id + ')">' + '查看简历' + '</button>' +
                                        '<button class="btn btn-success yes" onclick="over(' + data[i].id + ')">' + '<span class="glyphicon glyphicon-ok glyphicon" aria-hidden="true">' + '</span>' + '</button>' +
                                        '<button class="btn btn-danger no" onclick="pass(' + data[i].id + ')">' + '<span class="glyphicon glyphicon-remove" aria-hidden="true">' + '</span>' + '</button>' +
                                        '</div>' + '</li>';
                                }
                                $('#infoview').append(li);
                                goPage(1, 12);
                                var tempOption = "";
                                for (var i = 1; i <= totalPage; i++) {
                                    tempOption += '<option value=' + i + '>' + i + '</option>'
                                }
                                $("#jumpWhere").html(tempOption);
                            }
                        );
                    }
                }
				
            }
        }
    );

});


// 点击按钮下载对应的简历文件
function getjllujing(id) {
    $("#forjoblist li").each(function () {
        //找到带有active的li
        if ($(this).hasClass("active")) {
            //得到该元素下span的值
            // console.log($(this).children("a").text());
			// 改变简历状态为已查看
			$.post(
			    "getjllujing.do",
			    {"ptyh_id": id, "info_job": $(this).children("a").text()},
				function (data) {
					$.post(
					"alredyseejl.do",
					{"jl":data.jl},
					function (data){
						alert("已查看");
					});
				});
			
            $.post(
                "getjllujing.do",
                {"ptyh_id": id, "info_job": $(this).children("a").text()},
                function (data) {
                    // console.log("终于获取到简历路径了耶：" + data.jl);
                    window.location.href = "http://localhost:8080/ssm_war_exploded/" + data.jl;
                }
            );
        }
    });
}

//上传公司头像

 function selectimg(obj) {
//     //console.log("image/"+obj.files[0].name);//这里可以获取上传文件的name
//     //获取最终上传文件路径
//
//     var a = obj.files[0].name;
//     var imglujing = "image/" + a;
//     //console.log(imglujing+"123");
    var newsrc = getObjectURL(obj.files[0]);

    document.getElementById("show").src = newsrc;
//     console.log("图片的路径："+imglujing)
//     var gs_id = $("#gs_id").html();
//     $.post(
//         "changsimage.do",
//         {"gs_image": imglujing, "gs_id": gs_id},
//         function (data) {
//             alert(data)
//
//         }
//     );
   }

function getObjectURL(file) {
    var url = null;
    // 下面函数执行的效果是一样的，只是需要针对不同的浏览器执行不同的 js 函数而已
    if (window.createObjectURL != undefined) { // basic
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}

// 条件选择
function adr1() {
    var address = document.getElementById("ress").getElementsByTagName("a");
    var menu = document.getElementById("address");
    for (i = 0; i < address.length; i++) {
        address[i].onclick = function () {
            menu.innerHTML = this.innerHTML;
        }
    }
}

function pay1() {
    var want = document.getElementById("want").getElementsByTagName("a");
    var paywant = document.getElementById("paywant");
    for (i = 0; i < want.length; i++) {
        want[i].onclick = function () {
			
            paywant.innerHTML = this.innerHTML;
        }
    }
}

function work1() {
    var time = document.getElementById("time").getElementsByTagName("a");
    var worktime = document.getElementById("worktime");
    for (i = 0; i < time.length; i++) {
        time[i].onclick = function () {
            worktime.innerHTML = this.innerHTML;
        }
    }
}

function stu1() {
    var level = document.getElementById("level").getElementsByTagName("a");
    var studylevel = document.getElementById("studylevel");
    for (i = 0; i < level.length; i++) {
        level[i].onclick = function () {
            studylevel.innerHTML = this.innerHTML;
        }
    }
}

function adr() {
    var address = document.getElementById("ress1").getElementsByTagName("a");
    var menu = document.getElementById("address1");
    for (i = 0; i < address.length; i++) {
        address[i].onclick = function () {
            menu.innerHTML = this.innerHTML;
        }
    }
}

function pay() {
    var want = document.getElementById("want1").getElementsByTagName("a");
    var paywant = document.getElementById("paywant1");
    for (i = 0; i < want.length; i++) {
        want[i].onclick = function () {
            paywant.innerHTML = this.innerHTML;
        }
    }
}

function work() {
    var time = document.getElementById("time1").getElementsByTagName("a");
    var worktime = document.getElementById("worktime1");
    for (i = 0; i < time.length; i++) {
        time[i].onclick = function () {
            worktime.innerHTML = this.innerHTML;
        }
    }
}

function stu() {
    var level = document.getElementById("level1").getElementsByTagName("a");
    var studylevel = document.getElementById("studylevel1");
    for (i = 0; i < level.length; i++) {
        level[i].onclick = function () {
            studylevel.innerHTML = this.innerHTML;
        }
    }
}

//将编辑好的信息发送到数据库中
function postinfo() {
    var menu = document.getElementById("address").innerHTML;
    var paywant = document.getElementById("paywant").innerHTML;
    var worktime = document.getElementById("worktime").innerHTML;
    var studylevel = document.getElementById("studylevel").innerHTML;
    var job1 = document.getElementById("job1").value;
	var span1 = document.getElementById("span1").value;
	var span2 = document.getElementById("span2").value;
	var span3 = document.getElementById("span3").value;
	var span4 = document.getElementById("span4").value;
    var jobcontent1 = document.getElementById("jobcontent1").value;
    var company1 = document.getElementById("company1").value;
    if(job1==''||span1==''||span2==''||span3==''||span4==''||jobcontent1==''||company1==''){
        $("#postmessage").modal('show');
    }else{
        $("#successpost").modal('show');
    $.post(
        "postinfo.do",
        {
            "place": menu,
            "pay": paywant,
            "job": job1,
			"span1":span1,
			"span2":span2,
			"span3":span3,
			"span4":span4,
            "time": worktime,
            "level": studylevel,
            "jobcontent": jobcontent1,
            "company": company1
        },
        function (data) {
            if (data == "1") {
                $("#address").html("选择地区");
                $("#paywant").html("薪资要求");
                $("#worktime").html("工作经验");
                $("#studylevel").html("学历要求");
                $("#job1").val("");
				$("#span1").val("");
                $("#span2").val("");
                $("#span3").val("");
                $("#span4").val("");
                $("#jobcontent1").val("");
                $("#company1").val("");
            } else {
                alert("招聘信息发布失败！")
            }

        }
    )
    }
}

// 关于公司发布的简历查看
// 激活简历查看（show3）里面的内容
$('#myTabs a').click(function (e) {
    e.preventDefault()
    $(this).tab('show')
});

// $(document).ready(function(){
// 	// 搜索公司发布的工作类型
// 	// 1.获取公司名称
// 	// 2.用公司名字去info表中查找工作
// 			$.post(
// 				"findgsjoblist.do",
// 				function (data) {
// 					if(data==null){
// 						alert("当前未发布任何招聘信息！");
// 					}else {
// 						console.log("前台打印收到的数组："+data);
// 						var li="";
// 						for (var i = 0; i < data.length; i++) {
// 							li +='<li role="presentation">'+
// 								'<a href="#home" aria-controls="home" role="tab" data-toggle="tab">'+
// 								+data[i].job+'</a>'+'</li>';
// 						}
// 						$('#forjoblist').append(li);
// 					}
// 				}
// 			);
// });

$(document).ready(function(){
  $('[data-toggle="popover"]').popover();
  // 退出账号
  $(".navtop a").click(function(){
	  $.post(
	  "sessionclear.do",
	  function (data){
		window.location.href ="login.html";  
	  }
	  );  
  });
  // $(document).on("click",".no",function(){
  // 	$(this).parent().attr("style","background-color:#d9534f;transition-duration: 0.5s;");
  // });
  });
  
//对简历模块进行操作
// 简历名称的唯一性
// 1.删除简历
// 删除当前简历

function pass(id){
    $(document).on("click",".no",function() {
        $(this).parent().attr("style", "background-color:#d9534f;transition-duration: 0.5s;");
    });
        $("#forjoblist li").each(function () {
        //找到带有active的li
        if ($(this).hasClass("active")) {
            //得到该元素下span的值
           // console.log($(this).children("a").text());
            $.post(
                "getjllujing.do",
                {"ptyh_id": id, "info_job": $(this).children("a").text()},
                function (data) {
                   //console.log("终于获取到简历路径了耶：" + data.jl);
                    $.post(
                        "pass.do",
                        {"jl": data.jl},
                        function (data) {
                            alert("未通过！");
                        });
                }
            );
        }
    });
}

// 简历通过
function over(id){
    $(document).on("click",".yes",function() {
        $(this).parent().attr("style", "background-color:#5bb55b;transition-duration: 0.5s;");
    });
        $("#forjoblist li").each(function () {
	    //找到带有active的li
	    if ($(this).hasClass("active")) {
	        //得到该元素下span的值
	       // console.log($(this).children("a").text());
	        $.post(
	            "getjllujing.do",
	            {"ptyh_id": id, "info_job": $(this).children("a").text()},
	            function (data) {
                   // console.log("终于获取到简历路径了耶：" + data.jl);
                    $.post(
                        "over.do",
                        {"jl": data.jl},
                        function (data) {
                            alert("通过！");
                        });
                }
	        );
	    }
	});
}
 // show4
 $(document).ready(function(){
	 $(document).on("click",".joblist ul li",function(){
		 $(this).siblings().attr("style","");
		 $(this).attr("style","color:#3a877e;font-weight: 900;	border-bottom: 3px solid #5dd5c8;");
	 });
	 $('.joblist ul').html("");
	 //工作列表
	 $.post(
	     "findzpjoblist.do",
	     function (data) {
	         if (data == null) {
	             alert("不存在这种情况吧！");
	         } else {
	            // console.log("数组的长度:"+data.length);
	             var li = "";
	             for (var i = 0; i < data.length; i++) {
	                 //console.log(data.length+data[i].job);
	                 li+='<li>'+data[i].info_job+'</li>';
	             }
                 $('.joblist ul').append(li);
                 // 获取当前点击的li的值
                 var li =$(".joblist ul li");
                 var liarr = $(".joblist ul li").length;
                 //console.log(liarr);
                 for (var i = 0; i < liarr; i++) {
                     li[i].onclick = function () {
                         // 获取当前点击的li标签内容
                         //console.log("这是当前点击的li:" + this.innerHTML);
                         $.post(
                             "findzptgyh.do",
                             {"info_job":this.innerHTML},
                             function (data) {
                                  var tr="";
                                  $("#forjlflag").html("");
                                  for(var i=0;i<data.length;i++){
                                      tr='<tr>'+
                                      '<td>'+data[i].name+'</td>'+
                                      '<td>'+data[i].number+'</td>'+
                                      '<td>'+data[i].email+'</td>'+
                                      '<td>'+
                                      '<button type="button" class="btn btn-primary btn-xs" onclick="handler(' + data[i].id + ')">'+'移除'+'</button>'+
                                      '</td>'+
                                      '</tr>';
                                      $("#forjlflag").append(tr);
                                  }
                                  goPage1(1, 10);
                                  var tempOption = "";
                                  for (var i = 1; i <= totalPage1; i++) {
                                      tempOption += '<option value=' + i + '>' + i + '</option>'
                                  }
                                  $("#jumpWhere1").html(tempOption);
                             }
                         );
                 
                     }
                 }
			}
		}
	);
});

// 移除简历通过人员
function handler(id){
	$(".joblist ul li").each(function () {
	//找到带有active的li
if ($(this).css("font-weight")=="900") {
	    //得到该元素下span的值
	    //console.log($(this).text());
		$.post(
		"handler.do",
		{"info_job":$(this).text(),"ptyh_id":id},
		function (data){
			alert("移除成功!");
			$.post(
			"del.do",
			function (data){
			var tr="";
			$("#forjlflag").html("");
			for(var i=0;i<data.length;i++){
			    tr='<tr>'+
			    '<td>'+data[i].name+'</td>'+
			    '<td>'+data[i].number+'</td>'+
			    '<td>'+data[i].email+'</td>'+
			    '<td>'+
			    '<button type="button" class="btn btn-primary btn-xs" onclick="handler(' + data[i].id + ')">'+'移除'+'</button>'+
			    '</td>'+
			    '</tr>';
			    $("#forjlflag").append(tr);
			}
			goPage1(1, 10);
			var tempOption = "";
			for (var i = 1; i <= totalPage1; i++) {
			    tempOption += '<option value=' + i + '>' + i + '</option>'
			}
			$("#jumpWhere1").html(tempOption);	
			}
			);
		}
		);
	};
	});
}

// show5
 $(document).ready(function(){
	 $("#a5").click(function () {
		 $.post(
		 "show5.do",
		 function (data){
			 $("#fortr").html("");
			 // console.log(data);
			 var tr='';
			for(var i=0;i<data.length;i++){
				 // console.log(data[i].place);
			tr='<tr>'+
			'<td>'+i+'</td>'+
			'<td>'+data[i].place+'</td>'+
			'<td>'+data[i].pay+'</td>'+
			'<td>'+data[i].job+'</td>'+
			'<td>'+data[i].time+'</td>'+
			'<td>'+data[i].level+'</td>'+
			'<td>'+data[i].rs+'</td>'+
			'<td>'+
			    '<button type="button" class="btn btn-primary btn-xs" onclick="getinfoid('+data[i].id+')">'+'查看'+'</button>'+
				'<button type="button" class="btn btn-warning btn-xs" onclick="updateinfo('+data[i].id+')">'+'编辑'+'</button>'+
				'<button type="button" class="btn btn-primary btn-xs  btn-danger" onclick="delinfoid('+data[i].id+')">'+'结束招聘'+'</button>'+
			'</td>'+
			'</tr>';
			$("#fortr").append(tr);
		 }
		 }
		 );
	 });
});	 

//查看详情
function getinfoid(id){
	window.open("jobcontent.html?id="+id);
}

//删除招聘信息
function delinfoid(id){
	$.post(
	"delinfoid.do",
	{"id":id},
	function (data){
		alert("删除成功!");
	});
} 
//编辑弹窗
function updateinfo(id){
	$('#myModal').modal('show');
	ID=id;
	//$('.modal-body').html("当前点击的工作的id"+id);
	// 将原本信息展示出来
	$.post(
	"showoldinfo.do",
	{"id":id},
	function (data){
		$('#address1').html(data.place);
		$('#paywant1').html(data.pay);
		$('#worktime1').html(data.time);
		$('#studylevel1').html(data.level);
		$("#job2").val(data.job);
		$("#spana").val(data.span1);
		$("#spanb").val(data.span2);
		$("#spanc").val(data.span3);
		$("#spand").val(data.span4);
		$("#jobcontent2").val(data.jobcontent);
		$("#company2").val(data.company);
	}
	);
}
//全局变量info  id
var ID=null;
function postinfo1(){
	// console.log("全局变量ID:"+ID)
	var menu = document.getElementById("address1").innerHTML;
	var paywant = document.getElementById("paywant1").innerHTML;
	var worktime = document.getElementById("worktime1").innerHTML;
	var studylevel = document.getElementById("studylevel1").innerHTML;
	var job1 = document.getElementById("job2").value;
	var span1 = document.getElementById("spana").value;
	var span2 = document.getElementById("spanb").value;
	var span3 = document.getElementById("spanc").value;
	var span4 = document.getElementById("spand").value;
	var jobcontent1 = document.getElementById("jobcontent2").value;
	var company1 = document.getElementById("company2").value;
    if(job1==''||span1==''||span2==''||span3==''||span4==''||jobcontent1==''||company1==''){
        $("#postmessage").modal('show');
    }else{
	$.post(
	"updatenewinfo.do",
	{"id":ID,
	"place": menu,
	"pay": paywant,
	"job": job1,
	"span1":span1,
	"span2":span2,
	"span3":span3,
	"span4":span4,
	"time": worktime,
	"level": studylevel,
	"jobcontent": jobcontent1,
	"company": company1},
	function (data){
		$('#myModal').modal('hide');
		$('#success').modal('show');
	}
	);}
}
