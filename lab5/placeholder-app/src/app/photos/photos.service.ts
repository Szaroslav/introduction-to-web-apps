import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Photo } from './photo';

@Injectable({
    providedIn: 'root'
})

export class PhotosService {
    private photosURL = 'https://jsonplaceholder.typicode.com/photos';

    constructor(private http: HttpClient) {}

    getPhotos(): Observable<Photo[]> {
        return this.http.get<Photo[]>(this.photosURL);
    }

    getPhoto(id: number): Observable<Photo> {
        return this.http.get<Photo>(`${this.photosURL}/${id}`);
    }
}
