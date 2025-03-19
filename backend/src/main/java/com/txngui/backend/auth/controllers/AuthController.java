package com.txngui.backend.auth.controllers;

import com.txngui.backend.auth.security.JwtUtil;
import com.txngui.backend.auth.models.User;
import com.txngui.backend.auth.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;

// allow requests from the frontend
@CrossOrigin(origins = "http://localhost:4200")

// define the base path
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    /**
     * The AuthController class is a REST controller that handles the authentication requests.
     */

    // inject the userService
    @Autowired
    private UserService userService;

    // inject the jwtUtil
    @Autowired
    private JwtUtil jwtUtil;

    /**
     * register a new user
     * @param user the user to register
     * @return the registered user
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        return ResponseEntity.ok(userService.register(user));
    }

    /**
     * login a user
     * @param user the user to login
     * @return the token if the user is authenticated
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {

        // check if the user is authenticated
        Optional<User> authenticatedUser = userService.login(user.getUsername(), user.getPassword());

        // if the user is authenticated, generate a token
        if (authenticatedUser.isPresent()) {
            String token = jwtUtil.generateToken(authenticatedUser.get().getUsername());

            // return the token
            return ResponseEntity.ok().body(Map.of("token", token));
        }

        // return an error message
        return ResponseEntity.status(401).body("Invalid credentials");
    }
}
