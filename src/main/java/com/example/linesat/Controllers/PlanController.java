package com.example.linesat.Controllers;

import com.example.linesat.Models.IptvPlan;
import com.example.linesat.Services.IptvPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/plans")
public class PlanController {

    @Autowired
    private IptvPlanService planService;

    @GetMapping("/public")
    public List<IptvPlan> getPublicPlans() {
        return planService.getAllPlans();
    }
}