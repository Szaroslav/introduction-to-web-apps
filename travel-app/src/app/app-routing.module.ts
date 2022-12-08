import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { TripsComponent } from './trips/trips.component';
import { TripCreateComponent } from './trip-create/trip-create.component';

const routes: Routes = [
    {path: 'trips', component: TripsComponent},
    {path: 'trips/create', component: TripCreateComponent},
    {path: '', component: HomeComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
