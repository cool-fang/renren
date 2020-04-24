package com.fy.controller;

import com.fy.entity.*;
import com.fy.service.InfoService;
import com.fy.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@Controller
public class InfoController {
    @Autowired
    InfoService infoService;
    @Autowired
    UserService userService;


    @ResponseBody
    @RequestMapping(value = "infoview")
    public List infoview(Infospan Infospan) {

        //System.out.println(Infospan.toString());

        //System.out.println(info.getPlace());
        //System.out.println(infoService.infoview(info).toString());
        //System.out.println("返回值"+infoService.infoview(info));
        if (infoService.infoview(Infospan) == null) {
            return null;
        } else {
           // System.out.println("jobinfo对象集合"+infoService.infoview(Infospan));
            return infoService.infoview(Infospan);

        }
    }

    //    主招聘信息页面发布
    @ResponseBody
    @RequestMapping(value = "postinfo")
    public int postinfo(HttpSession session, Info info) {

        String gs_image = userService.shownewgsinfo((Gsyh) session.getAttribute("gsyh")).getGs_image();
        //       System.out.println("这是session保存的数据："+userService.shownewgsinfo((Gsyh) session.getAttribute("gsyh")).toString());
        if (gs_image == null) {
            gs_image = "image/timg.jpg";
            info.setGs_image(gs_image);
        } else {
            info.setGs_image(gs_image);
            //修改info表中的头像（防止公司发布信息后不停的修改头像）
//            infoService.updateoldimage(info);
        }
        if(info.getPlace().equals("选择地区")){
            info.setPlace("不限地区");
        }
        if(info.getPay().equals("薪资要求")){
            info.setPay("不限薪资");
        }
        if(info.getTime().equals("工作经验")){
            info.setTime("不限经验");
        }
        if(info.getLevel().equals("学历要求")){
            info.setLevel("不限学历");
        }
        String name = userService.shownewgsinfo((Gsyh) session.getAttribute("gsyh")).getName();
        info.setName(name);
        //System.out.println("这是将要存到数据库中的info对象的值"+info.toString());
        infoService.postinfo(info);
        return 1;
    }

    //显示jobcontent招聘信息详情页面
    @ResponseBody
    @RequestMapping(value = "showjobcontent")
    public Info showjobcontent(Info info) {
        //System.out.println(infoService.showjobcontent(info.getId()));
        return infoService.showjobcontent(info.getId());
    }

    //将数组中id去info表中查询用户收藏的数据返回info对象
    @ResponseBody
    @RequestMapping(value = "showyhaixin")
    public Info showyhaixin(int id) {
        //System.out.println("这是遍历的id:"+id);
        //System.out.println("这是遍历返回对象info:"+infoService.showyhaixin(id));
        return infoService.showyhaixin(id);
    }

    //查询当前页面是否被用户投过简历
    @ResponseBody
    @RequestMapping(value = "findyhinthisjobcontent")
    public int findyhinthisjobcontent(HttpSession session, int info_id) throws Exception {
            Ptyh ptyh = (Ptyh) session.getAttribute("ptyh");
            int ptyh_id = ptyh.getId();
            //变换用户id的格式存入数据库
            //System.out.println("这是info中的id添加到数据库中的id:"+info_id+"和当前操作用户id:"+yh_id);
            Jobjl jobjl = infoService.findyhinthisjobcontent(ptyh_id, info_id);
            if (!(jobjl == null)) {
                return 1;
            } else {
                return 0;
            }
    }

    //    上传简历路径
//    @ResponseBody
//    @RequestMapping(value = "uploadjl")
//    public int uploadjl(HttpSession session, int info_id) throws Exception {
//        Ptyh ptyh = (Ptyh) session.getAttribute("ptyh");
//        Info info = infoService.returninfo(info_id);
//        Jobjl jobjl = new Jobjl();
//        jobjl.setInfo_name(info.getName());
//        jobjl.setInfo_id(info_id);
//        jobjl.setInfo_job(info.getJob());
//        jobjl.setPtyh_id(ptyh.getId());
//        jobjl.setJl(ptyh.getYh_jl());
//        System.out.println("这是从session取出来的简历的路径:"+ptyh.getYh_jl());
//        jobjl.setJlflag("待处理");
//        System.out.println(jobjl.toString());
//        infoService.uploadjl(jobjl);
//        return 1;
//    }

    //    查询公司发布的工作类型
    @ResponseBody
    @RequestMapping(value = "findgsjoblist")
    public List findgsjoblist(HttpSession session) throws Exception {
        Gsyh gsyh = (Gsyh) session.getAttribute("gsyh");
        String name = gsyh.getName();
        List infoarr = infoService.findgsjoblist(name);
        if (infoarr == null) {
            return null;
        } else {
            // System.out.println("info对象的集合："+infoarr);
            return infoarr;
        }
    }

    //    操作用户简历
    @ResponseBody
    @RequestMapping(value = "showjl")
    //返回ptyh对象数组
    public List showjl(HttpSession session, String info_job) throws Exception {
//        System.out.println("前台传入的：" + info_job);
        Gsyh gsyh = (Gsyh) session.getAttribute("gsyh");
        Jobjl jobjl = new Jobjl();
        jobjl.setInfo_job(info_job);
        jobjl.setInfo_name(gsyh.getName());
//        System.out.println(jobjl.toString());
//        返回jobjl对象数组
        ArrayList jobjlarr = new ArrayList();
        ArrayList ptyharr = new ArrayList();
        jobjlarr = (ArrayList) infoService.showjobjl(jobjl);
        if (jobjlarr == null) {
//            当前没有人投简
            return null;
        } else {
//            System.out.println("获取的jobjl对象数组的长度：" + jobjlarr.size());
//            HashSet ptyharr = null;
            for (int i = 0; i < jobjlarr.size(); i++) {
                Ptyh ptyh = infoService.showjl((Jobjl) jobjlarr.get(i));
//                System.out.println("循环输出第" + i + "查询出的ptyh对象" + ptyh.toString());
                ptyharr.add(ptyh);
//                ptyharr = new HashSet<>();
//                ptyharr.add(ptyh);
            }
//            System.out.println("这是封装号的ptyh对象即将发送到前台处理：" + ptyharr);
            return ptyharr;
        }
    }

    //get用户对应的简历
    @ResponseBody
    @RequestMapping(value = "getjllujing")
    public Jobjl getjllujing(HttpSession session,Jobjl jobjl){
        Gsyh gsyh= (Gsyh) session.getAttribute("gsyh");
        jobjl.setInfo_name(gsyh.getName());
        return  infoService.getjllujing(jobjl);
    }

//    热推职位
    @ResponseBody
    @RequestMapping(value = "hostjobview")
    public List hostjobview(String span){
//        System.out.println("传进来的span参数："+span);
        infoService.hostjobview(span);
//        System.out.println(infoService.hostjobview(span));
        return infoService.hostjobview(span);
    }

//    修改当前简历信息为未通过状态
    @ResponseBody
    @RequestMapping(value = "pass")
    public int pass(String jl){
        infoService.pass(jl);
        return 1;
    }


    //简历通过
    @ResponseBody
    @RequestMapping(value = "over")
    public int over(String jl){
        infoService.over(jl);
        return 1;
    }

//    简历已查看
    @ResponseBody
    @RequestMapping(value = "alredyseejl")
    public int alredyseejl(String jl){
        infoService.alredyseejl(jl);
        return 1;
    }

//    移除通过人员
    @ResponseBody
    @RequestMapping(value = "handler")
    public int handler(HttpSession session,Jobjl jobjl){
        Gsyh gsyh= (Gsyh) session.getAttribute("gsyh");
        jobjl.setInfo_name(gsyh.getName());
//        System.out.println("即将删除的jobjl对应的信息："+jobjl.toString());
        infoService.handler(jobjl);
        return 1;
    }

//    show5
    @ResponseBody
    @RequestMapping(value = "show5")
    public List show5(HttpSession session) throws Exception{
        Gsyh gsyh= (Gsyh) session.getAttribute("gsyh");
//        Info_tgrs info_tgrs = null;
//        info_tgrs.setName(gsyh.getName());
        ArrayList infolist= (ArrayList) infoService.returninfolist(gsyh.getName());
        //System.out.println("infolist的集合："+infolist);
        ArrayList infotgrslist=new ArrayList();
        if(infolist==null){
            //当前公司未发布招聘信息
            return null;
        }else {

            //System.out.println("infolist不为空进入了else判断语句！infolist.size()为："+infolist.size());
            for(int i=0;i<infolist.size();i++){
                Infotgrs infotgrs=new Infotgrs();
                //获取当前每条信息招聘通过的人数
                Info info1= (Info) infolist.get(i);
                infotgrs.setId(info1.getId());
                infotgrs.setJob(info1.getJob());
                infotgrs.setPay(info1.getPay());
                infotgrs.setTime(info1.getTime());
                infotgrs.setLevel(info1.getLevel());
                infotgrs.setPlace(info1.getPlace());
                infotgrs.setName(info1.getName());
//                int rs=infoService.infototgrs(info1);
                infotgrs.setRs(infoService.infototgrs(info1));
                infotgrslist.add(infotgrs);
            }
            //System.out.println("这是info_tgrslist集合："+infotgrslist);
            return infotgrslist;
        }
    }

    //删除招聘信息
    @ResponseBody
    @RequestMapping(value = "delinfoid")
    public int delinfoid(int id){

        infoService.delinfoid(id);
        return 1;
    }

    //编辑招聘信息
    @ResponseBody
    @RequestMapping(value = "showoldinfo")
    public Info showoldinfo(int id){
//        System.out.println("info id的值："+id);
//        System.out.println(infoService.showoldinfo(id));
        return infoService.showoldinfo(id);
    }

    //将修改的信息更新数据库
    @ResponseBody
    @RequestMapping(value = "updatenewinfo")
    public int updatenewinfo(Info info){
        infoService.updatenewinfo(info);
        return 1;
    }


}
