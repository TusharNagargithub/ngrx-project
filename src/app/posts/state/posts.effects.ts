import { PostsService } from './../../services/posts.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { addPost, addPostSuccess, deletePost, deletePostSuccess, loadPosts, loadPostsSuccess, updatePost, updatePostSuccess } from './posts.actions';
import { EMPTY, map, mergeMap, of, switchMap, withLatestFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Post } from 'src/app/models/posts.model';
import { Update } from '@ngrx/entity';
import { getPosts } from './posts.selector';
import { dummyAction } from 'src/app/auth/state/auth.actions';

@Injectable()

export class PostsEffects {
    constructor(
      private actions$: Actions,
      private postsService: PostsService,
      private store: Store<AppState>,
      private http:HttpClient
    ) {}

    loadPosts$ = createEffect(() => {
        return this.actions$.pipe(
          ofType(loadPosts),
          withLatestFrom(this.store.select(getPosts)),// this will give a observable
          mergeMap(([action, posts])=>{
            if(!posts.length || posts.length === 1){
                return this.postsService.getPosts().pipe(map((posts)=>{
                    return loadPostsSuccess({ posts });
                })
                );
            }
            return of(dummyAction());
          })
        );
      },
      
    );

    addPost$ = createEffect(() => { // this function always expect return Observable
        return this.actions$.pipe(
            ofType(addPost),
            mergeMap((action) => {
            return this.postsService.addPost(action.post).pipe(
                map((post) => {
                console.log(post,"I am here in addPost in Effect");
                    return addPostSuccess({post});
                })
        );
        })
    );
    });

    updatePost$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(updatePost),
            switchMap((action)=>{
                
                return this.postsService.updatePost(action.post).pipe(
                    map((data) => {
                    const updatedPost: Update<Post> = {
                        id: action.post.id as string,
                        changes: {
                            ...action.post,
                        },
                    };
                    //return updatePostSuccess({post:action.post});
                   return updatePostSuccess({ post: updatedPost });
                })
               );
            })
        )
    });

    deletePost$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(deletePost),
            switchMap((action)=>{
                return this.postsService.deletePost(action.id).pipe(map((data) => {
                    console.log(action.id,"delete Post");
                   return deletePostSuccess({id:action.id});
                }));
            })
        )
    });

}