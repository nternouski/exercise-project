import { Task } from "@models";

export class ResponseTask {
	success!: boolean; 
}

export class RequestPostTask {
  task!: Task;
}

export class RequestPatchTask {
  task!: Partial<Task>;
}
