package com.jhart.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.jhart.model.Todo;

@Service
public class TodoHardcodedService {
    private final Logger log = LoggerFactory.getLogger(this.getClass());
    private static List<Todo> todos = new ArrayList<>();
    private static int idCounter = 0;
    
    static {
        todos.add(new Todo(++idCounter, "John", "Learn To Dance", new Date(), false));
        todos.add(new Todo(++idCounter, "John", "Learn about Microservices", new Date(), false));
        todos.add(new Todo(++idCounter, "John", "Learn about Angular", new Date(), false));
    }
    
    public List<Todo> findAll(){
        log.debug("findAll - ");
        return todos;
    }
    
    public Todo save(Todo todo) {
        if (todo.getId() == -1 || todo.getId()==0) {
            todo.setId(++ idCounter);
            todos.add(todo);
        }
        else {
            deleteById(todo.getId());
            todos.add(todo);
        }
        return todo;
    }
    
    public Todo deleteById(long id) {
        Todo todo = findById(id);
        if (null == todo) {
            log.debug("deleteById - failed to find todo: " + id);
            return null;
        }
         if (todos.remove(todo)) {
             log.debug("deleteById - deleted todo: " + todo.toString());
             return todo;
         }
         log.debug("deleteById - failed to delete todo");
         return null;
        
    }
    
    public Todo findById(long id) {
        for(Todo todo : todos) {
            if (todo.getId() == id) {
                return todo;
            }
        }
        return null;
    }


}
