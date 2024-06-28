package com.tracking;

import java.sql.Date;

public class Record {
	
	private int serialno;
	private String details;
	private double amount;
	private String dcategory;
	private String ttype;
	private Date tdate;
	
	public Record() {}
	
	public Record(int serialno,String details, double amount, String dcategory, String ttype, Date tdate) {
		this.serialno = serialno;
		this.details = details;
		this.amount = amount;
		this.dcategory = dcategory;
		this.ttype = ttype;
		this.tdate = tdate;
	}

	public int getSerialno() {
		return serialno;
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

	public Date getTdate() {
		return tdate;
	}

	public void setSerialno(int serialno) {
		this.serialno = serialno;
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

	public void setTdate(Date tdate) {
		this.tdate = tdate;
	}
}
