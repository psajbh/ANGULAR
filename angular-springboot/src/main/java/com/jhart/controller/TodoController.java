package com.jhart.controller;

import java.net.URI;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.jhart.model.Todo;
import com.jhart.service.TodoHardcodedService;

@CrossOrigin(origins="http://localhost:4200")
@RestController
public class TodoController {
    private final Logger log = LoggerFactory.getLogger(this.getClass());
    private final TodoHardcodedService todoService;
    
    public TodoController(TodoHardcodedService todoService) {
        this.todoService = todoService;
    }
    
    @GetMapping("/users/{username}/todos")
    public List<Todo> getAllTodos(@PathVariable String username){
        log.debug("getAllTodos -  username: " + username);
        return todoService.findAll();
    }
    
    @GetMapping("/users/{username}/todos/{id}")
    public Todo getTodo(@PathVariable String username, @PathVariable long id){
        log.debug("getTodo  -  username: " + username + " id: " + id);
        return todoService.findById(id);
    }

    @DeleteMapping("/users/{username}/todos/{id}")
    public ResponseEntity<Void> deleteTodo(
            @PathVariable String username,
            @PathVariable long id){
        
        Todo todo = todoService.deleteById(id);
        log.debug("deleteTodo  -  username: " + username + " id: " + id);
        if (null != todo) {
            log.debug("deleteTodo  -  deleteTodo: " + todo.toString());
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
    
    @PutMapping("/users/{username}/todos/{id}")
    public ResponseEntity<Todo> updateTodo(
            @PathVariable String username,
            @PathVariable long id,
            @RequestBody Todo todo){
        Todo todoUpdated = todoService.save(todo);
        log.debug("updateTodo - username " + username + " id: " + id +  " todo: "  + todo.toString());
        return new ResponseEntity<Todo>(todoUpdated, HttpStatus.OK);
    }

    @PostMapping("/users/{username}/todos/")
    public ResponseEntity<Void> createTodo(
            @PathVariable String username,
            @RequestBody Todo todo){
        log.debug("createTodo - username " + username + " todo: "  + todo.toString());
        Todo createdTodo  = todoService.save(todo);
        
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").
                buildAndExpand(createdTodo.getId()).toUri();
        log.debug("uri: " + uri);
        
        ResponseEntity<Void>  re = ResponseEntity.created(uri).build();
        
        return re;
        //return ResponseEntity.created(uri).build();
    }
    

}
