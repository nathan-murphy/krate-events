import { Component } from '@angular/core';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-home',
  template: `
  <div>
    <app-post-create></app-post-create>
    <app-post-list></app-post-list>
  </div>`,
  styles: [`
  div {
    width: 80%;
    margin: 1rem auto;
  }`]
})
export class PostHomeComponent { }
