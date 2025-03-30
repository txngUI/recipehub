package com.txngui.backend.entities.controllers;

import com.txngui.backend.entities.models.Folder;
import com.txngui.backend.entities.services.FolderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/folders")
public class FolderController {
    @Autowired
    private FolderService folderService;

    @PostMapping("/create")
    public ResponseEntity<Folder> createFolder(@RequestBody Folder folder) {
        return ResponseEntity.ok(folderService.createFolder(folder));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Folder>> getFoldersByUser(@PathVariable String userId) {
        return ResponseEntity.ok(folderService.getFoldersByUser(userId));
    }
}
