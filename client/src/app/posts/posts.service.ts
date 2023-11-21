import { Post } from "./post.model";
import {Injectable} from '@angular/core'

// alternative method to adding service in 'Providers' app module
@Injectable({providedIn: 'root'})
export class PostsService {
    private posts: Post[] = [];

    getPosts() {
        // spread operator & new array to avoid exposing reference to stored posts
        return [...this.posts];
    }

    addPost(post: Post) {
        this.posts.push(post);
    }

    createAndAddPost(title: string, content: string) {
        const post: Post = { title: title, content: content };
        this.addPost(post);
    }
}