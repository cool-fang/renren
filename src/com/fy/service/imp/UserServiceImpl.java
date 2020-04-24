package com.fy.service.imp;

import com.fy.dao.UserDao;
import com.fy.entity.Gsyh;
import com.fy.entity.Jobjl;
import com.fy.entity.Ptyh;
import com.fy.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService{
	@Autowired
	private UserDao userDao;


	//用户登录
	@Override
	public Ptyh login(Ptyh ptyh) throws Exception {
		// TODO 自动生成的方法存根
//		i=0--管理员
//		i=1--普通用户
//		i=2--企业用户
	try{
		return (userDao.login1(ptyh));
	}catch (Exception e){
		return  null;
	}
//		System.out.println(ptyhDao.login(ptyh).getName()+"这是service");

	}

	//	公司登陆
	@Override
	public Gsyh login(Gsyh gsyh) throws Exception{
		// TODO 自动生成的方法存根
//		i=0--管理员
//		i=1--普通用户
//		i=2--企业用户
		try{
			return (userDao.login2(gsyh));
		}catch (Exception e){
			return  null;
		}
//		System.out.println(ptyhDao.login(ptyh).getName()+"这是service");

	}

	//普通用户注册
	@Override
	public void register1(Ptyh ptyh) {
		userDao.register1(ptyh);
	}

	//公司用户注册
	@Override
	public  void register2(Gsyh gsyh){userDao.register2(gsyh);}


	//验证注册名字是否在数据库中存在
	@Override
    public String checkptname(String name) {
        return userDao.checkptname(name);
    }

	//验证注册名字是否在数据库中存在
    @Override
    public String checkgsname(String name) {
        return userDao.checkgsname(name);
    }

    //普通用户修改用户信息
	@Override
	public void updateptyhinfo(Ptyh ptyh) {
		userDao.updateptyhinfo(ptyh);
	}

	@Override
	public void updategsyhinfo(Gsyh gsyh) {
		userDao.updategsyhinfo(gsyh);
	}

	//返回修改完成的用户信息并且展示在前台页面上
	@Override
	public Ptyh shownewuserinfo(Ptyh ptyh) {
		//System.out.println("service查询结果"+userDao.shownewuserinfo(ptyh).toString());
		return userDao.shownewuserinfo(ptyh);
	}

	//返回修改完成的公司信息并且展示在前台页面上
	@Override
	public Gsyh shownewgsinfo(Gsyh gsyh) {
		return userDao.shownewgsinfo(gsyh);
	}

	//	上传公司头像路径
	@Override
	public void changeimage(Gsyh gsyh){
		//System.out.println("这是service层获取的头像路径"+gsyh.getGs_image()+gsyh.getGs_id());
		userDao.changeimage(gsyh);
	}

	//	添加收藏的信息id
	@Override
	public void shoucang(String info_id, String yh_id) {
		userDao.shoucang(info_id,yh_id);
	}

	//如果打开网页被收藏则显示红心
	@Override
	public Ptyh showshoucang(int id,String info_id) throws Exception{
		try {
			//System.out.println("yh_id的值："+userDao.showshoucang(info_id).getYh_id());
			return userDao.showshoucang(id,info_id);
		}catch (Exception e){
			Ptyh ptyh=null;
			return ptyh;
		}
	}

	//取消收藏
	@Override
	public void hiddenaixin(String yh_id, String info_id) {
		userDao.hiddenaixin(yh_id,info_id);
	}

	//jobcontent页面显示公司相关信息返回公司对象
    @Override
    public Gsyh jobcontentshowgsname(String name) {
        return userDao.jobcontentshowgsname(name);
    }

	//    单纯上传用户头像路径
    @Override
    public void uploadyhimage(Ptyh ptyh) {
        userDao.uploadyhimage(ptyh);
    }

	//    按钮样式显示用户是否上传了用户头像
	@Override
	public String showyhimageisnotupload(Ptyh ptyh) throws Exception {
		try{
			return userDao.showyhimageisnotupload(ptyh);
		}catch (Exception E){
			return null;
		}
	}


	//    获取用户投简情况
    @Override
    public List showjlflag(Jobjl jobjl) throws Exception {
		try{
			return userDao.showjlflag(jobjl);
		}catch (Exception e){
			return null;
		}
    }

	//    show4招聘工作岗位
    @Override
    public List findzpjoblist(String name) throws Exception{
        try{
        	return userDao.findzpjoblist(name);
		}catch (Exception e){
        	return userDao.findzpjoblist(name);
		}
    }

    //    show4招聘通过用户
    @Override
    public List findzptgyh(String name,String info_job) throws Exception {
	    try{
            return  userDao.findzptgyh(name,info_job);
        }catch (Exception e){
	        return null;
        }


    }
	@Override
	public Ptyh selecttgyhbyid(Jobjl jobjl) {
		return userDao.selecttgyhbyid(jobjl);
	}

	//    用户删除记录
    @Override
    public void yhthrow(Jobjl jobjl) {
         userDao.yhthrow(jobjl);
    }


}
