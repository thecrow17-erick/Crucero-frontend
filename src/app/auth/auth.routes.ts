import { Routes } from "@angular/router";
import { SignInComponent } from "./page";
import { SigninFormComponent } from "./components";



export const AuthRutes: Routes = [
  {
    path: "",
    redirectTo: "sign-in",
    pathMatch: "full"
  },
  {
    path: "",
    component: SignInComponent,
    children: [
      {
        path: "sign-in",
        component: SigninFormComponent
      }
    ]
  }
];
