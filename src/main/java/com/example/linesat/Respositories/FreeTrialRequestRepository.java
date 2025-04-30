package com.example.linesat.Respositories;

import com.example.linesat.Models.FreeTrialRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FreeTrialRequestRepository extends JpaRepository<FreeTrialRequest, Long> {
    FreeTrialRequest findByEmail(String email);


    FreeTrialRequest findByWhatsappNumber(Long whatsappNumber);
}
