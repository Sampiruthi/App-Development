package com.example.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Signup {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int id;
    private String username;
    private String email;
    private String password;
    private String cpassword;
    private String role;
    public Signup() {
    }
    public Signup(String role) {
        this.role = role;
    }
    public Signup(int id, String username, String email, String password, String cpassword) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.cpassword = cpassword;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getCPassword() {
        return cpassword;
    }
    public void setConfirmPassword(String confirmPassword) {
        this.cpassword = confirmPassword;
    }
    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }
}