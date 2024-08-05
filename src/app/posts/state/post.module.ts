import { EditPostComponent } from '../edit-post/edit-post.component';
import { AddPostComponent } from '../add-post/add-post.component';
import { PostsListComponent } from '../posts-list/posts-list.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { postReducer } from './posts.reduce';
import { POST_STATE_NAME } from './posts.selector';
import { EffectsModule } from '@ngrx/effects';
import { PostsEffects } from './posts.effects';

const routes: Routes = [
  {
    path: '',
    component: PostsListComponent,
    children: [
      { path: 'add', component: AddPostComponent },
      {
        path: 'edit/:id',
        component: EditPostComponent,
      },
    ],
  },
];
@NgModule({
  declarations: [PostsListComponent, AddPostComponent, EditPostComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    RouterModule.forChild(routes),StoreModule.forFeature(POST_STATE_NAME,postReducer),
    EffectsModule.forFeature([PostsEffects]),
  ],
  exports: [RouterModule],
})
export class PostsModule {}