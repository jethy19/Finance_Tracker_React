package com.tracking;

public class User {
	
	private String ukafullname;
	private String ukaname;
	private String ukapass;
	private double ukagoal;
	private String ukaphone;
	private String ukaemail;
	
	public User() {}
	
	public User(String ukafullname, String ukaname, String ukapass,double ukagoal,String ukaphone,String ukaemail) {
		this.ukafullname = ukafullname;
		this.ukaname = ukaname;
		this.ukapass = ukapass;
		this.ukagoal = ukagoal;
		this.ukaphone = ukaphone;
		this.ukaemail = ukaemail;
	}
	
	public User(String ukafullname,String ukaphone,String ukaemail) {
		this.ukafullname = ukafullname;
		this.ukaphone = ukaphone;
		this.ukaemail = ukaemail;
	}

	public String getUkafullname() {
		return ukafullname;
	}

	public String getUkaname() {
		return ukaname;
	}

	public String getUkapass() {
		return ukapass;
	}

	public void setUkafullname(String ukafullname) {
		this.ukafullname = ukafullname;
	}

	public void setUkaname(String ukaname) {
		this.ukaname = ukaname;
	}

	public void setUkapass(String ukapass) {
		this.ukapass = ukapass;
	}

	public double getUkagoal() {
		return ukagoal;
	}

	public void setUkagoal(double ukagoal) {
		this.ukagoal = ukagoal;
	}

	public String getUkaphone() {
		return ukaphone;
	}

	public String getUkaemail() {
		return ukaemail;
	}

	public void setUkaphone(String ukaphone) {
		this.ukaphone = ukaphone;
	}

	public void setUkaemail(String ukaemail) {
		this.ukaemail = ukaemail;
	}	
}
