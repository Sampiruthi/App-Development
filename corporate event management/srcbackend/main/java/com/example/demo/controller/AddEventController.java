package com.example.demo.controller;

import com.example.demo.model.AddEvent;
import com.example.demo.service.AddEventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/events")
public class AddEventController {

    @Autowired
    private AddEventService s;

    @GetMapping("/getall")
    public List<AddEvent> getAllEvents() {
        return s.getAllEvents();
    }
    @PostMapping("/post")
    public ResponseEntity<AddEvent> addEvent(@RequestBody AddEvent event) {
        AddEvent savedEvent = s.addEvent(event);
        return ResponseEntity.status(HttpStatus.OK).body(savedEvent);
    }
    @PutMapping("/put/{id}")
    public ResponseEntity<AddEvent> updateEvent(@PathVariable int id, @RequestBody AddEvent eventDetails) {
        Optional<AddEvent> event = s.getEventById(id);
        if (event.isPresent()) {
            AddEvent updatedEvent = event.get();
            updatedEvent.setDescription(eventDetails.getDescription());
            updatedEvent.setImageUrl(eventDetails.getImageUrl());
            return ResponseEntity.ok(s.updateEvent(updatedEvent));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable int id) {
        if (s.getEventById(id).isPresent()) {
            s.deleteEvent(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}