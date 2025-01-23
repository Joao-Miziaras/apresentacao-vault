import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent} from './details/details.component'
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';

export const routes: Routes = [];

const routeConfig: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        title: 'Home page'
    },
    {
        path: 'details/:id',
        component: DetailsComponent,
        title: 'Details page'
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'login page'
    },
    {
        path: '',
        component: CadastroComponent,
        title: 'cadastro page'
    },
];

export default routeConfig;