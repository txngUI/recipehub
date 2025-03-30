package com.txngui.backend.entities.services;

import com.txngui.backend.entities.models.Recipe;
import com.txngui.backend.entities.repositories.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipeService {
    @Autowired
    private RecipeRepository recipeRepository;

    public Recipe createRecipe(Recipe recipe) {
        return recipeRepository.save(recipe);
    }

    public List<Recipe> getRecipesByUser(String userId) {
        return recipeRepository.findByCreatedBy(userId);
    }
}