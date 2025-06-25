import { Routes } from "@angular/router";
import { EmployeedCreatePageComponent, EmployeesListPageComponent } from "./pages";



export const employeedRoutes: Routes = [
  {
    path: "",
    component: EmployeesListPageComponent
  },
  {
    path: "create",
    component: EmployeedCreatePageComponent
  }
];
