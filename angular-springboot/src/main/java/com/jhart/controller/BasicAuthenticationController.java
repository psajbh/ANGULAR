package com.jhart.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jhart.model.AuthenticationBean;


@CrossOrigin(origins="http://localhost:4200")
@RestController
public class BasicAuthenticationController {
    private final Logger log = LoggerFactory.getLogger(this.getClass());
    
    @GetMapping(path = "/basicAuth")
    public AuthenticationBean authenticate() {
        log.debug("authenticate: request authenticated!!!");
        return new AuthenticationBean("You are authenticated");
    }
    

}
