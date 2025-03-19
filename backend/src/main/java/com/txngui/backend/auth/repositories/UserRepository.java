package com.txngui.backend.auth.repositories;

import com.txngui.backend.auth.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    /**
     * Find a user by username
     * @param username the username
     * @return the user
     */
    Optional<User> findByUsername(String username);
}