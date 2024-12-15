package com.example.demo.repository;

import com.example.demo.model.AddEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddEventRepo extends JpaRepository<AddEvent, Integer> {
    
}
