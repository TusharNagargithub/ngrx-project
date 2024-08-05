import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Post } from "../models/posts.model";
@Injectable({
    providedIn: 'root',
})
export class PostsService {
    constructor(private http:HttpClient){}
   
    getPosts(): Observable<Post[]>{
        return this.http.get<Post[]>('http://localhost:3000/posts').pipe(map((data)=>{
            const posts: Post[]=[];
            for (let key in data){
                posts.push({...data[key],id: key});
            }
            return posts;
        }));
    }
    addPost(post:Post): Observable<Post> {
        return this.http.post<Post>('http://localhost:3000/posts',post);
    }
    updatePost(post:Post): Observable<Post>{
        // const postData = {
        //     [post.id]: {title: post.title, description: post.description},
        // };
        return this.http.patch<Post>('http://localhost:3000/posts',{
            title: post.title,
            description: post.description
        });
    }
    deletePost(id: string){
        console.log(id);
        return this.http.delete(`http://localhost:3000/posts/${id}`);
    }
}