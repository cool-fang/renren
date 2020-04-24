window.onload=function () {
	// 加载页面默认选择样式
		// 默认选择状态
		//document.getElementById("a1").click();
		//$("#a1").click(function(){
			document.getElementById("show1").style.display="block";
			document.getElementById("show2").style.display="none";
			document.getElementById("show3").style.display="none";
			document.getElementById("a1").style.background="#c80000";
			document.getElementById("a2").style.background="#2e363f";
			document.getElementById("a3").style.background="#2e363f";
		// });
		$("#a1").click(function(){
		    document.getElementById("show1").style.display="block";
			document.getElementById("show2").style.display="none";
			document.getElementById("show3").style.display="none";
			document.getElementById("a1").style.background="#c80000";
			document.getElementById("a2").style.background="#2e363f";
			document.getElementById("a3").style.background="#2e363f";
		});
		$("#a2").click(function(){
			document.getElementById("show2").style.display="block";
			document.getElementById("show1").style.display="none";
			document.getElementById("show3").style.display="none";
			document.getElementById("a2").style.background="#c80000";
			document.getElementById("a1").style.background="#2e363f";
			document.getElementById("a3").style.background="#2e363f";
		});
		$("#a3").click(function(){
			document.getElementById("show3").style.display="block";
			document.getElementById("show2").style.display="none";
			document.getElementById("show1").style.display="none";
			document.getElementById("a3").style.background="#c80000";
			document.getElementById("a2").style.background="#2e363f";
			document.getElementById("a1").style.background="#2e363f";
		});
	// 展示用户信息
    $.post(
        "showuserinfo.do",
        function(data) {
            $("#username").html(data.name);
            $("#yh_id").html(data.yh_id);
			// var a =$("input[name='sex']:checked").val();
            var a=data.sex;
            //alert("session返回过来的性别"+a);
            if(!(a=="")){

                if(a=='1'){

                    $("input:radio[name=sex][value='1']").attr("checked",true);
                }else{

                    $("input:radio[name=sex][value='2']").attr("checked",true);
                }
            }

            var name=document.getElementById("name");
            name.value=data.name;
            //alert(name.value);
            if(data.yh_image==null){
				$("#show").attr('src', 'image/timg.jpg');
            }else{
                $("#show").attr('src', data.yh_image);
            }
			console.log("这是用户的邮箱地址:"+data.email);
            if(data.email==""){
                document.getElementById("email").placeholder="你还未填写邮箱，请在此输入！";
            }else{
                var email=document.getElementById("email");
                email.value=data.email;
            }

            if(data.number==""){
                document.getElementById("number").placeholder="你还未填写联系方式，请在此输入！";
            }else{
                var number=document.getElementById("number");
                number.value=data.number;
            }
        }
    );
    // 点击菜单栏展示收藏
    $('#a2').click(function () {
        shoucang();
    });
};


function shoucang(){
// 展示用户收藏
// 1.得到用户收藏的信息的id
$.post(
    "shownewuserinfo.do",
    function (data) {
        if(data.shoucang==""){
            //用户没有收藏
            $('#noshoucang').show();
        }else{
            $('#noshoucang').hide();
            var shoucangarr=data.shoucang;
            var arrlist = shoucangarr.substr(0,shoucangarr.length-1);
            var arr = arrlist.split(",");
            $('#fortr').html("");
            for (var i=0;i<arr.length;i++) {
                //将数组中id去info表中查询用户收藏的数据返回info对象
                $.post(
                    "showyhaixin.do",
                    {"id":arr[i]},
                    function (data) {
                        console.log("我是第"+i+"次循环的数据："+data.job+data.name+data.place+data.pay);
                        var tr=
                            '<tr>'+'<td>'+data.job+'</td>'+
                            '<td>'+data.name+'</td>'+
                            '<td>'+data.place+'</td>'+
                            '<td>'+data.pay+'</td>'+
                            '<td>'+'<button type="button" class="btn btn-primary btn-xs" onclick="getvaule1('+data.id+')">'+'查看详情'+'</button>'+
                            '<button type="button" class="btn btn-danger btn-xs" onclick="getvaule2('+data.id+')">'+'取消收藏'+'</button>'+
                            '</td>'+'</tr>';
                        $('#fortr').append(tr);
                        //alert("成功查询到数据")
                        goPage(1,6);
                        //获取跳转当前页
                        var tempOption="";
                        for(var i=1;i<=totalPage;i++)
                        {
                            tempOption+='<option value='+i+'>'+i+'</option>'
                        }
                        $("#jumpWhere").html(tempOption);
                    }
                );
            }
        }
    }
);
}

// 用户收藏界面点击查看当前详情跳转详情jobcontent页面
function getvaule1(id){
    //console.log(id);
    window.location.href="jobcontent.html?id="+id;
}
// 用户收藏界面点击取消收藏
function getvaule2(id){
    $.post(
        "hiddenaixin.do",
        {"info_id":id},
        function (data) {
            shoucang();
//更新数据库内容便重新赋值session
            $.post(
              "shownewuserinfo.do",
               function (data) {
                    //alert("取消收藏成功！");
               }
            );

        }
    );
}


//修改用户信息
$(document).ready(function(){
	$("#send").click(function(){
		var name=$("#name").val();
        var yh_id=$("#yh_id").html();
		var email=$("#email").val();
		var number=$("#number").val();
        var sex =$("input[name='sex']:checked").val();
        var pwd=$("#pwd").val();
		//alert(yh_id);
		$.post(
		"updateptyhinfo.do",
		{"name":name,"yh_id":yh_id,"email":email,"number":number,"sex":sex,"pwd":pwd},
            function (data) {
                if(data==1){
                    alert("修改成功！")
                    // location.reload(true);
                    var yh_id=$("#yh_id").html();
                    $.post(
                        "shownewuserinfo.do",
                       // {"yh_id":yh_id},
                        function(data) {
                            $("#username").html(data.name);
                            $("#yh_id").html(data.yh_id);
                            // var a =$("input[name='sex']:checked").val();
                            var a=data.sex;
                            //alert("数据库返回过来的性别"+a);
                            if(!(a=="")){

                                if(a=='1'){

                                    $("input:radio[name=sex][value='1']").attr("checked",true);
                                }else{

                                    $("input:radio[name=sex][value='2']").attr("checked",true);
                                }
                            }

                            var name=document.getElementById("name");
                            name.value=data.name;
                            //alert(name.value);
                            if(data.yh_image==""){
                                //不错任何改变
                            }else{
                                $("#show").attr('src', data.yh_image);
                            }
							// console.log("用户的邮箱地址是:"+data.email);
                            if(data.email==null){
                                document.getElementById("email").placeholder="你还未填写邮箱，请在此输入！";
                            }else{
                                var email=document.getElementById("email");
                                email.value=data.email;
                            }

                            if(data.number==""){
                                document.getElementById("number").placeholder="你还未填写联系方式，请在此输入！";
                            }else{
                                var number=document.getElementById("number");
                                number.value=data.number;
                            }
                        }
                    );

                }else{
                    alert("修改失败！")
                }
            }
		);
	});


});

//页面加载后给上传头像的按钮添加样式
$(document).ready(function(){
    $.post(
        "showuserinfo.do",
        function (data) {
            //console.log(data.yh_id);
            //得到data.yh_id
            $.post(
                "showyhimageisnotupload.do",
                {"yh_id":data.yh_id},
                function (data) {
                    if(data==0){
                        //啥也不改变
                    }else{
                        $("#postyhimage").html("替换头像");
                    }
                }
            );
        }
    );
	
	// 加载投简记录
	$("#a3").click(function (){
		deltj();
	});
});

function deltj(){
	$('#forjlflag').html("");
	// 页面加载后显示用户投简情况（show3）页面
	// 1.先通过session获取用户的id
	$.post(
	    "showuserinfo.do",
	    function (data) {
	   // 2.获取jobjl表中的数据
	        $.post(
	            "showjlflag.do",
	            {"ptyh_id":data.id},
	            function (data) {
	                if(data=='') {
						$('#nojianli').show();
	                    // alert("当前没有投简");
	                }else {
						$('#nojianli').hide();
	                    var tr="";
	                    for (var i = 0; i < data.length; i++) {
	                        tr = '<tr>'+'<td>'+i+'</td>'+
								'<td>'+data[i].info_job+'</td>'+
	                            '<td>'+data[i].info_name+'</td>'+
	                            '<td>'+data[i].jlflag+'</td>'+
	                            '<td>'+'<button type="button" class="btn btn-primary btn-xs" onclick="getvaule1('+data[i].info_id+')">'+'详情'+'</button>'+
								'<button type="button" class="btn btn-warning btn-xs" onclick="yhthrow('+data[i].id+')">'+'删除记录'+'</button>'+
	                            '</td>'+'</tr>';
	                        $('#forjlflag').append(tr);
	                    }
	                    goPage1(1,6);
	                    //获取跳转当前页
	                    var tempOption1="";
	                    for(var i=1;i<=totalPage1;i++)
	                    {
	                        tempOption1+='<option value='+i+'>'+i+'</option>'
	                    }
	                    $("#jumpWhere1").html(tempOption1);
	                }
	            }
	        );
	    });
}

// 删除记录
function yhthrow(id){
	console.log("这是jobjl的id:"+id);
	$.post(
	"yhthrow.do",
	{"id":id},
	function (data){
		 deltj();
	}
	);
	
}

//用户头像---------
// 1.获取文件路径
function selectjl(obj){
//     //console.log("image/"+obj.files[0].name);//这里可以获取上传文件的name
//     //获取最终上传文件路径
//     //console.log("将要上传的简历路径"+jllujing);
	var newsrc=getObjectURL(obj.files[0]);
	document.getElementById("show").src=newsrc;
}
function getObjectURL(file) {
	        var url = null ;
	        // 下面函数执行的效果是一样的，只是需要针对不同的浏览器执行不同的 js 函数而已
	        if (window.createObjectURL!=undefined) { // basic
	            url = window.createObjectURL(file) ;
	        } else if (window.URL!=undefined) { // mozilla(firefox)
	            url = window.URL.createObjectURL(file) ;
	        } else if (window.webkitURL!=undefined) { // webkit or chrome
	            url = window.webkitURL.createObjectURL(file) ;
	        }
	        return url ;
}
// $(document).ready(function() {
//     $("#postjl").click(function () {
//         alert("准别执行ajax");
//         $.post(
//             "upload.do",
//             function (data) {
//                 alert("回调函数已经加载")
//
//             }
//         );
//     });
// });
$(function () {
  $('[data-toggle="popover"]').popover();
  // 退出账号
  $(".navtop a").click(function(){
	  $.post(
	  "sessionclear.do",
	  function (data){
	      console.log(data);
		window.location.href ="index.html";  
	  }
	  );  
  });
});

