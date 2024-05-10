package com.connectdeaf.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.connectdeaf.model.Professional;
import com.connectdeaf.services.ProfessionalService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("api/professionals")
public class ProfessionalController {
    @Autowired
    private ProfessionalService professionalService;

    @PostMapping("/")
    public ResponseEntity<Object> createUser(@Valid @RequestBody Professional professional) {
        try {
            return ResponseEntity.ok(this.professionalService.createProfessional(professional));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());  
        }
    }
    
}
