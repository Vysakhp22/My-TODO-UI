import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        children: [
            {
                path: 'login',
                loadComponent: () => import('@app/components/pages/auth/login/login.component').then(m => m.LoginComponent)
            },
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full'
            }
        ]
    },
];
