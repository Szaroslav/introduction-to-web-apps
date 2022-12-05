import { Component, OnInit } from '@angular/core';
import { PostsService } from './posts.service';
import { Post } from './post';

@Component({
	selector: 'app-posts',
	templateUrl: './posts.component.html',
	styleUrls: ['./posts.component.scss']
})

export class PostsComponent implements OnInit {
	posts: Post[] = [];

	constructor(private service: PostsService) {}

	ngOnInit(): void {
		this.getPosts();
	}

	getPosts(): void {
		this.service.getPosts().subscribe(posts => this.posts = posts);
	}
}
