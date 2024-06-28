package com.tracking;

public class Filter {
	private String username;
	private String sdate;
	private String edate;
	
	public Filter() {}
	
	public Filter(String username, String sdate, String edate) {
		this.username = username;
		this.sdate = sdate;
		this.edate = edate;
	}

	public String getUsername() {
		return username;
	}

	public String getSdate() {
		return sdate;
	}

	public String getEdate() {
		return edate;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setSdate(String sdate) {
		this.sdate = sdate;
	}

	public void setEdate(String edate) {
		this.edate = edate;
	}
}
