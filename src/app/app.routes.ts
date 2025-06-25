import { Routes } from '@angular/router';
import { AuthRutes } from './auth/auth.routes';
import { SideNavComponent } from './shared/components';
import { employeedRoutes } from './employeed/employeed.routes';
import { landingRoutes } from './landing/landing.routes';
import { busesRoutes } from './buses/buses.routes';

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
      },
      {
        path: "buses",
        children: busesRoutes
      }
    ]
  },
  {
    path: "",
    children: landingRoutes
  }
];
