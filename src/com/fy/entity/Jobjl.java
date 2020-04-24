package com.fy.entity;

public class Jobjl {
    private int id;

    private int info_id;

    private String info_name;

    private String info_job;

    private int ptyh_id;

    private String jl;

    private String jlflag;

    private int gsthrow;

    private int yhthrow;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getInfo_id() {
        return info_id;
    }

    public void setInfo_id(int info_id) {
        this.info_id = info_id;
    }

    public String getInfo_name() {
        return info_name;
    }

    public void setInfo_name(String info_name) {
        this.info_name = info_name;
    }

    public String getInfo_job() {
        return info_job;
    }

    public void setInfo_job(String info_job) {
        this.info_job = info_job;
    }

    public int getPtyh_id() {
        return ptyh_id;
    }

    public void setPtyh_id(int ptyh_id) {
        this.ptyh_id = ptyh_id;
    }

    public String getJl() {
        return jl;
    }

    public void setJl(String jl) {
        this.jl = jl;
    }

    public String getJlflag() {
        return jlflag;
    }

    public void setJlflag(String jlflag) {
        this.jlflag = jlflag;
    }

    public int getGsthrow() {
        return gsthrow;
    }

    public void setGsthrow(int gsthrow) {
        this.gsthrow = gsthrow;
    }

    public int getYhthrow() {
        return yhthrow;
    }

    public void setYhthrow(int yhthrow) {
        this.yhthrow = yhthrow;
    }

    @Override
    public String toString() {
        return "Jobjl{" +
                "id=" + id +
                ", info_id=" + info_id +
                ", info_name='" + info_name + '\'' +
                ", info_job='" + info_job + '\'' +
                ", ptyh_id=" + ptyh_id +
                ", jl='" + jl + '\'' +
                ", jlflag='" + jlflag + '\'' +
                ", gsthrow=" + gsthrow +
                ", yhthrow=" + yhthrow +
                '}';
    }
}
