// package com.example.demo.service;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import com.example.demo.exception.ResourceNotFoundException;
// import com.example.demo.model.Payment;
// import com.example.demo.repository.PaymentRepo;

// @Service
// public class PaymentService {

//     @Autowired
//     private PaymentRepo paymentRepository;

//     public Payment savePayment(Payment payment) {
//         return paymentRepository.save(payment);
//     }

//     public Payment getPaymentById(int id) {
//         return paymentRepository.findById(id)
//                 .orElseThrow(() -> new ResourceNotFoundException("Payment not found with id " + id));
//     }
// }
package com.example.demo.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Payment;
import com.example.demo.repository.PaymentRepo;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepo paymentRepository;

    public Payment savePayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    public Payment getPaymentById(int id) {
        return paymentRepository.findById(id).orElse(null);
    }
}
