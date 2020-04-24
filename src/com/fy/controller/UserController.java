package com.fy.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import com.fy.entity.Gsyh;
import com.fy.entity.Info;
import com.fy.entity.Jobjl;
import com.fy.entity.Ptyh;
import com.fy.service.InfoService;
import com.fy.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.Random;

@Controller

public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private InfoService infoService;

//    登录验证码
    @ResponseBody
    @RequestMapping(value = "code")
    public void createCode(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // 通知浏览器不要缓存
        response.setHeader("Expires", "-1");
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("Pragma", "-1");
        Tools util = Tools.Instance();
        // 将验证码输入到session中，用来验证
        String code = util.getString();
        //System.out.println("验证码是："+code);
        request.getSession().setAttribute("code", code);
        //System.out.println("SESSION的值是："+request.getSession().getAttribute("code"));
        // 输出打web页面
        ImageIO.write(util.getImage(), "jpg", response.getOutputStream());
    }

    @ResponseBody
    @RequestMapping(value = "ptlogin")
    //用户登录模块
    public int login(HttpSession session, Ptyh ptyh ,String code) throws Exception {
       // System.out.println("这是code的值："+code);
        String code1= (String) session.getAttribute("code");
//        if(code1.equals(code)){
        if(1==1){
            //System.out.println("返回的值："+userService.login(ptyh));
            if ((userService.login(ptyh))!= null) {
                session.setAttribute("ptyh", userService.login(ptyh));
                //System.out.println("ptyh的session的值："+session.getAttribute("ptyh"));
                return 1;
            }else {
                return 0;
            }
        }else {
            return 2;
        }
    }

    @ResponseBody
    @RequestMapping(value = "gslogin")
    //公司登录模块
    public int login(HttpSession session, Gsyh gsyh,String code) throws Exception {
        String code1= (String) session.getAttribute("code");
//        if(code1.equals(code)){
        if(1==1){
           // System.out.println("返回的值："+userService.login(gsyh));
            if ((userService.login(gsyh))!= null) {
                session.setAttribute("gsyh", userService.login(gsyh));
                return 1;
            }else {
                return 0;
            }

        }else {
            return 2;
        }
    }

    //普通用户注册模块
    @ResponseBody
    @RequestMapping(value = "ptregister")
    public int register(Ptyh ptyh) {
        Random random = new Random();
        String yh_id = "";
        for (int i = 0; i < 7; i++) {
            int r = random.nextInt(10);
            yh_id = yh_id + r;
        }
//		System.out.println(yh_id);
        ptyh.setYh_id(yh_id);
//		ptyh.setGrade(1);
        userService.register1(ptyh);
        return 1;
    }

    //公司用户注册模块
    @ResponseBody
    @RequestMapping(value = "gsregister")
    public int register(Gsyh gsyh) {
        Random random = new Random();
        String gs_id = "";
        for (int i = 0; i < 9; i++) {
            int r = random.nextInt(10);
            gs_id = gs_id + r;
        }
//		System.out.println(gs_id);
        gsyh.setGs_id(gs_id);
//		ptyh.setGrade(1);
        userService.register2(gsyh);
        return 1;
    }

    //验证普通注册名字是否在数据库中存在
    @ResponseBody
    @RequestMapping(value = "checkptnameisexist")
    public int checkptname(String name) {
        String s = userService.checkptname(name);
        //System.out.println("这是检测普通用户名称是否存在"+s);
        try {
            if (s == null) {
                return 1;
            }
        } catch (Exception e) {

        }
        return 0;
    }

    //验证公司注册名字是否在数据库中存在
    @ResponseBody
    @RequestMapping(value = "checkgsnameisexist")
    public int checkgsname(String name) {
        String s = userService.checkgsname(name);
//		System.out.println("这是检测公司名称是否存在"+s);
        try {
            if (s == null) {
                return 1;
            }
        } catch (Exception e) {

        }
        return 0;
    }

    //前台显示登录用户名
    @ResponseBody
    @RequestMapping(value = "showuserinfo")
    public Ptyh showusername(HttpSession session) {
        Ptyh ptyh = (Ptyh) session.getAttribute("ptyh");
        //System.out.println("取值"+ptyh.toString());
        return ptyh;
    }

    //前台显示登录公司名
    @ResponseBody
    @RequestMapping(value = "showgsinfo")
    public Gsyh showgsname(HttpSession session) {
        Gsyh gsyh = (Gsyh) session.getAttribute("gsyh");
//		System.out.println("取值"+gsyh.toString());
        return gsyh;
    }

    //普通用户信息修改
    @ResponseBody
    @RequestMapping(value = "updateptyhinfo")
    public int updateptyhinfo(Ptyh ptyh) {
        //System.out.println("这是前台获取的值"+ptyh.toString());
        userService.updateptyhinfo(ptyh);
        return 1;
    }

    //公司用户信息修改
    @ResponseBody
    @RequestMapping(value = "updategsyhinfo")
    public int updategsyhinfo(Gsyh gsyh) {
        //System.out.println("这是前台获取的值"+gsyh.toString());
        userService.updategsyhinfo(gsyh);
        return 1;
    }

    //通过session获取yh_id去查询更新用户信息
    @ResponseBody
    @RequestMapping(value = "shownewuserinfo")
    public Ptyh shownewuserinfo(HttpSession session) {
        //System.out.println("这是数据库获取的值"+ptyh.toString());
        Ptyh ptyh= (Ptyh) session.getAttribute("ptyh");
        Ptyh l = userService.shownewuserinfo(ptyh);
        session.setAttribute("ptyh", l);
        return l;
    }

    //通过session获取gs_id去查询更新用户信息
    @ResponseBody
    @RequestMapping(value = "shownewgsinfo")
    public Gsyh shownewgsinfo(HttpSession session, Gsyh gsyh) {
        Gsyh l = userService.shownewgsinfo(gsyh);
        //System.out.println("这是数据库获取的值准备存入session"+l.toString());
        session.setAttribute("gsyh", l);
        return l;
    }

    //上传图片
//    @ResponseBody
//    @RequestMapping(value = "changsimage")
//    public int changeimage(HttpSession session,Gsyh gsyh) {
//
//        //System.out.println(gsyh.getGs_image()+gsyh.getGs_id());
////        userService.changeimage(gsyh);
////        // //修改info表中的头像（防止公司发布信息后不停的修改头像）
////        Gsyh gsyh1= (Gsyh) session.getAttribute("gsyh");
////        String name=gsyh1.getName();
////        String gs_image = gsyh.getGs_image();
//        //System.out.println("这是要去数据库修改的："+name+gs_image);
////        infoService.updateoldimage(name, gs_image);
//        return 1;
//    }

//    收藏
    @ResponseBody
    @RequestMapping(value = "shoucang")
    public boolean shoucang(HttpSession session,String info_id){
        Ptyh ptyh = (Ptyh) session.getAttribute("ptyh");
        String yh_id=ptyh.getYh_id();
        //System.out.println("这是info中的id添加到数据库中的id:"+info_id+"和当前操作用户id:"+yh_id);
        userService.shoucang(info_id,yh_id);
        return true;
    }

    // 显示当前详情页是否被用户收藏
    @ResponseBody
    @RequestMapping(value = "showshoucang")
    public int showshoucang(HttpSession session,String info_id) throws Exception{
       //System.out.println(info_id);
        Ptyh ptyh1= (Ptyh) session.getAttribute("ptyh");
        int id=ptyh1.getId();
        Ptyh ptyh=userService.showshoucang(id,info_id);
        //System.out.println("控制层返回的用户id" +ptyh.getYh_id());
        //查询返回对象的用户id
            if (!(ptyh==null)) {
                return 1;
            }else {
                return 0;
        }
    }

    //取消收藏
    @ResponseBody
    @RequestMapping(value = "hiddenaixin")
    public int hiddenaixin(HttpSession session,String info_id){
        Ptyh ptyh = (Ptyh) session.getAttribute("ptyh");
        String yh_id=ptyh.getYh_id();
        userService.hiddenaixin(yh_id,info_id);
        //System.out.println("这是info中隐藏爱心的id:"+info_id+"和当前操作用户id:"+yh_id);
        return 1;
    }

    //jobcontent页面显示公司相关信息返回公司对象
    @ResponseBody
    @RequestMapping(value = "jobcontentshowgsname")
    public Gsyh jobcontentshowgsname(String name){
        return userService.jobcontentshowgsname(name);
    }

//    单纯上传用户头像路径
//    @ResponseBody
//    @RequestMapping(value = "uploadyhimage")
//    public int uploadyhimage(Ptyh ptyh){
//        //System.out.println(ptyh.toString());
////        userService.uploadyhimage(ptyh);
//        return 1;
//    }

//    （普通用户）按钮样式显示用户是否上传了用户头像
    @ResponseBody
    @RequestMapping(value = "showyhimageisnotupload")
    public int showyhimageisnotupload(Ptyh ptyh) throws Exception{
        //System.out.println("前台传来的用户id"+ptyh.getYh_id());
        String what=userService.showyhimageisnotupload(ptyh);
        if (what==null){
            return 0;
        }else{
            return 1;
        }
    }


//    获取用户投简情况
    @ResponseBody
    @RequestMapping(value = "showjlflag")
    public List showjlflag(Jobjl jobjl) throws Exception{
        System.out.println("jobli对象:"+jobjl.toString());
        List jobjllist=userService.showjlflag(jobjl);
        if(jobjllist==null){
            return null;
        }else {
           System.out.println("jobli对象的集合:"+jobjllist);
            return jobjllist;
        }
    }

    //    用户删除记录
    @ResponseBody
    @RequestMapping(value = "yhthrow")
    public int yhthrow(Jobjl jobjl){
        userService.yhthrow(jobjl);
        return 1;
    }


//    清楚session
    @ResponseBody
    @RequestMapping(value = "sessionclear")
    public boolean sessionclear(HttpSession session){
        session.invalidate();
        return true;
    }


    //    show4招聘工作岗位
    @ResponseBody
    @RequestMapping(value = "findzpjoblist")
    public List findzpjoblist(HttpSession session) throws Exception{
        Gsyh gsyh= (Gsyh) session.getAttribute("gsyh");
        List list=userService.findzpjoblist(gsyh.getName());
        //System.out.println("兑现数组："+list);
        if(list==null){
            return null;
        }else {
            return list;
        }
    }

//    show4招聘通过用户
    @ResponseBody
    @RequestMapping(value = "findzptgyh")
    public List findzptgyh(HttpSession session,String info_job) throws Exception{
       // System.out.println(info_job);
        Gsyh gsyh= (Gsyh) session.getAttribute("gsyh");
        List list=userService.findzptgyh(gsyh.getName(),info_job);
        if(list==null){
            return null;
        }else{
            ArrayList arrayList =new ArrayList();
            for(int i=0;i<list.size();i++){
                Ptyh ptyh=userService.selecttgyhbyid((Jobjl) list.get(i));
                arrayList.add(ptyh);
        }
            //System.out.println("list:"+list);
            // System.out.println("当前岗位通过的用户对象信息列表："+arrayList);
            return arrayList;
        }
    }

    //直接返回1
    @ResponseBody
    @RequestMapping(value = "del")
    public int del(){
        return 1;
    }
}


