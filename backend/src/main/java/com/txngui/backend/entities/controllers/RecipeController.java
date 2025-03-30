package com.txngui.backend.entities.controllers;

import com.txngui.backend.entities.models.Recipe;
import com.txngui.backend.entities.services.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recipes")
public class RecipeController {
    @Autowired
    private RecipeService recipeService;

    @PostMapping("/create")
    public ResponseEntity<Recipe> createRecipe(@RequestBody Recipe recipe) {
        return ResponseEntity.ok(recipeService.createRecipe(recipe));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Recipe>> getRecipesByUser(@PathVariable String userId) {
        return ResponseEntity.ok(recipeService.getRecipesByUser(userId));
    }
}
