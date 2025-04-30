package com.example.linesat.Controllers;

import com.example.linesat.Models.FreeTrialRequest;
import com.example.linesat.Models.IptvPlan;
import com.example.linesat.Models.Order;
import com.example.linesat.Respositories.FreeTrialRequestRepository;
import com.example.linesat.Respositories.OrderRepository;
import com.example.linesat.Services.IptvPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private IptvPlanService planService;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private FreeTrialRequestRepository freeTrialRequestRepository;

    @GetMapping("/plans")
    public List<IptvPlan> getAllPlans() {
        return planService.getAllPlans();
    }

    @GetMapping("/free-trial")
    public ResponseEntity<List<FreeTrialRequest>> getAllTrialRequests() {
        List<FreeTrialRequest> requests = freeTrialRequestRepository.findAll();
        return ResponseEntity.ok(requests); // Properly wraps the list in a 200 OK response
    }

    @GetMapping("/orders")
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}
