import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { ToastService } from '@services/toast.service';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, ToastModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  private toastService = inject(ToastService);
  constructor(
  ) { }

  protected loginForm: FormGroup<{
    email: FormControl<string | null>;
    password: FormControl<string | null>;
  }> = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  protected onSubmit(): void {
    this.loginForm.markAllAsTouched();
    const toast = this.toastService.showToast();
    if (this.loginForm.valid) {
      toast.success('Login successful');
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
}
