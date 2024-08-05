import { createFeatureSelector, createSelector } from "@ngrx/store";
import { postsAdapter, PostsState } from "./posts.state";
import { state } from "@angular/animations";
import { getCurrentRoute } from "src/app/store/router/router.selector";
import { RouterStateUrl } from "src/app/store/router/custom-serializer";
export const POST_STATE_NAME = 'posts';


const getPostsState = createFeatureSelector<PostsState>(POST_STATE_NAME);

export const postSelectors = postsAdapter.getSelectors();


// export const getPosts = createSelector(getPostsState, (state) => {
//     return state.posts;
// });

export const getPosts = createSelector(getPostsState, postSelectors.selectAll);
export const getPostEntities = createSelector(
    getPostsState,
    postSelectors.selectEntities
);

// export const getPostById = createSelector(getPosts,
//     getCurrentRoute,(posts, route: RouterStateUrl)=> {
//         console.log(posts,"Tushar Nagar");
//         console.log(posts[route.params['id']]);
//     return posts ? posts.find((post)=> post.id === route.params['id']) : null ;
// }
// );

export const getPostById = createSelector(
    getPostEntities,
    getCurrentRoute,(posts, route: RouterStateUrl)=> {
    return posts ? posts[route.params['id']] : null ;
}
);

//export const getPostById = createSelector(getPostsState, (state: { posts: { [x: string]: any; }; }, props: { id: string | number; }) => {
    //console.log(props.id);
    //@######return state.posts[0];
    //return state.posts["find"]((post: { id: string | number; }) => post.id === props.id);
    //####return state.posts[props.id] ? state.posts[props.id] : null;
//});

export const getCount = createSelector(getPostsState, (state) => state.count);