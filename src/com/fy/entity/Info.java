package com.fy.entity;

public class Info {

    private int id;

    private String name;

    private String place;

    private String pay;

    private String job;

    private String time;

    private String level;

    private String gs_image;

    private String jobcontent;

    private String company;

    private String span1;

    private String span2;

    private String span3;

    private String span4;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public String getPay() {
        return pay;
    }

    public void setPay(String pay) {
        this.pay = pay;
    }

    public String getJob() {
        return job;
    }

    public void setJob(String job) {
        this.job = job;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getGs_image() {
        return gs_image;
    }

    public void setGs_image(String gs_image) {
        this.gs_image = gs_image;
    }

    public String getJobcontent() {
        return jobcontent;
    }

    public void setJobcontent(String jobcontent) {
        this.jobcontent = jobcontent;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getSpan1() {
        return span1;
    }

    public void setSpan1(String span1) {
        this.span1 = span1;
    }

    public String getSpan2() {
        return span2;
    }

    public void setSpan2(String span2) {
        this.span2 = span2;
    }

    public String getSpan3() {
        return span3;
    }

    public void setSpan3(String span3) {
        this.span3 = span3;
    }

    public String getSpan4() {
        return span4;
    }

    public void setSpan4(String span4) {
        this.span4 = span4;
    }

    @Override
    public String toString() {
        return "Info{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", place='" + place + '\'' +
                ", pay='" + pay + '\'' +
                ", job='" + job + '\'' +
                ", time='" + time + '\'' +
                ", level='" + level + '\'' +
                ", gs_image='" + gs_image + '\'' +
                ", jobcontent='" + jobcontent + '\'' +
                ", company='" + company + '\'' +
                ", span1='" + span1 + '\'' +
                ", span2='" + span2 + '\'' +
                ", span3='" + span3 + '\'' +
                ", span4='" + span4 + '\'' +
                '}';
    }
}
