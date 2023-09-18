import { Component, ChangeDetectionStrategy } from "@angular/core";

import { DataService } from "@services/data.service";
import { ApiService } from "@services/api.service";
import { Task } from "@models";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserService } from "@services/user.service";
import { BehaviorSubject, combineLatest } from "rxjs";
import { shareReplay, switchMap, map } from "rxjs/operators";
import { BaseObject } from "@models";
import { ActivatedRoute } from "@angular/router";

interface TaskForm {
  title: FormControl<string>;
  description: FormControl<string>;
  status: FormControl<boolean>;
}

@Component({
  selector: "tasks-app",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksComponent {
  public useHttp = this.route.queryParams
    .pipe(map(({ useHttp }) => useHttp === "true"))
    .pipe(shareReplay(1));

  public componentData = combineLatest([
    this.userService.user,
    this.useHttp,
  ]).pipe(
    switchMap(([{ authUser }, useHttp]) =>
      this.dataService
        .getTasks(authUser.uid)
        .pipe(map((tasks) => ({ userId: authUser.uid, tasks, useHttp })))
    ),
    shareReplay(1)
  );

  public editTaskId = new BehaviorSubject<string>("-");
  public editTaskId$ = this.editTaskId.asObservable().pipe(shareReplay(1));

  private resetTask = { title: "", description: "", status: false };
  public formTask = new FormGroup<TaskForm>({
    title: new FormControl(this.resetTask.title, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: new FormControl(this.resetTask.description, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    status: new FormControl(this.resetTask.status, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  constructor(
    private dataService: DataService,
    private userService: UserService,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}

  public initEdit(task: Task & { id: string }) {
    this.formTask.setValue({
      title: task.title,
      description: task.description,
      status: task.status,
    });
    this.editTaskId.next(task.id);
  }

  public addTask(userId: string, useHttp: boolean) {
    if (this.formTask.valid) {
      const task: Task = {
        title: this.formTask.value.title!,
        description: this.formTask.value.description!,
        status: this.formTask.value.status!,
        userId,
        ...new BaseObject(),
      };
      (useHttp
        ? this.apiService.addTask({ task })
        : this.dataService.createTask(task)
      ).then(() => this.formTask.setValue(this.resetTask));
    }
  }

  public updateTask(taskId: string, userId: string, useHttp: boolean) {
    if (this.formTask.valid) {
      const task: Task & { id: string } = {
        id: taskId,
        title: this.formTask.value.title!,
        description: this.formTask.value.description!,
        status: this.formTask.value.status!,
        userId,
        ...new BaseObject(),
      };

      (useHttp
        ? this.apiService.updateTask(taskId, { task })
        : this.dataService.updateTask(task)
      ).then(() => {
        this.editTaskId.next("-");
        this.formTask.setValue(this.resetTask);
      });
    }
  }

  public deleteTask(taskId: string, useHttp: boolean) {
    if (!confirm("Are you sure you want to delete this task?")) return;
    useHttp
      ? this.apiService.deleteTask(taskId)
      : this.dataService.deleteTask(taskId);
  }
}
