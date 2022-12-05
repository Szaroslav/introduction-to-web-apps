import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhotosService } from './../photos.service';
import { Photo } from '../photo';

@Component({
	selector: 'app-photo-preview',
	templateUrl: './photo-preview.component.html',
	styleUrls: ['./photo-preview.component.scss']
})

export class PhotoPreviewComponent implements OnInit {
	photo: Photo = new Photo();

	constructor(private photosService: PhotosService, private route: ActivatedRoute) {}

	ngOnInit(): void {
		this.route.params.subscribe(params => this.getPhoto(params['id']));
	}

	getPhoto(id: number): void {
		this.photosService.getPhoto(id).subscribe(photo => this.photo = photo);
	}
}
