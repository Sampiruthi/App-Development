// package com.example.demo.controller;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import com.example.demo.model.Payment;
// import com.example.demo.service.PaymentService;


// @RestController
// @RequestMapping("/api/payments")
// public class PaymentController {

//     @Autowired
//     private PaymentService paymentService;
//     @PostMapping("/post")
//     public ResponseEntity<Payment> createPayment(@RequestBody Payment payment) {
//         Payment createdPayment = paymentService.savePayment(payment);
//         return ResponseEntity.ok(createdPayment);
//     }

//     @GetMapping("/{id}")
//     public ResponseEntity<Payment> getPaymentById(@PathVariable int id) {
//         Payment payment = paymentService.getPaymentById(id);
//         return ResponseEntity.ok(payment);
//     }
// }
package com.example.demo.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.model.Booking;
import com.example.demo.model.Payment;
import com.example.demo.service.BookingService;
import com.example.demo.service.PaymentService;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private BookingService bookingService;

    @PostMapping("/post")
    public ResponseEntity<Payment> createPayment(@RequestBody Payment payment) {
        Payment createdPayment = paymentService.savePayment(payment);
        
        Booking booking = bookingService.getBookingById(payment.getBookingId());
        booking.setPaymentStatus("Paid");
        bookingService.updateBooking(booking);

        return ResponseEntity.ok(createdPayment);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Payment> getPaymentById(@PathVariable int id) {
        Payment payment = paymentService.getPaymentById(id);
        return ResponseEntity.ok(payment);
    }
}