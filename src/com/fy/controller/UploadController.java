package com.fy.controller;

import com.fy.entity.Gsyh;
import com.fy.entity.Info;
import com.fy.entity.Jobjl;
import com.fy.entity.Ptyh;
import com.fy.service.InfoService;
import com.fy.service.UserService;
import jdk.nashorn.internal.ir.RuntimeNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.UUID;

@Controller
public class UploadController {
@Autowired
private UserService userService;
@Autowired
private InfoService infoService;

//    单文件上传(图片上传控制类)
//    CommonsMultipartFile
    @RequestMapping(value = "upload")
    public String upload(@RequestParam("fileUpload") CommonsMultipartFile commonsMultipartFile, HttpSession HttpSession) throws IOException {
            String originalFilename = commonsMultipartFile.getOriginalFilename();
            Gsyh gsyh= (com.fy.entity.Gsyh) HttpSession.getAttribute("gsyh");
            if(originalFilename==""){
                return "redirect:gsindex.html";
            }else{
                int index = originalFilename.lastIndexOf(".");
                String extentName = originalFilename.substring(index);
                String newNames = UUID.randomUUID() + extentName;
                //System.out.println("新名字："+newNames);
                String imglujing="image/gsimage/" + newNames;
                gsyh.setGs_image(imglujing);
                //System.out.println("这是要去修改的公司的信息："+gsyh.toString());
                userService.changeimage(gsyh);
                File file = new File("C:\\Users\\cool\\Desktop\\renren\\web\\image\\gsimage", newNames);
                commonsMultipartFile.transferTo(file);
                infoService.updateoldimage(gsyh);
                return "redirect:gsindex.html";
            }
    }

    //    单文件上传(用户头像上传控制类)
    //    CommonsMultipartFile
    @RequestMapping(value = "postyhimage")
    public String uploadyhimage(@RequestParam("postyhimage") CommonsMultipartFile commonsMultipartFile,HttpSession HttpSession) throws IOException {
        String originalFilename = commonsMultipartFile.getOriginalFilename();
        if(originalFilename=="") {
            return "redirect:ptyhinfo.html";
        }else {
            int index = originalFilename.lastIndexOf(".");
            String extentName = originalFilename.substring(index);
            String newNames = UUID.randomUUID() + extentName;
            //System.out.println("新名字："+newNames);
            String imglujing="image/yhimage/" + newNames;
            Ptyh ptyh= (Ptyh) HttpSession.getAttribute("ptyh");
            ptyh.setYh_image(imglujing);
            userService.uploadyhimage(ptyh);
            //System.out.println("这是要去修改的公司的信息："+gsyh.toString());
            File file = new File("C:\\Users\\cool\\Desktop\\renren\\web\\image\\yhimage", newNames);
            commonsMultipartFile.transferTo(file);
            return "redirect:ptyhinfo.html";
        }
    }

    //上传用户简历
    @RequestMapping(value = "postjl")
    public String uploadjl(@RequestParam("postyhjl") CommonsMultipartFile commonsMultipartFile,HttpSession session) throws Exception {
        String originalFilename = commonsMultipartFile.getOriginalFilename();
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        String url=request.getHeader("Referer");
        //获取当前jobcontentURL中的id
        String str1=url.substring(0, url.indexOf("="));
        String str2=url.substring(str1.length()+1, url.length());
        if(originalFilename=="") {
            return "redirect:"+url;
        }else {
            int index = originalFilename.lastIndexOf(".");
            String extentName = originalFilename.substring(index);
            String newNames = UUID.randomUUID() + extentName;
            String jllujing="jl/" + newNames;
            File file = new File("C:\\Users\\cool\\Desktop\\renren\\web\\jl", newNames);
            commonsMultipartFile.transferTo(file);
//        获取表单提交页面的url
            int info_id=Integer.parseInt(str2);
            Ptyh ptyh = (Ptyh) session.getAttribute("ptyh");
            Info info = infoService.returninfo(info_id);
            Jobjl jobjl = new Jobjl();
            jobjl.setInfo_name(info.getName());
            jobjl.setInfo_id(info_id);
            jobjl.setInfo_job(info.getJob());
            jobjl.setPtyh_id(ptyh.getId());
            jobjl.setJl(jllujing);
            jobjl.setJlflag("待处理");
            infoService.uploadjl(jobjl);
            //System.out.println("准备存入数据库的数值："+jobjl.toString());
            return "redirect:"+url;
        }

    }

//    多文件上传
//    MultipartFile
//    @RequestMapping(value = "uploads")
//    public String uploadList(@RequestParam("fileUpload") MultipartFile[] multipartFile) throws IOException {
//        for (MultipartFile forResult:multipartFile){
//            String originalFilename = forResult.getOriginalFilename();
//            int index = originalFilename.lastIndexOf(".");
//            String extentName = originalFilename.substring(index);
//            String newNames = UUID.randomUUID() + extentName;
//            File factory = new File("E:\\", newNames);
//            forResult.transferTo(factory);
//        }
//        return "home.html";
//    }
}
