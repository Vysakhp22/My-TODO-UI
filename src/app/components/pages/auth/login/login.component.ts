import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, AbstractControl, FormsModule, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '@services/toast.service';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, ToastModule, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  private toastService = inject(ToastService);
  private router = inject(Router);
  constructor(
  ) { }

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
      this.router.navigateByUrl('/my-tasks');
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
      console.log(this.registerForm.value);
      
      toast.success('Registration successful');
      this.registerForm.reset();
    }
  }
}
