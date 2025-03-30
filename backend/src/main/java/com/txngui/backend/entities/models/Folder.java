package com.txngui.backend.entities.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "folders")
public class Folder {
    @Id
    private String id;
    private String name;

    @DBRef
    private String createdBy;

    @DBRef
    private List<String> recipes = new ArrayList<>();

}