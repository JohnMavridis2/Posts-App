package com.example.demo.service;

import com.example.demo.entity.Post;

import com.example.demo.repo.PostRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {

    private PostRepo postRepo;

    public PostService(PostRepo postRepo) {
        this.postRepo = postRepo;
    }

    public int addPost(Post post) {
        try {
            postRepo.save(post);
            return 0;
        } catch (Exception e) {
            System.out.println("post not stored in DB!");
            return 1;
        }
    }

    public List<Post> getPosts() {
        return postRepo.getAll();
    }
}
