package com.example.linesat.Services;

import com.example.linesat.DTOs.OrderRequest;
import com.example.linesat.Models.ClientInfo;
import com.example.linesat.Models.IptvPlan;
import com.example.linesat.Models.Order;
import com.example.linesat.Respositories.ClientRepository;
import com.example.linesat.Respositories.OrderRepository;
import com.example.linesat.Respositories.PlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
@RequiredArgsConstructor
@Service
public class OrderService {


    private final OrderRepository orderRepository;
    private final PlanRepository planRepository;
    private final ClientRepository clientRepository;


    public Order saveOrder(OrderRequest request) {
        IptvPlan plan = planRepository.findById(request.getSelectedPlanId())
                .orElseThrow(() -> new RuntimeException("Plan not found"));

        Optional<ClientInfo> clientOpt = clientRepository.findByEmail(request.getEmail());

        ClientInfo client;

        if (clientOpt.isPresent()) {
            client = clientOpt.get();
            client.setOrderCount(client.getOrderCount() + 1);
        } else {
            // 🆕 New client
            client = new ClientInfo();
            client.setEmail(request.getEmail());
            client.setFirstName(request.getFirstName());
            client.setLastName(request.getLastName());
            client.setCountry(request.getCountry());
            client.setCity(request.getCity());
            client.setPhone(request.getPhone());
            client.setOrderCount(1);
        }

        client = clientRepository.save(client); // Save or update client

        Order order = new Order();
        order.setClientInfo(client);
        order.setSelectedPlan(plan);

        return orderRepository.save(order); // Save order with linked client
    }

    public Object getAllOrders() {
        return orderRepository.findAll();
    }
}
