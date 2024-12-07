import { CommonModule } from '@angular/common';
import { Component, signal, WritableSignal } from '@angular/core';
import { EPriorityLabel, EPriorityValue, ETaskState, TPriorities } from '@app/models/common';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TaskListViewComponent } from "../task-list-view/task-list-view.component";

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, CalendarModule, SelectButtonModule, TaskListViewComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  protected isCollapsed: WritableSignal<boolean> = signal(false);
  protected taskName: string = '';
  protected toggleCollapse() {
    this.isCollapsed.set(true);
  }
  protected stateOptions = Object.values(ETaskState)
  protected priorityOptions: TPriorities = [
    { label: EPriorityLabel.P1, value: EPriorityValue.High },
    { label: EPriorityLabel.P2, value: EPriorityValue.Medium },
    { label: EPriorityLabel.P3, value: EPriorityValue.Low }
  ]
}
