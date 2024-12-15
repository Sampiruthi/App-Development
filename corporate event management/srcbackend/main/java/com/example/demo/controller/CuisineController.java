package com.example.demo.controller;
import com.example.demo.model.Cuisine;
import com.example.demo.service.CuisineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cuisines")
public class CuisineController {

    @Autowired
    private CuisineService s;

    @GetMapping("/getall")
    public List<Cuisine> getAllCuisines() {
        return s.getAllCuisines();
    }
    
    @PostMapping("/post")
    public ResponseEntity<Cuisine> createCuisine(@RequestBody Cuisine cuisine) {
        Cuisine savedCuisine = s.saveCuisine(cuisine);
        return ResponseEntity.ok(savedCuisine);
    }

    @PutMapping("/put/{id}")
    public ResponseEntity<Cuisine> updateCuisine(@PathVariable Long id, @RequestBody Cuisine updatedDetails) {
        Optional<Cuisine> existingCuisineOpt = s.getCuisineById(id);
        if (existingCuisineOpt.isPresent()) {
            Cuisine existingCuisine = existingCuisineOpt.get();
            existingCuisine.setCuisineName(updatedDetails.getCuisineName());
            existingCuisine.setDescription(updatedDetails.getDescription());
            existingCuisine.setPackagePrice(updatedDetails.getPackagePrice());
            existingCuisine.setImageUrl(updatedDetails.getImageUrl());
            Cuisine updatedCuisine = s.saveCuisine(existingCuisine);
            return ResponseEntity.ok(updatedCuisine);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCuisine(@PathVariable Long id) {
        s.deleteCuisine(id);
        return ResponseEntity.noContent().build();
    }
}