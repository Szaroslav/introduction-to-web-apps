import { Component } from '@angular/core';
import { Post } from '../post';
import { PostsService } from '../posts.service';

@Component({
    selector: 'app-post-add',
    templateUrl: './post-add.component.html',
    styleUrls: ['./post-add.component.scss']
})

export class PostAddComponent {
    post = new Post();

    constructor(private postsService: PostsService) {}

    onSubmit(): void {
        console.log(this.post);
        this.postsService.addPost(this.post);
    }
}