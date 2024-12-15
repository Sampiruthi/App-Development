package com.example.demo.service;

import com.example.demo.model.AddEvent;
import com.example.demo.repository.AddEventRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AddEventService {

    @Autowired
    private AddEventRepo r;

    public List<AddEvent> getAllEvents() {
        return r.findAll();
    }

    public Optional<AddEvent> getEventById(int eventId) {
        return r.findById(eventId);
    }

    public AddEvent addEvent(AddEvent event) {
        return r.save(event);
    }

    public AddEvent updateEvent(AddEvent event) {
        return r.save(event);
    }

    public void deleteEvent(int eventId) {
        r.deleteById(eventId);
    }
}
