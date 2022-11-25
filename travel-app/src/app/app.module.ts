import { AppComponent } from './app.component';

import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { TripComponent } from './trip/trip.component';
import { TripsComponent } from './trips/trips.component';
import { TripCreateComponent } from './trip-create/trip-create.component';


@NgModule({
    declarations: [
        AppComponent,
        TripsComponent,
        TripComponent,
        TripCreateComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatTooltipModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule { }