import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, AbstractControl, FormsModule, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { TUserLogin, TUserLoginResponse, TUserRegister } from '@app/models/common';
import { ConfigData } from '@services/configdata.service';
import { ToastService } from '@services/toast.service';
import { UserService } from '@services/user.service';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, ToastModule, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly toastService = inject(ToastService);
  private readonly router = inject(Router);
  private readonly userService = inject(UserService);
  private configData = inject(ConfigData);
  constructor() { }

  protected loginForm: FormGroup<{
    email: FormControl<string | null>;
    password: FormControl<string | null>;
  }> = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  private passwordMatchValidator: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password && confirmPassword && password.value === confirmPassword.value ? null : { password: true };
  }

  protected registerForm: FormGroup<{
    name: FormControl<string | null>;
    email: FormControl<string | null>;
    password: FormControl<string | null>;
    confirmPassword: FormControl<string | null>;
  }> = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  }, { validators: this.passwordMatchValidator });

  protected onSubmit(): void {
    this.loginForm.markAllAsTouched();
    const toast = this.toastService.showToast();
    if (this.loginForm.valid) {
      const payload: TUserLogin = {
        email: this.loginForm.value.email!,
        password: this.loginForm.value.password!
      };
      this.userService.userLogin(payload).subscribe({
        next: (response: TUserLoginResponse) => {
          console.log(response);
          this.configData.userDetail = response.userDetails;
          this.router.navigateByUrl('/my-tasks');
        },
        error: (error: Error) => {
          toast.error(error);
        }
      })
      toast.success('Login successful');
      this.loginForm.reset();
    } else {
      Object.values(this.loginForm.controls).forEach((control: AbstractControl) => {
        if (control.errors) {
          Object.keys(control.errors).forEach((error: string) => {
            switch (error) {
              case 'required':
                toast.warn('Please fill in all fields');
                break;
              case 'email':
                toast.warn('Please enter a valid email');
                break;
            }
          }
          );
        }
      });
    }
  }

  protected onRegister(): void {
    this.registerForm.markAllAsTouched();
    const toast = this.toastService.showToast();
    if (this.registerForm.valid) {
      const payload: TUserRegister = {
        name: this.registerForm.value.name!,
        email: this.registerForm.value.email!,
        password: this.registerForm.value.password!
      };
      this.userService.userRegister(payload).subscribe({
        next: (response: any) => {
          console.log(response);
          if (response.token) {
            localStorage.setItem('token', response.token);
          }
          toast.success('Registration successful');
          this.router.navigateByUrl('/auth/login');
        },
        error: (error: Error) => {
          toast.error(error);
        }
      });
    }
  }
}
