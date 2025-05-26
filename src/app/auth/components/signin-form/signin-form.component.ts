import {  Component, inject, signal } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalstorageService } from '../../../shared/services';

@Component({
  selector: 'app-signin-form',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule
  ],
  templateUrl: './signin-form.component.html',
})
export class SigninFormComponent {

  public is_pass = signal(false);
  private router = inject(Router);
  public signInForm!: FormGroup;
  public isLoading = signal<boolean>(false);
  // private authService = inject(AuthService);
  private localStorageService = inject(LocalstorageService);

  ngOnInit(): void {
      this.setForm();
  }

  public isViewPass(): void{
    this.is_pass.update((pass)=>!pass);
  }

  private setForm(): void{
    this.signInForm = new FormGroup({
      user: new FormControl('',[
        Validators.required,
        Validators.minLength(3),
        Validators.email
      ]),
      password: new FormControl('',[
        Validators.required,
        Validators.minLength(3)
      ])
    })
  }

  public clickLogin(){
    if(!this.signInForm.valid) return;

    // this.isLoading.set(true);
    // const body: ISignIn = {
    //   user: this.signInForm.value.user!,
    //   password: "pmWkWSBCL51Bfkhn79xPuKBKHz//H6B+mY6G9/eieuM="
    // }

    // this.authService.login(body).subscribe(
    //   {
    //     next: (res) => {
    //       this.isLoading.set(false);
    //       this.localStorageService.setItem("idEmplooyed", res.data?.idEmpleado);
    //       this.localStorageService.setItem("token", res.data?.token);
    //       this.router.navigate(['/dashboard'],{
    //         replaceUrl: true
    //       })
    //     },
    //     error: (err) => {
    //       console.error(err);
    //       this.isLoading.set(false);
    //     }
    //   }
    // )

  }

}
