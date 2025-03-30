package com.txngui.backend.entities.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "recipes")
public class Recipe {
    @Id
    private String id;
    private String name;
    private String description;
    private String image;

    @DBRef
    private String createdBy;

    @DBRef
    private String folderId;

    private List<Ingredient> ingredients;
    private List<String> steps;
    private String category;
    private LocalDateTime createdAt = LocalDateTime.now();

}