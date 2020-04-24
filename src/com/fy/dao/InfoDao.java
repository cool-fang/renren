package com.fy.dao;

import com.fy.entity.*;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface InfoDao {

    //通过条件去数据库查询并返回到前台页面
    List infoview(Infospan infospan);

    //将待要发布的信息存入数据库
    void postinfo( Info info);

    //修改info表中的头像（防止公司发布信息后不停的修改头像）
    void updateoldimage(Gsyh gsyh);

    //显示jobcontent招聘信息详情页面
    Info showjobcontent(int id);

    //将数组中id去info表中查询用户收藏的数据返回info对象
    Info showyhaixin(int id);

    //查询当前页面是否被用户投过简历
    Jobjl findyhinthisjobcontent(@Param("ptyh_id") int ptyh_id,@Param("info_id") int info_id);

    //    上传简历路径
    void uploadjl(Jobjl jobjl);

    //根据id返回info对象
    Info returninfo(int info_id);

    //    查询公司发布的工作类型
    List findgsjoblist(String name);

    //    操作用户简历
    List showjobjl(Jobjl jobjl);

    //    通过jobjl对象获取ptyh对象集合
    Ptyh showjl(Jobjl jobjl);

    //get用户对应的简历
    Jobjl getjllujing(Jobjl jobjl);

//    热推职位
    List hostjobview(String span);

    //    修改当前简历信息为未通过状态
    void pass(String jl);

    //简历通过
    void over(String jl);

    //    简历已查看
    void alredyseejl(String jl);

    //    移除通过人员
    void handler(Jobjl jobjl);

//    show5
    List returninfolist(String name);

//    show5
    Integer infototgrs(Info info);

    //删除招聘信息
    void delinfoid(int id);

    //编辑招聘信息
    Info showoldinfo(int id);

    //将修改的信息更新数据库
    void updatenewinfo(Info info);
}
