package com.tracking;

import java.nio.charset.StandardCharsets;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


import com.google.common.hash.Hashing;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class RealController {
	
	@Autowired
	private Overalldao od;
	
	@Autowired
	private Token token;
	
	@PostMapping("/signup")
	public ResponseEntity<?> register(@RequestBody User u){
		return ResponseEntity.ok(od.saveuser(u));			
	}
	
	@PostMapping("/signin")
	public ResponseEntity<?> login(@RequestBody User u){
		String updatedString = Hashing.sha256().hashString(u.getUkapass(),StandardCharsets.UTF_8).toString();
		u.setUkapass(updatedString);
		User r = od.getBycredentials(u.getUkaname(),u.getUkapass());
		if(r == null){
			return ResponseEntity.ok("Incorrect Credentials");
		}
		String temp = r.getUkaname();
		var res = token.generateAccessToken(temp);
		return ResponseEntity.ok(res);
	}
	
	@PostMapping("/getrecord")
	public ResponseEntity<?> records(@RequestBody String uname){
		return ResponseEntity.ok(od.getr(uname));
	}
	
	@PostMapping("/saverecord")
	public ResponseEntity<?> savedetail(@RequestBody Storerecord r){
		return ResponseEntity.ok(od.savedetail(r));
	}
	
	@DeleteMapping("/deleterecord")
	public ResponseEntity<?> deletetran(@RequestBody int id){
		return ResponseEntity.ok(od.deletetran(id));
	}
	
	@PutMapping("/editrecord")
	public ResponseEntity<?> editr(@RequestBody Storerecord r){
		return ResponseEntity.ok(od.editdetail(r));
	}
	
	@PostMapping("/fetchdet")
	public ResponseEntity<?> fetchg(@RequestBody String u){
		return ResponseEntity.ok(od.fetchdet(u));
	}
	
	@PostMapping("/fetchudetails")
	public ResponseEntity<?> fetchfn(@RequestBody String u){
		return ResponseEntity.ok(od.fetchd(u));
	}
	
	@PostMapping("/settingchange")
	public ResponseEntity<?> setg(@RequestBody User u){
		return ResponseEntity.ok(od.setting(u));		
	}
	
	@PostMapping("/filteringdata")
	public ResponseEntity<?> filterdata(@RequestBody Filter f){		
		return ResponseEntity.ok(od.filtereddate(f));
	}
	
	@PostMapping("/fetchuserdetails")
	public ResponseEntity<?> fud(@RequestBody String u){
		return ResponseEntity.ok(od.pdetails(u));
	}
	
}
