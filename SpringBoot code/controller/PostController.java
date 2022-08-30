package com.example.demo.controller;

import com.example.demo.entity.Post;
import com.example.demo.service.PostService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/api/v1/post")
public class PostController {

    private PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @PostMapping
    public int addPost(@RequestParam Map<String,String> reqParams){
        Post post=Post.builder()
                .img(reqParams.get("file"))
                .text(reqParams.get("post"))
                .t_stamp(reqParams.get("timeStamp"))
                .build();

        return postService.addPost(post);
    }

    @GetMapping
    public List<Post> getPosts(){
        return postService.getPosts();
    }

}

