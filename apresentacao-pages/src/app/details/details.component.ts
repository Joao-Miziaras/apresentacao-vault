import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import { Housinglocation } from '../housinglocation';
import { HousingService } from '../housing.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article>
      <img class="listing-photo" [src]="housingLocation?.photo">
      <section class="listing-description">
        <h2 class="listing-heading">
          {{ housingLocation?.name }}
          <p class="listing-location">{{housingLocation?.city}}, {{housingLocation?.state }}</p>
        </h2>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this housing locaition</h2>
        <ul>
          <li>units available: {{housingLocation?.availableUnits}}</li>
          <li>Does it hacva wifi: {{housingLocation?.wifi}}</li>
          <li>Does it have laundry: {{housingLocation?.laundry}}</li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="name">Name</label>
          <input id="name" type="text" formControlName=name>

          <label for="password">Password</label>
          <input id="password" type="text" formControlName=password>

          <label for="email">email</label>
          <input id="email" type="text" formControlName=email>
          <button type="submit" class="primary">apply now</button>
        </form>
      </section>
    </article>
  `,
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: Housinglocation | undefined
  
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  })

  constructor() {
      const housingLocationId = Number(this.route.snapshot.params['id']);
      this.housingService.getHousingLocationByid(housingLocationId).then(housingLocation => {
        this.housingLocation = housingLocation;
      })
    }
  submitApplication(){
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
    )
  }
}