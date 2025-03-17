package com.txngui.backend.auth.controllers;

import com.txngui.backend.auth.models.User;
import com.txngui.backend.auth.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        return ResponseEntity.ok(userService.register(user));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        Optional<User> authenticatedUser = userService.login(user.getUsername(), user.getPassword());
        if (authenticatedUser.isPresent()) {
            return ResponseEntity.ok(authenticatedUser.get());
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }

    @GetMapping("/test")  // Test si un utilisateur connecté peut accéder à cette route
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Vous êtes connecté !");
    }
}
