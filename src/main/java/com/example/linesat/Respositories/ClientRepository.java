package com.example.linesat.Respositories;

import com.example.linesat.Models.ClientInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ClientRepository extends JpaRepository<ClientInfo, String> {
    List<ClientInfo> findAll();

    Optional<ClientInfo> findByEmail(String email);

}
