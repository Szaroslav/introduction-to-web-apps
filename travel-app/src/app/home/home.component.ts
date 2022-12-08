import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent {
    private GOOGLE_MAPS_API_URL = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCR_keyUSCxDPbqMTujkiCSGZ7d7hm56jY';
    apiLoaded: Observable<boolean>;

    constructor(httpClient: HttpClient) {
        this.apiLoaded = httpClient.jsonp(this.GOOGLE_MAPS_API_URL, 'callback')
            .pipe(
                map(() => true),
                catchError(() => of(false))
            );
    }
}