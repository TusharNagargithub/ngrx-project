import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { getPostById } from '../state/posts.selector';
import { Post } from 'src/app/models/posts.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { updatePost } from '../state/posts.actions';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent {
  post?: Post;
  postForm: FormGroup;
  postSubscription?: Subscription;
  constructor(private route:ActivatedRoute, private store: Store<AppState>, private router:Router){
    this.postForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }
   ngOnInit():void {

    this.postSubscription = this.store.select(getPostById).subscribe((post)=>{
      if(post){
        this.post = post;
        this.postForm.patchValue({
          title: post?.title,
          decription: post?.description,
        });
      }
    });
    // this.route.paramMap.subscribe(params => {
    //   const id = params.get('id');
    //   if(id){
    //   this.store
    //   .select(getPostById,{ id })
    //   .subscribe(data => {
    //     this.post = data;
    //     console.log(this.post);
    //   });
    // }
    // });
   }

   createForm() {
    this.postForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

   

  onSubmit(){
    if (!this.postForm.valid) {
      return;
    }

    const title = this.postForm.value.title;
    const description = this.postForm.value.description;

    const post: Post = {
      id: this.post?.id,
      title,
      description,
    };

    //dispatch the action
    this.store.dispatch(updatePost({post}));
    this.router.navigate(['posts']);
  }

  ngOnDestroy() {
    if(this.postSubscription){
      this.postSubscription.unsubscribe();
    }
  }

}
