import { Component, OnInit, Input } from '@angular/core';
import { PostsService } from './posts.service';
import { Post } from './post';

@Component({
	selector: 'app-posts',
	templateUrl: './posts.component.html',
	styleUrls: ['./posts.component.scss']
})

export class PostsComponent implements OnInit {
	@Input() posts: Post[] = [];

	constructor(private service: PostsService) {}

	ngOnInit(): void {
		this.service.getPosts().subscribe(posts => this.posts = posts.map(post => new Post(
			post.id, post.userId, post.title[0].toUpperCase() + post.title.slice(1), post.body[0].toUpperCase() + post.body.slice(1)
		)));
		this.service.newPost$.subscribe(post => this.posts.push(post));
	}
}
