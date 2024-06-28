package com.tracking;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.google.common.hash.Hashing;

@Repository
@Transactional
public class Overalldao {
	
	@Autowired
	private JdbcTemplate jdbctemplate;
	
	
	
	@SuppressWarnings("deprecation")
	public User getByUser(String u) {
		String sql = "select userid,ukafullname,ukaname from financetrackinguser where ukaname = ?";
		Object[] args = {u};
		try {
			User r = jdbctemplate.queryForObject(sql,args,BeanPropertyRowMapper.newInstance(User.class));
			return r;			
		}catch(Exception e){
			System.out.println("User Not Found");
		}
		return null;		
	}
	
	@SuppressWarnings("deprecation")
	public User getBycredentials(String u,String p) {
		String sql = "select userid,ukafullname,ukaname from financetrackinguser where ukaname = ? and ukapass = ?";
		Object[] args = {u,p};
		try {
			User r = jdbctemplate.queryForObject(sql,args,BeanPropertyRowMapper.newInstance(User.class));
			return r;			
		}catch(Exception e) {
			System.out.println("User Not Found");
		}
		return null;		
	}
	
	@SuppressWarnings("deprecation")
	public String saveuser(User u) {
		String sql1 = "select * from financetrackinguser where ukaname = ?";
		Object[] args = {u.getUkaname()};
		try {
			User r = jdbctemplate.queryForObject(sql1,args,BeanPropertyRowMapper.newInstance(User.class));
			if(r != null) {
				return "Enter another UserName";
			}
		}catch(Exception e) {
			String updatedString = Hashing.sha256().hashString(u.getUkapass(),StandardCharsets.UTF_8).toString();
			u.setUkapass(updatedString);			
		    String sql = "insert into financetrackinguser(userid,ukaname,ukapass,ukafullname,ukagoal,ukaphone,ukaemail) values (ECOM_USER_SEQ.NEXTVAL,:ukaname,:ukapass,:ukafullname,:ukagoal,:ukaemail)";
			BeanPropertySqlParameterSource d = new BeanPropertySqlParameterSource(u);
			NamedParameterJdbcTemplate temp = new NamedParameterJdbcTemplate(jdbctemplate);
			if(temp.update(sql,d) == 0) {
				return "Not Inserted Contact Admin";
			}
			return "Successfully Inserted";
		}
		return "Nothing";
	}
	
	public List<Record> getr(String u){
		String sql = "select serialno,details,amount,dcategory,ttype,tdate from financedetails where usename = \'"+u+"\' order by tdate";
		List<Record> temp = jdbctemplate.query(sql,BeanPropertyRowMapper.newInstance(Record.class));
		
		if(temp.isEmpty()) {
			return null;
		}else {
			return temp;
		}
	}
	
	public String savedetail(Storerecord d) {
		String sql = "insert into financedetails (SERIALNO,USENAME,DETAILS,AMOUNT,DCATEGORY,TTYPE,TDATE) values (FINANCE_DETAILS_SEQ.NEXTVAL,:usename,:details,:amount,:dcategory,:ttype,TO_DATE(:tdate,'YYYY-MM-DD'))";
		BeanPropertySqlParameterSource data = new BeanPropertySqlParameterSource(d);
		NamedParameterJdbcTemplate temp = new NamedParameterJdbcTemplate(jdbctemplate);
		if(temp.update(sql,data) == 0) {
			return "Not Inserted Record";
		}		
		return "Successfully Inserted Data";
	}
	
	public String deletetran(int n) {
		String sql = "delete from financedetails where serialno ="+n;
		if(jdbctemplate.update(sql) == 0) {
			return "Some Problem Occurred while deleting transaction";
		}
		
		return "Successfully Deleted";
	}
	
	public String editdetail(Storerecord d) {
		String sql = "update financedetails set DETAILS=:details,AMOUNT=:amount,DCATEGORY=:dcategory,TTYPE=:ttype,TDATE=TO_DATE(:tdate,'YYYY-MM-DD') where usename=:usename and serialno = :serialno";
		BeanPropertySqlParameterSource data = new BeanPropertySqlParameterSource(d);
		NamedParameterJdbcTemplate temp = new NamedParameterJdbcTemplate(jdbctemplate);
		if(temp.update(sql,data) == 0) {
			return "Not Edited Record";
		}		
		return "Successfully Edited Data";
	}
	
	public Det fetchdet(String u) {
		String sql = "select ukagoal from financetrackinguser where ukaname=\'"+u+"\'";
		String sql1 = "SELECT (select sum(amount) from financedetails where usename=\'"+u+"\' and ttype='Credit') - (select  sum(amount) from financedetails where usename=\'"+u+"\' and ttype ='Debit') as DIFF from dual";
		Double resgoal = 0.0;
		Double resamt = 0.0;
		resgoal = jdbctemplate.queryForObject(sql,Double.class);
		resamt = jdbctemplate.queryForObject(sql1,Double.class);
		return new Det(resgoal,resamt);
	}
	
	
	public String setting(User u) {
		String sql = "update financetrackinguser set ukagoal ="+u.getUkagoal()+",ukafullname= \'"+u.getUkafullname()+"\',ukaphone=\'"+u.getUkaphone()+"\',ukaemail=\'"+u.getUkaemail()+"\' where ukaname=\'"+u.getUkaname()+"\'";
		if(jdbctemplate.update(sql) == 0) {
			return "Not Updated";
		}
		
		return "Updated Successfully";
	}
	
	public User fetchd(String uname) {
		String sql = "select ukafullname,ukaphone,ukaemail from financetrackinguser where ukaname =\'"+uname+"\'";
		User u = jdbctemplate.queryForObject(sql, BeanPropertyRowMapper.newInstance(User.class));
		
		return u;
	}
	
	public List<Record> filtereddate(Filter f){
		String sql = "select serialno,details,amount,dcategory,ttype,tdate from financedetails where usename=\'"+f.getUsername()+"\' and (tdate between TO_DATE(\'"+f.getSdate()+"\','YYYY-MM-DD') and  TO_DATE(\'"+f.getEdate()+"\','YYYY-MM-DD'))";
		List<Record> res = new ArrayList<>();
		res = jdbctemplate.query(sql,BeanPropertyRowMapper.newInstance(Record.class));
		return res;
	}
	
	public User pdetails(String uname){
		String sql = "select ukafullname,ukaname,ukaphone,ukaemail,ukagoal from financetrackinguser where ukaname=\'"+uname+"\'";
		User res = jdbctemplate.queryForObject(sql,BeanPropertyRowMapper.newInstance(User.class));
		return res;
	}
	
}
