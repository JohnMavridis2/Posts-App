package com.example.demo.repo;

import com.example.demo.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepo extends JpaRepository<Post,Integer> {

    @Query(value = """
					SELECT *
					FROM posts
					ORDER BY id DESC
				   """,
            nativeQuery = true)
    List<Post> getAll();
}
