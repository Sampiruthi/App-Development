package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.demo.model.Signup;
import com.example.demo.repository.SignupRepo;

import java.util.List;
import java.util.Optional;

@Service
public class SignupService implements UserDetailsService {

    @Autowired
    private SignupRepo userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Signup user = userRepository.findByEmail(email);
        if (user != null) {
            var springUser = User.withUsername(user.getEmail())
                                 .password(user.getPassword())
                                 .roles(user.getRole())  // Adding role to the UserDetails
                                 .build();
            
            return springUser;
        }
        throw new UsernameNotFoundException("User not found with email: " + email);
    }

    public Signup saveUser(Signup user) {
        return userRepository.save(user);
    }

    public List<Signup> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<Signup> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public boolean userExists(String email) {
        return userRepository.existsByEmail(email);
    }

    public Signup validateUser(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password).orElse(null);
    }
}
