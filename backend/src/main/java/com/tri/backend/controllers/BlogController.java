package com.tri.backend.controllers;

import com.tri.backend.models.Blog;
import com.tri.backend.services.BlogService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/v1/api/blog")
public class BlogController {
    private final BlogService blogServ;

    @PostMapping(value = "/post")
    public ResponseEntity<Blog> postBlog(@Valid @RequestBody Blog blog) {
        Blog savedBlog = blogServ.post(blog);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedBlog);
    }

    @GetMapping(value = "/all")
    public ResponseEntity<List<Blog>> getAllBlogs() {
        return ResponseEntity.status(HttpStatus.OK).body(blogServ.getBlogs());
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Blog> getBlogById(@PathVariable String id) {
        return ResponseEntity.status(HttpStatus.OK).body(blogServ.getBlogById(id));
    }

    @PostMapping(value = "/edit")
    public ResponseEntity<Blog> updateBlog(@Valid @RequestBody Blog blog, Principal principal) {
        return ResponseEntity.status(HttpStatus.OK).body(blogServ.edit(blog, principal));
    }

    @PostMapping(value = "/delete/{id}")
    public ResponseEntity<Void> deleteBlog(@PathVariable String id) {
        blogServ.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
    }

}
