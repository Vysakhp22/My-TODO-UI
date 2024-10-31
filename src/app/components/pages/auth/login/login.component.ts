import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
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
    const toast = this.toastService.showToast();
    if (this.loginForm.valid) {
      toast.success('Login successful');
    } else {
      toast.warn('Please fill all the fields');
    }
  }
}
