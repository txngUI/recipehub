package com.txngui.backend.auth.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")  // Collection MongoDB "users"
public class User {

    @Id
    private String id;
    private String username;
    private String password;
    private String role = "USER"; // Par défaut, tous les utilisateurs sont "USER"

    public User() {}

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    // Getters et Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    // Ajoute la méthode toString()
    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", role='" + role + '\'' +
                '}';
    }
}