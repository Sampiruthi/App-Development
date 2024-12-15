package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Venue;
import com.example.demo.service.VenueService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/venues")
public class VenueController {

    @Autowired
    private VenueService venueService;

    @GetMapping("/getall")
    public List<Venue> getAllVenues() {
        return venueService.getAllVenues();
    }

    @PostMapping("/post")
    public ResponseEntity<Venue> createVenue(@RequestBody Venue venue) {
        Venue savedVenue = venueService.addVenue(venue);
        return ResponseEntity.status(HttpStatus.OK).body(savedVenue);
    }
    @PutMapping("/put/{id}")
    public ResponseEntity<Venue> updateEvent(@PathVariable Long id, @RequestBody Venue venue) {
        Optional<Venue> event = venueService.getVenueById(id);
        if (event.isPresent()) {
            Venue updatedVenue = event.get();
            updatedVenue.setVenueName(venue.getVenueName());
            updatedVenue.setLocation(venue.getLocation());
            updatedVenue.setDescription(venue.getDescription());
            updatedVenue.setTotalPackage(venue.getTotalPackage());
            updatedVenue.setParticipantCount(venue.getParticipantCount());
            updatedVenue.setImageUrl(venue.getImageUrl());
            return ResponseEntity.ok(venueService.updateVenue(updatedVenue));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteVenue(@PathVariable Long id) {
        if (!venueService.getVenueById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        venueService.deleteVenue(id);
        return ResponseEntity.noContent().build();
    }
}
