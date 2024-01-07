import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService } from '../trip-data.service';

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-trip.component.html',
  styleUrl: './add-trip.component.css'
})
export class AddTripComponent {
  newTrip: any = {
    id: 0,
    name: '' ,
    tripTarget: '',
    startDate: '',
    endDate: '',
    price: null,
    maxCapacity: null,
    description: '',
    image: ''
  };
  trips: any = [];
  maxId: number = 0;

  constructor(private router: Router, private dataService: TripDataService) {}

  addTrip() {
    // this.dataService.getTrips().subscribe(
    //   (response) => { 
    //     this.trips = response;
    //     this.maxId = Math.max(...this.trips.map((item: any) => item.id));},
    //   (error) => { console.log(error); });
    // this.newTrip.id = this.maxId + 1;
    // console.log(this.newTrip);
    // this.dataService.addTrip(this.newTrip).subscribe(
    // (response) => { console.log(response);},
    // (error) => { console.log(error); });
    if (this.newTrip.name !== '' && this.newTrip.tripTarget !== '' && this.newTrip.startDate !== '' && this.newTrip.endDate !== '' && this.newTrip.price !== null && this.newTrip.maxCapacity !== null && this.newTrip.description !== '' && this.newTrip.image !== '') {
    this.router.navigate(['/', 'home']);
    }
  }
}
