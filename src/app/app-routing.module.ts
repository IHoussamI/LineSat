import { Routes } from '@angular/router';
import { BaseLayoutComponent } from '../layouts/Base-Layout-Component';
import { HomeLayoutComponent } from '../layouts/Home-layout-component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './Services/Auth/auth.guard';
export const routes: Routes = [
    {
    path: '',
        component: BaseLayoutComponent,
        children: [
            { path: 'home', component: HomeLayoutComponent },
            { path: 'checkout', component:CheckoutComponent},
            { 
                path: 'dashboard-admin', 
                component: DashboardComponent, 
                canActivate: [AuthGuard]  
            },
            { path: 'login', component: LoginComponent },
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: '**', redirectTo: 'home' }
        ]
    }

];
