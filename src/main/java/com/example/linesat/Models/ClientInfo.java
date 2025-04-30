package com.example.linesat.Models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Entity
@Table(name="client_info")
public class ClientInfo {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(unique = true)
        private String email;
        private String firstName;
        private String lastName;
        private String country;
        private String city;
        private String phone;
        @Column(name = "order_count")
        private int orderCount = 0;
    }

