import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: 'post-list.component.html',
  styleUrls: ['post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   { title: 'First Post!', content: 'Content of the first post' },
  //   { title: 'Second Post!', content: 'Content of the second post' },
  //   { title: 'Third Post!', content: 'Content of the third post' }
  // ];

  posts: Post[] = [];
  serviceErr = '';
  private postsSub: Subscription;

  // public keyword here automatically creates a property on this class and sets the value to what was passed in from constructor
  constructor(public postsService: PostsService) { }

  ngOnInit(): void {
    this.posts = this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe({
        next: (posts: Post[]) => { this.posts = posts; },
        error: (err: string) => { this.serviceErr = err; },
        complete: () => { }
      });
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }
}
