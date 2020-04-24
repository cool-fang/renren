package com.fy.service.imp;

import com.fy.dao.InfoDao;
import com.fy.entity.*;
import com.fy.service.InfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InfoServiceImpl implements InfoService {
    @Autowired
    private InfoDao infoDao;


    @Override
    public List infoview(Infospan infospan) {
       // System.out.println("Service层返回值：" + infoDao.infoview(infospan));
        if (!(infoDao.infoview(infospan) == null)) {
            return (infoDao.infoview(infospan));
        } else {
            return null;
        }
    }

    @Override
    public void postinfo(Info info) {

        infoDao.postinfo(info);
    }


    @Override
    public void updateoldimage(Gsyh gsyh) {

        infoDao.updateoldimage(gsyh);
    }

    @Override
    public Info showjobcontent(int id) {
        return infoDao.showjobcontent(id);
    }

    @Override
    public Info showyhaixin(int id) {
        return infoDao.showyhaixin(id);
    }

    //查询当前页面是否被用户投过简历
    @Override
    public Jobjl findyhinthisjobcontent(int ptyh_id, int info_id) throws Exception{
        try{
            Jobjl jobjl=infoDao.findyhinthisjobcontent(ptyh_id,info_id);
            //System.out.println("这是service层的wha"+what);
            return jobjl;
        }catch (Exception e){
            Jobjl jobjl=null;
            return jobjl;
        }
    }

    //    上传简历路径
    @Override
    public void uploadjl(Jobjl jobjl)  {
        infoDao.uploadjl(jobjl);
    }

    //根据id返回info对象
    @Override
    public Info returninfo(int info_id) throws Exception {
        return infoDao.returninfo(info_id);
    }

    //    查询公司发布的工作类型
    @Override
    public List findgsjoblist(String name) throws Exception {
        try{
            return infoDao.findgsjoblist(name);
        }catch (Exception e){
            return null;
        }

    }

    //    操作用户简历
    @Override
    public List showjobjl(Jobjl jobjl) throws Exception {
        try{
            return infoDao.showjobjl(jobjl);
        }catch (Exception e){
            return  null;
        }

    }

    //    通过jobjl对象获取ptyh对象集合
    @Override
    public Ptyh showjl(Jobjl jobjl) {
        return infoDao.showjl(jobjl);
    }

    //get用户对应的简历
    @Override
    public Jobjl getjllujing(Jobjl jobjl) {
        return infoDao.getjllujing(jobjl);
    }

//    热推职位
    @Override
    public List hostjobview(String span) {
       return infoDao.hostjobview(span);
    }

    //    修改当前简历信息为未通过状态
    @Override
    public void pass(String jl) {
        infoDao.pass(jl);
    }

    //简历通过
    @Override
    public void over(String jl) {
        infoDao.over(jl);
    }

    //    简历已查看
    @Override
    public void alredyseejl(String jl) {
        infoDao.alredyseejl(jl);
    }

    //    移除通过人员
    @Override
    public void handler(Jobjl jobjl) {
        infoDao.handler(jobjl);
    }

//    show5
    @Override
    public List returninfolist(String name) throws Exception {
        try{
            return infoDao.returninfolist(name);
        }catch (Exception e){
            return null;
        }

    }

//    show5
    @Override
    public Integer infototgrs(Info info) throws Exception {
        return infoDao.infototgrs(info);
    }

    //删除招聘信息
    @Override
    public void delinfoid(int id) {
        infoDao.delinfoid(id);
    }

    //编辑招聘信息
    @Override
    public Info showoldinfo(int id) {
        return infoDao.showoldinfo(id);
    }

    //将修改的信息更新数据库
    @Override
    public void updatenewinfo(Info info) {
        infoDao.updatenewinfo(info);
    }

}
