package com.txngui.backend.auth.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
    /**
     * This class is used to display the documentation of the API
     */

    /**
     * This method is used to display the documentation of the API
     * @return a welcome message at the moment
     */
    @GetMapping("/")
    public String home() {
        return "Bienvenue sur l'API !";
    }
}
