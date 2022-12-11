import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { TripsComponent } from './trips/trips.component';
import { TripCreateComponent } from './trip-create/trip-create.component';
import { TripsHistoryComponent } from './trips-history/trips-history.component';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
    {path: 'trips', component: TripsComponent},
    {path: 'trips/create', component: TripCreateComponent},
    {path: 'trips/history', component: TripsHistoryComponent},
    {path: 'trip/details/:id', component: TripDetailsComponent},
    {path: 'cart', component: CartComponent},
    {path: '', component: HomeComponent},
    {path: '**', component: HomeComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
