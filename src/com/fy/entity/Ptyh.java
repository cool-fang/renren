package com.fy.entity;

public class Ptyh {
    private Integer id;

    private String yh_image;

    private String name;

    private String yh_id;

    private String pwd;

    private String sex;

    private String number;

	private String yh_jl;

    private String email;

	private String shoucang;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getYh_image() {
		return yh_image;
	}

	public void setYh_image(String yh_image) {
		this.yh_image = yh_image;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getYh_id() {
		return yh_id;
	}

	public void setYh_id(String yh_id) {
		this.yh_id = yh_id;
	}

	public String getPwd() {
		return pwd;
	}

	public void setPwd(String pwd) {
		this.pwd = pwd;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getNumber() {
		return number;
	}

	public void setNumber(String number) {
		this.number = number;
	}

	public String getYh_jl() {
		return yh_jl;
	}

	public void setYh_jl(String yh_jl) {
		this.yh_jl = yh_jl;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getShoucang() {
		return shoucang;
	}

	public void setShoucang(String shoucang) {
		this.shoucang = shoucang;
	}

	@Override
	public String toString() {
		return "Ptyh{" +
				"id=" + id +
				", yh_image='" + yh_image + '\'' +
				", name='" + name + '\'' +
				", yh_id='" + yh_id + '\'' +
				", pwd='" + pwd + '\'' +
				", sex='" + sex + '\'' +
				", number='" + number + '\'' +
				", yh_jl='" + yh_jl + '\'' +
				", email='" + email + '\'' +
				", shoucang='" + shoucang + '\'' +
				'}';
	}
}