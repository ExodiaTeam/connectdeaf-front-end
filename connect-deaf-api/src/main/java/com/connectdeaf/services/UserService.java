package com.connectdeaf.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.connectdeaf.model.User;
import com.connectdeaf.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User createUser(User user) {
        this.userRepository.findByUsernameOrEmail(
                user.getName(),
                user.getEmail()).ifPresent(userEntity -> {
                    throw new RuntimeException("Usuário já cadastrado.");
                });

        return this.userRepository.save(user);
    }
}
