import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map, retry, take } from 'rxjs/operators';

import { UserService } from './user.service';

import { Task } from '@models';
import { RequestPatchTask, RequestPostTask } from '@payloads';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient, private userService: UserService) {}

  private getAuthHeaders = () =>
    this.userService.user
      .pipe(
        take(1),
        map(({ token }) => new HttpHeaders({ Authorization: token }))
      )
      .toPromise();

  private post<T, Q extends {} = object>(
    path: string,
    body: Partial<Q>,
    retries = 0
  ) {
    return this.getAuthHeaders().then((headers) =>
      this.http
        .post<T>(`api/${path}`, body, { headers })
        .pipe(retry(retries))
        .toPromise()
    );
  }

  private patch<T, Q extends {} = object>(
    path: string,
    body?: Partial<Q>,
    retries = 0
  ) {
    return this.getAuthHeaders().then((headers) =>
      this.http
        .patch<T>(`api/${path}`, body || {}, {
          headers,
        })
        .pipe(retry(retries))
        .toPromise()
    );
  }

  private get<T>(path: string, params = {}) {
    return this.getAuthHeaders().then((headers) =>
      this.http.get<T>(`api/${path}`, { params, headers }).toPromise()
    )
  }

  private delete<T>(path: string, params = {}) {
    return this.getAuthHeaders().then((headers) =>
      this.http.delete<T>(`api/${path}`, { params, headers }).toPromise()
    );
  }

  public async getTask(id: string) {
    const { task } = await this.get<{ task: Task }>(`tasks/${id}`);
    return task;
  }

  public async getTasks() {
    const { tasks } = await this.get<{ tasks: Task[] }>(`tasks`);
    return tasks;
  }

  public async addTask(request: RequestPostTask) {
    const { success } = await this.post<{ success: number }>(`tasks`, request).catch((error) => {
      console.log(error);
      return { success: false };
    });
    return success;
  }

  public async updateTask(taskId: string, request: RequestPatchTask) {
    const { success } = await this.patch<{ success: number }>(`tasks/${taskId}`, request).catch((error) => {
      console.log(error);
      return { success: false };
    });
    return success;
  }

  public async deleteTask(taskId: string) {
    const { success } = await this.delete<{ success: number }>(`tasks/${taskId}`, {}).catch((error) => {
      console.log(error);
      return { success: false };
    });
    return success;
  }
}
