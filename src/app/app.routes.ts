import { Routes } from '@angular/router';
import { AuthRutes } from './auth/auth.routes';
import { SideNavComponent } from './shared/components';
import { employeedRoutes } from './employeed/employeed.routes';

export const routes: Routes = [
  {
    path: "auth",
    children: AuthRutes
  },
  {
    path: "dashboard",
    component: SideNavComponent,
    children: [
      {
        path: "employees",
        children: employeedRoutes
      }
    ]
  }
];
