import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { Post } from "src/app/models/posts.model"

export interface PostsState extends EntityState<Post> {
   // posts:Post[];
   count: number;
}
// create adapter
export const postsAdapter = createEntityAdapter<Post>({

});

//export const initialState: PostsState = {
  //  posts: [
    //     {id: '1', title: 'sample Title 1', description:'sample description 1'},
    //     {id: '2', title: 'sample Title 2', description:'sample description 2'},
    // ],
//}

export const initialState:PostsState = postsAdapter.getInitialState({
  count:0,
}); //Here we added data dynamically

export function sortByName(a: Post, b: Post): number {
  return a.title.localeCompare(b.title);
}
