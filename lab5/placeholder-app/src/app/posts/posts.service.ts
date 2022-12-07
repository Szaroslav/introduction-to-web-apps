import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Subject, Observable, of } from 'rxjs';

import { Post } from './post';

@Injectable({
    providedIn: 'root'
})

export class PostsService {
    private postsURL = 'https://jsonplaceholder.typicode.com/posts';
    private post = new Subject<Post>();

    newPost$ = this.post.asObservable();

    constructor(private http: HttpClient) {}

    getPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(this.postsURL);
    }

    addPost(post: Post): void {
        this.http.post<Post>(this.postsURL, post, {
            headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=UTF-8' })
        });
        this.post.next(Object.assign({}, post));
    }
}