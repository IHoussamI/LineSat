package com.example.linesat.Controllers;

import com.example.linesat.DTOs.FreeTrialRequestDTO;
import com.example.linesat.Models.FreeTrialRequest;
import com.example.linesat.Respositories.FreeTrialRequestRepository;
import com.example.linesat.Services.FreeTrialRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/free-trial")
@CrossOrigin(
        origins = {
                "http://localhost:4200",          // Local development
                "https://line-sat.com",           // Production
                "https://www.line-sat.com",
                "http://159.100.17.112",
                "https://159.100.17.112"
        })

public class FreeTrialRequestController {

    @Autowired
    private FreeTrialRequestService freeTrialRequestService;
    @Autowired
    private FreeTrialRequestRepository freeTrialRequestRepository;

    @PostMapping("/request")
    public ResponseEntity<?> requestFreeTrial(@RequestBody FreeTrialRequestDTO requestDTO) {
        try {
            FreeTrialRequest request = freeTrialRequestService.createFreeTrialRequest(
                    requestDTO.getEmail(),
                    requestDTO.getFirstName(),
                    requestDTO.getWhatsappNumber(),
                    requestDTO.getCountry()
            );

            // Skip the verification email step temporarily
            // freeTrialRequestService.sendVerificationEmail(requestDTO.getEmail(), requestDTO.getFirstName());

            return ResponseEntity.ok(request);
        } catch (RuntimeException e) {
            Map<String, String> errorResponse = new HashMap<>();

            String errorMessage = e.getMessage();
            String errorCode = null;

            if (errorMessage.contains("Email already in use")) {
                errorCode = "EMAIL_EXISTS";
            } else if (errorMessage.contains("WhatsApp number already in use")) {
                errorCode = "PHONE_EXISTS";
            }

            errorResponse.put("message", errorMessage);
            if (errorCode != null) {
                errorResponse.put("code", errorCode);
            }

            return ResponseEntity.status(HttpStatus.CONFLICT).body(errorResponse);
        }
    }

    @GetMapping()
    public ResponseEntity<List<FreeTrialRequest>> getAllTrialRequests() {
        List<FreeTrialRequest> requests = freeTrialRequestRepository.findAll();
        return ResponseEntity.ok(requests);
    }

    // Skip the verification process for now
    @GetMapping("/verify")
    public String verifyFreeTrial(@RequestParam String token) {
        return "Verification step is skipped for now.";
    }
}
