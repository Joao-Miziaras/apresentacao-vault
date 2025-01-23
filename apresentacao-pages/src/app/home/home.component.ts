import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { HousingLocatingComponent } from '../housing-locating/housing-locating.component';
import { Housinglocation  } from '../housinglocation';
import { HousingService } from '../housing.service';
@Component({
  selector: 'app-home',
  imports: [HousingLocatingComponent, CommonModule],
  template: `
      <section> 
        <form>
          <input type="text" placeholder="Filter by city" #filter>
          <button class="primary" type="button" (click)="filterResults(filter.value)">search</button>
        </form>
      </section>
      <section class="results">
        <app-housing-locating *ngFor="let housinglocation of filteredLocationList" [housingLocation]="housinglocation"></app-housing-locating>
      </section>
  `,
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  housinglocationList: Housinglocation[] = [];
  housingService: HousingService = inject(HousingService);
  filteredLocationList:Housinglocation[] = [];

  constructor() {
    this.housingService.getAllHousingLocations().then((housinglocationList: Housinglocation[]) =>{
      this.housinglocationList = housinglocationList;
      this.filteredLocationList = housinglocationList;
    });
  }
  filterResults(text: string){
    if(!text) this.housinglocationList = this.housinglocationList;
    this.filteredLocationList = this.housinglocationList.filter(
      housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }
}
