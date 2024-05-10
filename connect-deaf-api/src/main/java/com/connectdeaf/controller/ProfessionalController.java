package com.connectdeaf.controller;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.connectdeaf.model.Professional;
import com.connectdeaf.services.ProfessionalService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("api/professionals")
public class ProfessionalController {
    @Autowired
    private ProfessionalService professionalService;

    @PostMapping("/")
    public ResponseEntity<Object> createProfessional(@Valid @RequestBody Professional professional) {
        try {
            return ResponseEntity.ok(this.professionalService.createProfessional(professional));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Professional> getProfessional(@PathVariable UUID id) {
        return this.professionalService.findById(id)
                .map(professional -> ResponseEntity.ok().body(professional))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Professional> updateProfessional(@PathVariable UUID id,
            @Valid @RequestBody Professional professional) {
        return this.professionalService.updateProfessional(id, professional)
                .map(updatedProfessional -> ResponseEntity.ok().body(updatedProfessional))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProfessional(@PathVariable UUID id) {
        Optional<Professional> professionalOptional = this.professionalService.findById(id);
        if (professionalOptional.isPresent()) {
            this.professionalService.deleteProfessional(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
