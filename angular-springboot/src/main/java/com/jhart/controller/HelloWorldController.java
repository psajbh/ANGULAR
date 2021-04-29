package com.jhart.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.jhart.model.HelloWorldBean;


@CrossOrigin(origins="http://localhost:4200")
@RestController

public class HelloWorldController {
    private final Logger log = LoggerFactory.getLogger(this.getClass());
    
    
    @GetMapping("/hello-world")
    public String helloWorld() {
        log.debug("helloWorld");
        return "Hello World";
    }
    
    @GetMapping("/hello-world-bean")
    public HelloWorldBean helloWorldBean() {
        log.debug("helloWorldBean accessed");
        long ms = System.currentTimeMillis();
        return new HelloWorldBean("Hello World - " + ms);
        //throw new RuntimeException("Exception happened, please contact support at 123-45-6789"); //test frontend handling exception
    }
    
    @GetMapping(path = "/hello-world-bean/path-variable/{name}")
    public HelloWorldBean helloWorldPathVariable(@PathVariable String name) {
        log.debug("helloWorldPathVariable name: " +name);
        return new HelloWorldBean(String.format("Hello World, %s", name));
    }
    

}
