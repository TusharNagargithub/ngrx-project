import { Action, createReducer, on } from "@ngrx/store";
import { initialState, postsAdapter, PostsState } from "./posts.state";
import { addPost, addPostSuccess, deletePost, deletePostSuccess, loadPostsSuccess, updatePost, updatePostSuccess } from "./posts.actions";
import { state } from "@angular/animations";
import { Post } from "src/app/models/posts.model";

export const _postReducer = createReducer(
    initialState,
    on(addPostSuccess, (state, action) => {// here action is an argument
       // let post = {...action.post };
        //-- post.id = (state.posts.length + 1).toString();

        // return {
        //     ...state,
        //     posts: [...state.posts,post],
        // }
        // return postsAdapter.addOne(action.post, state);
        
        // here we can update state immutability. or here update data other than data present in the post Entity
        return postsAdapter.addOne(action.post, {...state,
            count: state.count + 1,
        });

    }),
    on(updatePostSuccess, (state, action) => {
        // const updatePosts = state.posts.map((post)=>{
        //     return action.post.id === post.id ? action.post : post;
        // });
        // return {
        //     ...state,
        //     posts: updatePosts,
        // };
        return postsAdapter.updateOne(action.post, state);
    }),
    on(deletePostSuccess, (state, { id }) => {
    //     const updatePost = state.posts.filter((post) => {
    //         return post.id !== id;
    //     });
        return postsAdapter.removeOne(id,state)
    }),
    // on(deletePost, (state,{id}) => {
    //     const updatePost = state.posts.filter((post)=>{
    //         return post.id!==id; 
    //     })
    //     return {
    //         ...state,
    //         posts: updatePost
    //     }
    // }),
    on(loadPostsSuccess, (state,action) => {
        // return {
        //     ...state,
        //     posts: action.posts,
        // }
        return postsAdapter.setAll(action.posts, state);
    })
    
);

export function postReducer(state: PostsState | undefined,action: Action){
    return _postReducer(state,action);
}