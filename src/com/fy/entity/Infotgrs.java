package com.fy.entity;

public class Infotgrs {
    private int id;

    private String name;

    private String place;

    private String pay;

    private String job;

    private String time;

    private String level;

    private int rs;

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

    public int getRs() {
        return rs;
    }

    public void setRs(int rs) {
        this.rs = rs;
    }

    @Override
    public String toString() {
        return "Infotgrs{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", place='" + place + '\'' +
                ", pay='" + pay + '\'' +
                ", job='" + job + '\'' +
                ", time='" + time + '\'' +
                ", level='" + level + '\'' +
                ", rs=" + rs +
                '}';
    }
}
