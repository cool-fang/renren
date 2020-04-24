package com.fy.dao;

import com.fy.entity.Gsyh;
import com.fy.entity.Jobjl;
import com.fy.entity.Ptyh;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserDao {

	//用户登录模块
	Ptyh login1(Ptyh ptyh);

	//公司用户登录验证
	Gsyh login2(Gsyh gsyh);

	//普通用户注册模块
	void register1(Ptyh ptyh);

	//公司用户注册模块
	void register2(Gsyh gsyh);

	//验证普通用户注册名字是否在数据库中存在
	String checkptname(String name);

	//验证公司用户注册名字是否在数据库中存在
	String checkgsname(String name);

	//普通用户修改信息
	void updateptyhinfo(Ptyh ptyh);

	//展示修改后的用户信息
	Ptyh shownewuserinfo(Ptyh ptyh);

	//公司用户修改信息
    void updategsyhinfo(Gsyh gsyh);

	//展示修改后的公司信息
	Gsyh shownewgsinfo(Gsyh gsyh);

	//上传公司头像路径
	void changeimage(Gsyh gsyh);

//	添加收藏的信息的id
	void shoucang(@Param("info_id") String info_id,@Param("yh_id") String yh_id);

	//如果打开网页被收藏则显示红心
    Ptyh showshoucang(@Param("id") int id,@Param("info_id") String info_id);

    //取消收藏
	void hiddenaixin(@Param("yh_id") String yh_id, @Param("info_id") String info_id);

	//jobcontent页面显示公司相关信息返回公司对象
    Gsyh jobcontentshowgsname(String name);

	//    单纯上传用户头像路径
    void uploadyhimage(Ptyh ptyh);

	//    按钮样式显示用户是否上传了用户头像
	String showyhimageisnotupload(Ptyh ptyh);



	//    获取用户投简情况
	List showjlflag(Jobjl jobjl);

    //    show4招聘工作岗位
    List findzpjoblist(String name);

    //    show4招聘工作岗位
    List findzptgyh(@Param("name") String name,@Param("info_job") String info_job);
	Ptyh selecttgyhbyid(Jobjl jobjl);

	//    用户删除记录
	void yhthrow(Jobjl jobjl);
}
