package com.example.linesat.Models;

import com.example.linesat.Enum.PlanType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Entity
@Table(name = "iptv_plans")
public class IptvPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String description;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private int durationMonths;

    @Column(nullable = false)
    private int freeMonths;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private PlanType type;

    @Column(nullable = false)
    private Boolean renewable;
}

