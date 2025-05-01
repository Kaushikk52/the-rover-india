package com.tri.backend.services;

import com.tri.backend.exceptions.NotFoundException;
import com.tri.backend.models.Blog;
import com.tri.backend.models.User;
import com.tri.backend.repositories.BlogRepo;
import com.tri.backend.specs.GenericSpecification;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class BlogService {

    private final BlogRepo blogRepo;
    private final UserDetailsService userDetailsServ;

    public Blog post(Blog blog){
        return blogRepo.save(blog);
    }

    public List<Blog> getBlogs(){
        List<Blog> blogs = blogRepo.findByIsDeletedFalse();
        if(blogs.isEmpty()){
            throw new NotFoundException("No blogs found in the repository");
        }
        return blogs;
    }

    public Blog getBlogById(String id){
        return blogRepo.findById(id).orElseThrow(() -> new RuntimeException("Blog by ID not Found : "+id));
    }

    public List<Blog> getFilteredBlogs(Map<String,Object> filters){
        List<Blog> blogsList = new ArrayList<>();
        if(filters.isEmpty()){
            blogsList.addAll(this.getBlogs());
        }else{
            Specification<Blog> spec = GenericSpecification.findByCriteria(filters);
            List<Blog> filteredBlogs = blogRepo.findAll(spec);
            if(filteredBlogs.isEmpty()){
                throw new NotFoundException("No blogs matched the provided filters");
            }
            blogsList.addAll(filteredBlogs);
        }
        return blogsList;
    }

    public Blog edit(@NonNull Blog blog,@NonNull Principal principal){
        Blog existingBlog = this.getBlogById(blog.getId());
        User currentUser = (User) userDetailsServ.loadUserByUsername(principal.getName());
        existingBlog.setTitle(blog.getTitle());
        existingBlog.setHeroImage(blog.getHeroImage());
        existingBlog.setImages(blog.getImages());
        existingBlog.setContent(blog.getContent());
        existingBlog.setUser(currentUser);
        return blogRepo.save(existingBlog);
    }

    public void delete(String id){
        Blog existingBlog = this.getBlogById(id);
        existingBlog.setIsDeleted(true);
        blogRepo.save(existingBlog);
    }

}
