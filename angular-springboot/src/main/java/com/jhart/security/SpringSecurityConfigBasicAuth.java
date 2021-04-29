package com.jhart.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SpringSecurityConfigBasicAuth extends WebSecurityConfigurerAdapter {
    private final Logger log = LoggerFactory.getLogger(this.getClass());
    
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        log.debug("Using default configure(HttpSecurity). If subclassed this will potentially override subclass configure(HttpSecurity).");
        //disable csrf for now, since we are going to use web token.
        //antMatcher on OPTIONS (preflight options are OPTIONS.  we want to permitAll on these options.
        //any url is "/**"
        
        http
            .cors().and()
            .csrf().disable()
            .authorizeRequests()
            .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
            .anyRequest().authenticated()
            //.and().formLogin()
            .and().httpBasic();
    }
}
