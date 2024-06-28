package com.tracking;

public class Det {
	
	private double ukagoal;
	private double money;
	
	public Det() {}

	public Det(double ukagoal, double money) {
		super();
		this.ukagoal = ukagoal;
		this.money = money;
	}

	public double getUkagoal() {
		return ukagoal;
	}

	public double getMoney() {
		return money;
	}

	public void setUkagoal(double ukagoal) {
		this.ukagoal = ukagoal;
	}

	public void setMoney(double money) {
		this.money = money;
	}
}
