package com.controller.FIleDeal;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Controller
public class UploadController {


//    单文件上传
//    CommonsMultipartFile
    @RequestMapping("upload.do")
    public String upload(@RequestParam("fileUpload") CommonsMultipartFile commonsMultipartFile) throws IOException {
        String originalFilename = commonsMultipartFile.getOriginalFilename();
        int index = originalFilename.lastIndexOf(".");
        System.out.println(index);
        String extentName = originalFilename.substring(index);
        String newName = UUID.randomUUID() + extentName;
        File file = new File("D:\\毕业设计\\uploadfile", newName);
        commonsMultipartFile.transferTo(file);
        return "banqianzheng.html";
    }

//    多文件上传
//    MultipartFile
    @RequestMapping("uploads.do")
    public String uploadList(@RequestParam("fileUpload") MultipartFile[] multipartFile) throws IOException {
        for (MultipartFile forResult:multipartFile){
            String originalFilename = forResult.getOriginalFilename();
            int index = originalFilename.lastIndexOf(".");
            String extentName = originalFilename.substring(index);
            String newNames = UUID.randomUUID() + extentName;
            File factory = new File("E:\\", newNames);
            forResult.transferTo(factory);
        }
        return "home.html";

    }
}
