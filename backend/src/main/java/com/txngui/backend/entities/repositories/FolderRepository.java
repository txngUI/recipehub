package com.txngui.backend.entities.repositories;

import com.txngui.backend.entities.models.Folder;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FolderRepository extends MongoRepository<Folder, String> {
    List<Folder> findByCreatedBy(String userId);
}