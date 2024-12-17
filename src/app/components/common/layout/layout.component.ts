import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  private router: Router = inject(Router);
  protected logOut(): void {
    localStorage.removeItem('token');
    localStorage.clear();
    this.router.navigateByUrl('/auth/login');
  }

}
