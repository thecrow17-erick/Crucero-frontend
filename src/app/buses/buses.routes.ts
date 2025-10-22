import { Routes } from "@angular/router";
import { BusesCreatePageComponent, BusesPageComponent } from "./page";


export const busesRoutes: Routes = [
  {
    path: "",
    component: BusesPageComponent
  },
  {
    path: "create",
    component: BusesCreatePageComponent
  }
]
  