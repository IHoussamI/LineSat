package com.example.linesat.DTOs;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class OrderRequest {

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    private String country;
    private String city;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[0-9+ ]{7,15}$", message = "Invalid phone number")
    private String phone;

    private Long selectedPlanId;
}

