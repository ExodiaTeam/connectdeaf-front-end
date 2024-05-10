package com.connectdeaf.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.connectdeaf.model.Professional;
import com.connectdeaf.repository.ProfessionalRepository;

@Service
public class ProfessionalService {
    @Autowired
    ProfessionalRepository professionalRepository;

    public Professional createProfessional(Professional professional) {
        professionalRepository.findById(professional.getId()).ifPresent(professionalEntity -> {
            throw new RuntimeException("Profissional já cadastrado.");
        });

        return professionalRepository.save(professional);
    }
}