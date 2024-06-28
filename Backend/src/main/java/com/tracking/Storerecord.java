package com.tracking;

public class Storerecord {
	private int serialno;
	private String usename;
	private String details;
	private double amount;
	private String dcategory;
	private String ttype;
	private String tdate;
	public Storerecord(int serialno, String usename, String details, double amount, String dcategory, String ttype,String tdate) {
		this.serialno = serialno;
		this.usename = usename;
		this.details = details;
		this.amount = amount;
		this.dcategory = dcategory;
		this.ttype = ttype;
		this.tdate = tdate;
	}
	public int getSerialno() {
		return serialno;
	}
	public String getUsename() {
		return usename;
	}
	public String getDetails() {
		return details;
	}
	public double getAmount() {
		return amount;
	}
	public String getDcategory() {
		return dcategory;
	}
	public String getTtype() {
		return ttype;
	}
	public String getTdate() {
		return tdate;
	}
	public void setSerialno(int serialno) {
		this.serialno = serialno;
	}
	public void setUsename(String usename) {
		this.usename = usename;
	}
	public void setDetails(String details) {
		this.details = details;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}
	public void setDcategory(String dcategory) {
		this.dcategory = dcategory;
	}
	public void setTtype(String ttype) {
		this.ttype = ttype;
	}
	public void setTdate(String tdate) {
		this.tdate = tdate;
	}	

}
