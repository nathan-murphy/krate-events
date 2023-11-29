import { Post } from "./post.model";
import { Injectable } from '@angular/core'
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostsService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    getPosts() {
        return [...this.posts];
    }

    addPost(post: Post) {
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
    }

    createAndAddPost(title: string, content: string) {
        const post: Post = { title: title, content: content };
        this.addPost(post);
    }

    getPostUpdateListener() {
        return this.postsUpdated.asObservable();
    }
}