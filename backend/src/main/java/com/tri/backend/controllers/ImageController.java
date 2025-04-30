package com.tri.backend.controllers;

import com.tri.backend.services.ImageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/v1/api/images")
public class ImageController {

    private final ImageService imgService;

    @PostMapping(value = "/upload/single")
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file, @RequestParam("type") String type) {
        try {
            String imageUrl = imgService.uploadImage(file,type);
            return ResponseEntity.ok(imageUrl);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error uploading image: " + e.getMessage());
        }
    }

    @PostMapping(value = "/upload/multiple/{type}")
    public ResponseEntity<List<String>> uploadMultiple(@RequestParam("files") List<MultipartFile> files,
                                                       @PathVariable String type) {
        try {
            List<String> urls = imgService.multipleUpload(files, type);
            return ResponseEntity.ok(urls);
        } catch (IOException e) {
            return ResponseEntity.status(500).body(List.of("File upload failed: " + e.getMessage()));
        }
    }

    @DeleteMapping(value = "/delete/single/{type}")
    public ResponseEntity<?> deleteImage(@RequestParam("publicId") String publicId, @PathVariable String type) {
        try {
            String result = imgService.deleteImage(publicId,type);
            return ResponseEntity.ok(result);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error deleting image: " + e.getMessage());
        }
    }

    @DeleteMapping(value = "/delete/multiple/{type}")
    public ResponseEntity<?> deleteMultiple(@RequestParam("publicIds") List<String> publicIds, @PathVariable String type) {
        try {
            List<String> results = imgService.deleteFiles(publicIds, type);
            return ResponseEntity.ok(results);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(List.of("File delete failed: " + e.getMessage()));
        }
    }

}
