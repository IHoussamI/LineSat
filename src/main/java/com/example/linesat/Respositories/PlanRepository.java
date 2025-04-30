package com.example.linesat.Respositories;

import com.example.linesat.Models.IptvPlan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlanRepository extends JpaRepository<IptvPlan, Long> {

}
