package com.connectdeaf.repository;

import java.util.Optional;
import java.util.UUID;

import com.connectdeaf.model.Professional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfessionalRepository extends JpaRepository<Professional, UUID> {
    Optional<Professional> findById(UUID id);
}
