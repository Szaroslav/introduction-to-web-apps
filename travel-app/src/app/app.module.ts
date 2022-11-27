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
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { TripComponent } from './trip/trip.component';
import { TripsComponent } from './trips/trips.component';
import { TripCreateComponent } from './trip-create/trip-create.component';
import { TripRateComponent } from './trip-rate/trip-rate.component';
import { TripsFilterComponent } from './trips-filter/trips-filter.component';
import { TripsFilterPipe } from './trips-filter.pipe';


@NgModule({
    declarations: [
        AppComponent,
        TripsComponent,
        TripComponent,
        TripCreateComponent,
        TripRateComponent,
        TripsFilterComponent,
        TripsFilterPipe
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
        MatInputModule,
        MatSliderModule,
        MatButtonToggleModule,
        MatSelectModule,
        MatDatepickerModule,
        MatMomentDateModule
    ],
    
    providers: [
        MatDatepickerModule
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }