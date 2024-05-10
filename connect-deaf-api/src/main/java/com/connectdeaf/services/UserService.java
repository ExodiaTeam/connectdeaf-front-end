package com.connectdeaf.services;

import java.util.UUID;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.connectdeaf.model.User;
import com.connectdeaf.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public Optional<User> findById(UUID id) {
        return this.userRepository.findById(id);
    }

    public User createUser(User user) {
        this.userRepository.findById(user.getId()).ifPresent(userEntity -> {
            throw new RuntimeException("Usuário já cadastrado.");
        });

        return this.userRepository.save(user);
    }
}
