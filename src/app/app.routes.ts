import { Routes } from '@angular/router';
import { ProvidersListComponent } from './components/providers-list/providers-list.component';
import { ServicesListComponent } from './components/services-list/services-list.component';

export const routes: Routes = [
    { path: 'providers-list', component: ProvidersListComponent },
    { path: 'services-list', component: ServicesListComponent },
    { path: '', redirectTo: 'providers-list', pathMatch: 'full'}
];
