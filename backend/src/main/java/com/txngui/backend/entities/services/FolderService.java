package com.txngui.backend.entities.services;

import com.txngui.backend.entities.models.Folder;
import com.txngui.backend.entities.repositories.FolderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FolderService {
    @Autowired
    private FolderRepository folderRepository;

    public Folder createFolder(Folder folder) {
        return folderRepository.save(folder);
    }

    public List<Folder> getFoldersByUser(String userId) {
        return folderRepository.findByCreatedBy(userId);
    }
}
