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

    public Optional<User> updateUser(UUID id, User user) {
        return this.userRepository.findById(id)
                .map(existingUser -> {
                    existingUser.setName(user.getName());
                    existingUser.setEmail(user.getEmail());
                    existingUser.setPassword(user.getPassword());
                    existingUser.setPhoneNumber(user.getPhoneNumber());
                    existingUser.setAddresses(user.getAddresses());
                    existingUser.setCreatedAt(user.getCreatedAt());

                    return this.userRepository.save(existingUser);
                });
    }

    public void deleteUser(UUID id) {
        this.userRepository.findById(id).ifPresent(user -> {
            this.userRepository.delete(user);
        });
    }
}
