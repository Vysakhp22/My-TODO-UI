import { CommonModule } from '@angular/common';
import { Component, effect, signal, WritableSignal } from '@angular/core';
import { EPriorityValue, ETaskState, TTask, TTaskUpdate } from '@app/models/common';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TaskListViewComponent } from "../task-list-view/task-list-view.component";
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastService } from '@services/toast.service';
import { ConfigData } from '@services/configdata.service';
import { TaskService } from '@services/task.service';

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

  public updateTask = new FormGroup({
    task: new FormControl('', [Validators.required]),
    dueDate: new FormControl<Date | null>(new Date(), [Validators.required]),
    priority: new FormControl<EPriorityValue | null>(EPriorityValue.Medium, [Validators.required]),
    status: new FormControl<ETaskState | null>(ETaskState.Pending, [Validators.required]),
  });

  constructor(
    private toast: ToastService,
    private configData: ConfigData,
    private taskService: TaskService
  ) {
    effect(() => {
      if (this.itemEditId()?.length) {
        this.taskService.getTaskByIdAsync(this.itemEditId()!).subscribe({
          next: (task: any) => {
            this.updateTask.setValue({
              task: task.title,
              dueDate: new Date(task.due_date),
              priority: task.priority,
              status: task.status
            });
          },
          error: (err: Error) => {
            this.toast.showToast().error(err);
          }
        });
      }
      if (this.isCollapsed()) {
        this.taskCreate.setValue({
          task: '',
          dueDate: new Date(),
          priority: EPriorityValue.Medium,
          status: ETaskState.Pending
        });
         // After adding task, reload will be true after the accordion is closed need to reset it to false for next time
        setTimeout(() => {
          this.reload.set(false);
        });
      }
      // After update task, reload will be true after the sidebar is closed need to reset it to false for next time
      if (this.sidebar()) {
        setTimeout(() => {
          this.reload.set(false);
        });
      }
    }, { allowSignalWrites: true });
  }

  addTask() {
    const toastMessage = this.toast.showToast();
    console.log(this.taskCreate.value);
    if (this.taskCreate.valid) {
      const payload: TTask = {
        title: this.taskCreate.get('task')?.value!,
        status: this.taskCreate.get('status')?.value!,
        priority: this.taskCreate.get('priority')?.value!,
        dueDate: this.taskCreate.get('dueDate')?.value?.toISOString()!,
        userId: this.configData.userDetail.userId!
      };
      this.taskService.addTaskAsync(payload).subscribe({
        next: () => {
          toastMessage.success('Task added successfully');
          this.taskCreate.reset();
          this.reload.set(true);
          this.sidebar.set(false);
          this.isCollapsed.set(false);
        },
        error: (err: Error) => {
          toastMessage.error(err);
        }
      })
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
  }

  protected updateTaskById() {
    if (this.updateTask.valid) {
      const payload: TTaskUpdate = {
        id: this.itemEditId()!,
        title: this.updateTask.get('task')?.value!,
        status: this.updateTask.get('status')?.value!,
        priority: this.updateTask.get('priority')?.value!,
        due_date: this.updateTask.get('dueDate')?.value?.toISOString()!
      };
      this.taskService.updateTaskAsync(payload).subscribe({
        next: () => {
          this.toast.showToast().success('Task updated successfully');
          this.updateTask.reset();
          this.reload.set(true);
          this.itemEditId.set('');
          this.sidebar.set(false);
        },
        error: (err: Error) => {
          this.toast.showToast().error(err);
        }
      });
    } else {
      if (this.updateTask.get('task')?.hasError('required')) {
        this.toast.showToast().warn('Task is required');
      }
      if (this.updateTask.get('dueDate')?.hasError('required')) {
        this.toast.showToast().warn('Due Date is required');
      }
      if (this.updateTask.get('priority')?.hasError('required')) {
        this.toast.showToast().warn('Priority is required');
      }
      if (this.updateTask.get('status')?.hasError('required')) {
        this.toast.showToast().warn('Status is required');
      }
    }
  }
}
