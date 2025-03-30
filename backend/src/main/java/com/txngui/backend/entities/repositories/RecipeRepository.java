package com.txngui.backend.entities.repositories;

import com.txngui.backend.entities.models.Recipe;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeRepository extends MongoRepository<Recipe, String> {
    List<Recipe> findByCreatedBy(String userId);
}