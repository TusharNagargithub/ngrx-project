import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/posts.model';
import { AppState } from 'src/app/store/app.state';
import { getPostById } from '../state/posts.selector';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent {
  post?: Observable<Post | null | undefined>;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
      if(id){
      this.post = this.store.select(getPostById);
        console.log(this.post);
    }
  }
}
