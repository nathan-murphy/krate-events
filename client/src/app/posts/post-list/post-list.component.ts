import { Component, Input } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: 'post-list.component.html',
  styleUrls: ['post-list.component.css']
})
export class PostListComponent {
  // posts = [
  //   { title: 'First Post!', content: 'Content of the first post' },
  //   { title: 'Second Post!', content: 'Content of the second post' },
  //   { title: 'Third Post!', content: 'Content of the third post' }
  // ];

  @Input() posts: Post[] = [];


  // public keyword here automatically creates a property on this class and sets the value to what was passed in from constructor
  constructor(public postsService: PostsService) {
    
  }
}
