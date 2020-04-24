// $(function(){
//
//     //goPage1(1,2);
//     var tempOption="";
//     for(var i=1;i<=totalPage1;i++)
//     {
//         tempOption+='<option value='+i+'>'+i+'</option>'
//     }
//     $("#jumpWhere1").html(tempOption);
// });


var pageSize1=0;//每页显示行数
var currentPage_1=1;//当前页全局变量，用于跳转时判断是否在相同页，在就不跳，否则跳转。
var totalPage1;//总页数
function goPage1(pno,psize){
    var itable = document.getElementById("forjlflag");
    var num = itable.rows.length;//表格所有行数(所有记录数)
    //console.log(num);
    pageSize1 = psize;//每页显示行数
    //总共分几页
    if(num/pageSize1 > parseInt(num/pageSize1)){
        totalPage1=parseInt(num/pageSize1)+1;
    }else{
        totalPage1=parseInt(num/pageSize1);
    }
    var currentPage = pno;//当前页数
    currentPage_1=currentPage;
    var startRow = (currentPage - 1) * pageSize1+1;
    var endRow = currentPage * pageSize1;
    endRow = (endRow > num)? num : endRow;
    //遍历显示数据实现分页
    /*for(var i=1;i<(num+1);i++){
        var irow = itable.rows[i-1];
        if(i>=startRow && i<=endRow){
            irow.style.display = "";
        }else{
            irow.style.display = "none";
        }
    }*/

    $("#forjlflag tr").hide();
    for(var i=startRow-1;i<endRow;i++)
    {
        $("#forjlflag tr").eq(i).show();
    }
     // var tempStr = "共"+num+"条记录 分"+totalPage1+"页 当前第"+currentPage+"页";
     //  document.getElementById("barcon").innerHTML = tempStr;

    if(currentPage>1){
        $("#firstPage1").on("click",function(){
            goPage1(1,psize);
        }).removeClass("ban");
        $("#prePage1").on("click",function(){
            goPage1(currentPage-1,psize);
        }).removeClass("ban");
    }else{
        $("#firstPage1").off("click").addClass("ban");
        $("#prePage1").off("click").addClass("ban");
    }

    if(currentPage<totalPage1){
        $("#nextPage1").on("click",function(){
            goPage1(currentPage+1,psize);
        }).removeClass("ban")
        $("#lastPage1").on("click",function(){
            goPage1(totalPage1,psize);
        }).removeClass("ban")
    }else{
        $("#nextPage1").off("click").addClass("ban");
        $("#lastPage1").off("click").addClass("ban");
    }

    $("#jumpWhere1").val(currentPage);
}


function jumpPage1()
{
    var num=parseInt($("#jumpWhere1").val());
    if(num!=currentPage_1)
    {
        goPage1(num,pageSize1);
    }
}
