package com.example.linesat.DTOs;

import lombok.Data;

@Data
public class FreeTrialRequestDTO {
    private String email;
    private String firstName;
    private String country;
    private Long whatsappNumber;
}