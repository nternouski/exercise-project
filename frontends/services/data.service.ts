import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  query,
  addDoc,
  updateDoc,
  QueryConstraint,
  collectionSnapshots,
  where,
  doc,
  docSnapshots,
} from '@angular/fire/firestore';

import { map, shareReplay, take } from 'rxjs/operators';
import { Task, getTaskCollection, getTaskPath } from '@models';

@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(protected firestore: Firestore) {}

  public queryIsActive = [where('isActive', '==', true)];

  private createDocument(path: string, entity: any) {
    return addDoc(collection(this.firestore, path), entity);
  }

  private async updateDocument<T extends {}>(path: string, data: Partial<T>) {
    const document = await this.getDocument(path).pipe(take(1)).toPromise();
    return await updateDoc(doc(this.firestore, path), { ...document, ...data });
  }

  public getDocument<T extends {}>(path: string) {
    return docSnapshots(doc(this.firestore, path)).pipe(
      map((ss) => {
        const data = ss.data();
        if (ss.exists().valueOf() && data) {
          return Object.assign(data as T, { id: ss.id });
        } else {
          throw new Error(`no document found: ${path}`);
        }
      }),
      shareReplay(1)
    );
  }

  private queryCollection<T extends {}>(
    collectionPath: string,
    q: QueryConstraint[] = []
  ) {
    return collectionSnapshots(
      query(collection(this.firestore, collectionPath), ...q)
    ).pipe(
      map((ss) =>
        ss.map(
          (s) => Object.assign(s.data(), { id: s.id }) as T & { id: string }
        )
      ),
      shareReplay(1)
    );
  }

  public getTasks(userId: string) {
    return this.queryCollection<Task>(getTaskCollection(), [
      ...this.queryIsActive,
      where('userId', '==', userId),
    ]);
  }

  public createTask(task: Task) {
    return this.createDocument(getTaskCollection(), task);
  }

  public updateTask({ id, ...task }: Task & { id: string }) {
    return this.updateDocument(getTaskPath(id), task);
  }

  public deleteTask(taskId: string) {
    return this.updateDocument(getTaskPath(taskId), { isActive: false });
  }
}
