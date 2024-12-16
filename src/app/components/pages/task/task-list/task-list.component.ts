import { CommonModule } from '@angular/common';
import { Component, signal, WritableSignal } from '@angular/core';
import { EPriorityValue, ETaskState } from '@app/models/common';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TaskListViewComponent } from "../task-list-view/task-list-view.component";
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastService } from '@services/toast.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, CalendarModule, SelectButtonModule, TaskListViewComponent, ReactiveFormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  public calendarStyle = {
    'height': '100%',
  }
  public sideBarCalendarStyle = {
    'width': '500%',
    'height': '100%',
    'border': 'none',
  };
  protected isCollapsed: WritableSignal<boolean> = signal(false);
  protected sidebar: WritableSignal<boolean> = signal(false);
  protected reload: WritableSignal<boolean> = signal(false);
  protected taskName: string = '';
  protected toggleCollapse() {
    this.isCollapsed.set(true);
  }
  protected itemEditId: WritableSignal<string> = signal('');
  protected stateOptions = Object.values(ETaskState)
  protected priorityOptions = Object.values(EPriorityValue)


  protected taskCreate = new FormGroup({
    task: new FormControl('', [Validators.required]),
    dueDate: new FormControl<Date | null>(new Date(), [Validators.required]),
    priority: new FormControl<EPriorityValue | null>(EPriorityValue.Medium, [Validators.required]),
    status: new FormControl<ETaskState | null>(ETaskState.Pending, [Validators.required]),
  });
  constructor(
    private toast: ToastService,
  ) { }

  addTask() {
    const toastMessage = this.toast.showToast();
    console.log(this.taskCreate.value);
    if (this.taskCreate.valid) {

    } else {
      if (this.taskCreate.get('task')?.hasError('required')) {
        toastMessage.warn('Task is required');
      }
      if (this.taskCreate.get('dueDate')?.hasError('required')) {
        toastMessage.warn('Due Date is required');
      }
      if (this.taskCreate.get('priority')?.hasError('required')) {
        toastMessage.warn('Priority is required');
      }
      if (this.taskCreate.get('status')?.hasError('required')) {
        toastMessage.warn('Status is required');
      }
    }

    this.reload.set(true);
    this.sidebar.set(false);
  }
}
