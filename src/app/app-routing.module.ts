import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { SinglePostComponent } from './posts/single-post/single-post.component';
// import { CounterComponent } from './counter/counter/counter.component';
// import { PostsListComponent } from './posts/posts-list/posts-list.component';
// import { AddPostComponent } from './posts/add-post/add-post.component';
// import { EditPostComponent } from './posts/edit-post/edit-post.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path:'counter',
    //component: CounterComponent,
    loadChildren: () => import('./counter/state/counter.module').then((m) => m.CounterModule),
  },
  {
    path:'posts',

    // component: PostsListComponent,
    // children:[
    //   {
    //     path: 'add',
    //     component:AddPostComponent,
    //   },
    //   {
    //     path: 'edit/:id',
    //     component: EditPostComponent,  
    // },
    // ],
    
    loadChildren:() => import('./posts/state/post.module').then((m)=>m.PostsModule),
  },
  {
    path:'posts/details/:id',
    component: SinglePostComponent,
  },
  {
    path: 'auth',
    //component: LoginComponent
    loadChildren:() => import('./auth/auth.module').then((m) => m.Authmodule), //loadingchildren return a promises
  }
    
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}