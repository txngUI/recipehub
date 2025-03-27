package com.txngui.backend.user.controller;

import com.txngui.backend.user.models.User;
import com.txngui.backend.auth.security.JwtUtil;
import com.txngui.backend.user.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    /**
     * Récupérer les informations de l'utilisateur actuellement connecté.
     */
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser(@RequestHeader("Authorization") String token) {
        // Supprimer le préfixe "Bearer " du token
        String jwt = token.replace("Bearer ", "");

        // Extraire le nom d'utilisateur du token
        String username = jwtUtil.extractUsername(jwt);

        // Rechercher l'utilisateur dans la base de données
        Optional<User> user = userService.findByUsername(username);

        System.out.println("JWT reçu : " + jwt);
        System.out.println("Nom d'utilisateur extrait : " + username);

        System.out.println("Recherche utilisateur pour : " + user);

        // Vérifier si l'utilisateur existe et retourner une réponse adaptée
        return user.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build()); // Retourne 404 sans body
    }
}
