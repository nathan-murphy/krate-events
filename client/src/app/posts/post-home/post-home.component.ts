import { Component } from '@angular/core';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-home',
  template: `
  <app-post-create (postCreated) = "onPostAdded($event)"></app-post-create>
  <app-post-list [posts] = "storedPosts"></app-post-list>
  `
})
export class PostHomeComponent {
  storedPosts: Post[] = [];

  onPostAdded(post) {
    this.storedPosts.push(post);
  }
}
