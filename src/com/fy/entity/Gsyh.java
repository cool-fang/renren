package com.fy.entity;

public class Gsyh {
    private Integer id;

    private String gs_image;

    private String name;

    private String pwd;

    private String gs_id;

    private String isbn;

    private String number;

    private String email;

    private int grade;

    private String ordername;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getGs_image() {
        return gs_image;
    }

    public void setGs_image(String gs_image) {
        this.gs_image = gs_image;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    public String getGs_id() {
        return gs_id;
    }

    public void setGs_id(String gs_id) {
        this.gs_id = gs_id;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getGrade() {
        return grade;
    }

    public void setGrade(int grade) {
        this.grade = grade;
    }

    public String getOrdername() {
        return ordername;
    }

    public void setOrdername(String ordername) {
        this.ordername = ordername;
    }

    @Override
    public String toString() {
        return "Gsyh{" +
                "id=" + id +
                ", gs_image='" + gs_image + '\'' +
                ", name='" + name + '\'' +
                ", pwd='" + pwd + '\'' +
                ", gs_id='" + gs_id + '\'' +
                ", isbn='" + isbn + '\'' +
                ", number='" + number + '\'' +
                ", email='" + email + '\'' +
                ", grade=" + grade +
                ", ordername='" + ordername + '\'' +
                '}';
    }
}
