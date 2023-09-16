import { BaseObject, path } from "./base";

export class Task extends BaseObject {
  title!: string;
  description!: string;
  status!: boolean;
  userId!: string;
}

export const taskCollectionGroup = `tasks`;
export const getTaskCollection = () => path.join(taskCollectionGroup);
export const getTaskPath = (taskId: string) =>
  path.join(getTaskCollection(), taskId);
