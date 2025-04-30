package com.example.linesat.Models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;


@Getter
@Setter
@Entity
@Table(name="orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "client_id")
    private ClientInfo clientInfo;


    @ManyToOne
    @JoinColumn(name = "plan_id")
    private IptvPlan selectedPlan;
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime orderDate;}
