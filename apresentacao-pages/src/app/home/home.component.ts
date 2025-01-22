import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  template: `
      <section> 
        <form>
          <input type="text" placeholder="Filter by city">
          <button class="primary" type="button">search</button>
        </form>
      </section>
      <section class="results">

      </section>
  `,
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
