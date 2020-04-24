package com.fy.service;

import com.fy.entity.Gsyh;
import com.fy.entity.Jobjl;
import com.fy.entity.Ptyh;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService{

	//用户登录验证
	Ptyh login(Ptyh ptyh) throws Exception;

	//公司用户登录验证
	Gsyh login(Gsyh gsyh) throws Exception;

	//普通用户注册
	void register1(Ptyh ptyh);

	//公司用户注册模块
	void register2(Gsyh gsyh);

	//验证普通注册名字是否在数据库中存在
	String checkptname(String name);

	//验证公司注册名字是否在数据库中存在
	String checkgsname(String name);

	//修改用户信息
	void updateptyhinfo(Ptyh ptyh);

	//修改公司信息
	void updategsyhinfo(Gsyh gsyh);

	//展示修改后的用户信息
	Ptyh shownewuserinfo(Ptyh ptyh);

	//展示修改后的用户信息
	Gsyh shownewgsinfo(Gsyh gsyh);

	//	上传公司头像路径
	void changeimage(Gsyh gsyh);

	//添加收藏信息id
	void shoucang(String info_id, String yh_id);

	//如果打开网页被收藏则显示红心
	Ptyh showshoucang(int id,String info_id) throws Exception;

	//取消收藏
	void hiddenaixin(String yh_id, String info_id);

	//jobcontent页面显示公司相关信息返回公司对象
    Gsyh jobcontentshowgsname(String name);

	//    单纯上传用户头像路径
    void uploadyhimage(Ptyh ptyh);

	//    按钮样式显示用户是否上传了用户头像
	String showyhimageisnotupload(Ptyh ptyh) throws Exception;

	//    获取用户投简情况
    List showjlflag(Jobjl jobjl) throws Exception;

	//    show4招聘工作岗位
    List findzpjoblist(String name) throws Exception;

    //    show4招聘通过用户
    List findzptgyh(String name,String info_job) throws Exception;
	Ptyh selecttgyhbyid(Jobjl jobjl);

	//    用户删除记录
    void yhthrow(Jobjl jobjl);
}
