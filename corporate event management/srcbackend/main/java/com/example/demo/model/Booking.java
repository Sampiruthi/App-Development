// package com.example.demo.model;
// import java.time.LocalDate;
// import java.time.LocalTime;

// import jakarta.persistence.Entity;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;

// @Entity
// public class Booking {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     private Long userId; 

//     private String name;
//     private String email;
//     private String company;
//     private String eventName;
//     private String venue;
//     private String cuisine;
//     private LocalDate date;
//     private LocalTime startTime;
//     private LocalTime endTime;
//     private int attendees;
//     private double fullPackage;
//     private String requests;
//     public Booking() {
//     }
//     public Booking(Long id, Long userId, String name, String email, String company, String venue, String eventName,
//             String cuisine, LocalDate date, LocalTime startTime, LocalTime endTime, int attendees, double fullPackage,String requests) {
//         this.id = id;
//         this.userId = userId;
//         this.name = name;
//         this.email = email;
//         this.company = company;
//         this.venue = venue;
//         this.eventName = eventName;
//         this.cuisine = cuisine;
//         this.date = date;
//         this.startTime = startTime;
//         this.endTime = endTime;
//         this.attendees = attendees;
//         this.fullPackage = fullPackage;
//         this.requests = requests;
//     }
//     public double getFullPackage() {
//         return fullPackage;
//     }
//     public void setFullPackage(double fullPackage) {
//         this.fullPackage = fullPackage;
//     }
//     public Long getId() {
//         return id;
//     }
//     public void setId(Long id) {
//         this.id = id;
//     }
//     public Long getUserId() {
//         return userId;
//     }
//     public void setUserId(Long userId) {
//         this.userId = userId;
//     }
//     public String getName() {
//         return name;
//     }
//     public void setName(String name) {
//         this.name = name;
//     }
//     public String getEmail() {
//         return email;
//     }
//     public void setEmail(String email) {
//         this.email = email;
//     }
//     public String getCompany() {
//         return company;
//     }
//     public void setCompany(String company) {
//         this.company = company;
//     }
//     public String getVenue() {
//         return venue;
//     }
//     public void setVenue(String venue) {
//         this.venue = venue;
//     }
//     public String getEventName() {
//         return eventName;
//     }
//     public void setEventName(String eventName) {
//         this.eventName = eventName;
//     }
//     public String getCuisine() {
//         return cuisine;
//     }
//     public void setCuisine(String cuisine) {
//         this.cuisine = cuisine;
//     }
//     public LocalDate getDate() {
//         return date;
//     }
//     public void setDate(LocalDate date) {
//         this.date = date;
//     }
//     public LocalTime getStartTime() {
//         return startTime;
//     }
//     public void setStartTime(LocalTime startTime) {
//         this.startTime = startTime;
//     }
//     public LocalTime getEndTime() {
//         return endTime;
//     }
//     public void setEndTime(LocalTime endTime) {
//         this.endTime = endTime;
//     }
//     public int getAttendees() {
//         return attendees;
//     }
//     public void setAttendees(int attendees) {
//         this.attendees = attendees;
//     }
//     public String getRequests() {
//         return requests;
//     }
//     public void setRequests(String requests) {
//         this.requests = requests;
//     }
    
// }
package com.example.demo.model;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId; 

    private String name;
    private String email;
    private String company;
    private String eventName;
    private String venue;
    private String cuisine;
    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;
    private int attendees;
    private double fullPackage;
    private String requests;
    
    private String paymentStatus; // New field to track payment status

    public Booking() {
    }

    public Booking(Long id, Long userId, String name, String email, String company, String venue, String eventName,
                   String cuisine, LocalDate date, LocalTime startTime, LocalTime endTime, int attendees,
                   double fullPackage, String requests, String paymentStatus) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.company = company;
        this.venue = venue;
        this.eventName = eventName;
        this.cuisine = cuisine;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.attendees = attendees;
        this.fullPackage = fullPackage;
        this.requests = requests;
        this.paymentStatus = paymentStatus;
    }

    public double getFullPackage() {
        return fullPackage;
    }

    public void setFullPackage(double fullPackage) {
        this.fullPackage = fullPackage;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getVenue() {
        return venue;
    }

    public void setVenue(String venue) {
        this.venue = venue;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public String getCuisine() {
        return cuisine;
    }

    public void setCuisine(String cuisine) {
        this.cuisine = cuisine;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }

    public int getAttendees() {
        return attendees;
    }

    public void setAttendees(int attendees) {
        this.attendees = attendees;
    }

    public String getRequests() {
        return requests;
    }

    public void setRequests(String requests) {
        this.requests = requests;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }
}
