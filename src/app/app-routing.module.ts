import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddTripComponent } from './add-trip/add-trip.component';
import { TripMenuComponent } from './trip-menu/trip-menu.component';
import { BasketComponent } from './basket/basket.component';
import { HistoryComponent } from './history/history.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'trips', component: TripMenuComponent },
    { path: 'basket', component: BasketComponent },
    { path: 'history', component: HistoryComponent },
    { path: 'add-trip', component: AddTripComponent},
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
