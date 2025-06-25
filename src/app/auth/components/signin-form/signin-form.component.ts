import {  Component, inject, signal } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalstorageService } from '../../../shared/services';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { IAuthBody } from '../../interfaces/auth.interface';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin-form',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    CommonModule,
    ToastrModule,

  ],
  templateUrl: './signin-form.component.html',
})
export class SigninFormComponent {
  private toastr= inject(ToastrService);
  public is_pass = signal(false);
  private router = inject(Router);
  public signInForm!: FormGroup;
  public isLoading = signal<boolean>(false);
  private authService = inject(AuthService);
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

    this.isLoading.set(true);
    const body: IAuthBody = {
      correo: this.signInForm.value.user || '',
      contrasena: this.signInForm.value.password || ''
    }

    this.authService.login(body).subscribe(
      {
        next: (res) => {
          this.isLoading.set(false);
          this.toastr.success('Bienvenido al sistema', 'Inicio de sesión exitoso');
          this.localStorageService.setItem("idEmplooyed", res.data.empleado.id);
          this.localStorageService.setItem("idEntidad", res.data.empleado.id_entidad);
          this.localStorageService.setItem("token", res.data?.token);
          this.router.navigate(['/dashboard'],{
            replaceUrl: true
          })
        },
        error: (err) => {
          console.log(err);
          this.toastr.error(err.error.message, 'Error al iniciar sesión');
          this.isLoading.set(false);
        }
      }
    )

  }

}
