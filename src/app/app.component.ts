import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastService } from '@services/toast.service';
import { ToastColor } from '@app/models/toast.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(
    public toastService: ToastService
  ) { }
  protected eToastColor = ToastColor;
  title = 'TODO';
}
