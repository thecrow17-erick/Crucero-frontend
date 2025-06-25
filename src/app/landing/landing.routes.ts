import { Routes } from "@angular/router";
import { CreateEntityPageComponent, LandingPageComponent } from "./page";



export const landingRoutes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "home",
    component: LandingPageComponent

  },
  {
    path: 'create-service',
    component: CreateEntityPageComponent
  }
]
