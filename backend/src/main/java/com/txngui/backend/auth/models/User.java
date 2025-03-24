package com.txngui.backend.auth.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "users")  // Collection MongoDB "users"
public class User {
    /**
     * The class User is a model class that represents a user in the application.
     */

    @Id
    private String id;
    private String username;
    private String password;
    private String role = "USER"; // default role
    @Field("email")
    private String email;

    /**
     * constructor without parameters
     */
    public User() {}

    /**
     * Constructor with parameters
     * @param username username of the user
     * @param password password of the user
     */
    public User(String username, String email, String password) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    /**
     * Getter of the id of the user
     * @return the id of the user
     */
    public String getId() { return id; }

    /**
     * Setter of the id of the user
     * @param id the id of the user
     */
    public void setId(String id) { this.id = id; }

    /**
     * Getter of the username of the user
     * @return the username of the user
     */
    public String getUsername() { return username; }

    /**
     * Setter of the username of the user
     * @param username the username of the user
     */
    public void setUsername(String username) { this.username = username; }

    /**
     * Getter of the password of the user
     * @return the password of the user
     */
    public String getPassword() { return password; }

    /**
     * Setter of the password of the user
     * @param password the password of the user
     */
    public void setPassword(String password) { this.password = password; }

    /**
     * Getter of the role of the user
     * @return the role of the user
     */
    public String getRole() { return role; }

    /**
     * Setter of the role of the user
     * @param role the role of the user
     */
    public void setRole(String role) { this.role = role; }

    /**
     * Getter of the email of the user
     * @return the email of the user
     */
    public String getEmail() {
        return email;
    }

    /**
     * Setter of the email of the user
     * @param email the email of the user
     */
    public void setEmail(String email) {
        this.email = email;
    }
    /**
     * toString is used to display the user object in a readable format
     * @return a string representation of the user object
     */
    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", role='" + role + '\'' +
                ", mail=" + email + '\'' +
                '}';
    }


}