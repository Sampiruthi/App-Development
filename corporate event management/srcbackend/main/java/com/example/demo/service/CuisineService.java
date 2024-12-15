// package com.example.demo.service;

// import com.example.demo.model.Cuisine;
// import com.example.demo.repository.CuisineRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import java.util.List;
// import java.util.Optional;

// @Service
// public class CuisineService {

//     @Autowired
//     private CuisineRepository cuisineRepository;

//     public List<Cuisine> getAllCuisines() {
//         return cuisineRepository.findAll();
//     }

//     public Optional<Cuisine> getCuisineById(Long id) {
//         return cuisineRepository.findById(id).orElse(null);
//     }

//     public Cuisine saveCuisine(Cuisine cuisine) {
//         return cuisineRepository.save(cuisine);
//     }
//     public Cuisine updateCuisine(Cuisine updatedCuisine) {
//         return cuisineRepository.save(updatedCuisine);
//     }
//     public void deleteCuisine(Long id) {
//         cuisineRepository.deleteById(id);
//     }
// }
package com.example.demo.service;

import com.example.demo.model.Cuisine;
import com.example.demo.repository.CuisineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CuisineService {

    @Autowired
    private CuisineRepository cuisineRepository;

    public List<Cuisine> getAllCuisines() {
        return cuisineRepository.findAll();
    }

    public Optional<Cuisine> getCuisineById(Long id) {
        return cuisineRepository.findById(id);
    }

    public Cuisine saveCuisine(Cuisine cuisine) {
        return cuisineRepository.save(cuisine);
    }

    public void deleteCuisine(Long id) {
        cuisineRepository.deleteById(id);
    }
}
