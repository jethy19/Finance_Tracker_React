package com.tracking;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class SecurityFilter extends OncePerRequestFilter{
	
	@Autowired
	Token tokenService;
	@Autowired
	Overalldao od;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		Boolean tokeninvalid = false;
		Boolean notallowed = false;
		var token = this.recoverToken(request);
		if(token != null) {
			var login = tokenService.validateToken(token);
			var user = od.getByUser(login);
			Boolean flag = true;
			if(user != null && flag == true) {
				SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(user,null,null));				
			}else if(flag == false) {
				notallowed = true;
			}else {
				tokeninvalid = true;
			}
		}
		if(notallowed) {
			response.setStatus(HttpStatus.FORBIDDEN.value());
			response.getWriter().write("Access forbidden"); 
		}else if(tokeninvalid) {
			response.setStatus(210);
			response.getWriter().write("Token invalid");
		}else {
			filterChain.doFilter(request, response);			
		}		
	}
	
	private String recoverToken(HttpServletRequest request) {
	    var authHeader = request.getHeader("Authorization");
	    if (authHeader == null)
	      return null;
	    String tok = authHeader;
	    return tok;
	}
}