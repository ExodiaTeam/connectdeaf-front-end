package com.connectdeaf.repository;

import java.util.UUID;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.connectdeaf.model.User;

public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findById(UUID id);
}
