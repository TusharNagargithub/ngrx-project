import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/posts.model';
import { AppState } from 'src/app/store/app.state';
import { getCount, getPosts } from '../state/posts.selector';
import { deletePost, loadPosts } from '../state/posts.actions';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent {
  posts: Observable<Post[]> ;
  count?: Observable<number>;
  constructor(private store: Store< AppState >){
    this.posts = this.store.select(getPosts);
    this.store.dispatch(loadPosts());
  }
   
  ngOnInit(): void {
    this.posts = this.store.select(getPosts); // Alternatively, initialize posts here
    this.count = this.store.select(getCount);
    this.store.dispatch(loadPosts());

  }
  
  onDeletePost(id: string){
    if(confirm("Are you sure you want to delete")){
     this.store.dispatch(deletePost({id}));
    }
  }
}
