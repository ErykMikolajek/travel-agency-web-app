import { TripMenuComponent } from './../trip-menu/trip-menu.component';
import { TripComponent } from '../trip/trip.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TripMenuComponent, TripComponent, CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
