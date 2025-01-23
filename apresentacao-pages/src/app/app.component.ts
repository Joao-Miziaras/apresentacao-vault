import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component'
import { RouterModule } from '@angular/router';


@Component({
  standalone: true, // Deve estar presente
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'apresentacao-pages';
}
