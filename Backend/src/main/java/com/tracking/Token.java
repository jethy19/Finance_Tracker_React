package com.tracking;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;

@Service
public class Token {
	
	@Value("${security.secret-key}")
	private String JWT_SECRET;
	
	public String generateAccessToken(String t) {
		try {
			Algorithm algorithm = Algorithm.HMAC256(JWT_SECRET);
			return JWT.create().withSubject(t).withExpiresAt(genAccessExpirationDate()).sign(algorithm);
		} catch (JWTCreationException exception) {
			throw new JWTCreationException("Error while generating token", exception);
		}
	}
	
	public String validateToken(String token) {
		try {
			Algorithm algorithm = Algorithm.HMAC256(JWT_SECRET);
			String Testing = JWT.require(algorithm).build().verify(token).getSubject();
			return Testing;
		} catch (JWTVerificationException exception) {
			return "Token Invalid";
		}
	}
	
	private Instant genAccessExpirationDate() {
		return LocalDateTime.now().plusMinutes(20).toInstant(ZoneOffset.of("+05:30"));
	}
	

}