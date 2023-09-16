export class BaseObject {
  isActive = true;
  timestamp = new Date();
}

export const path = {
	join: (...paths: string[]) =>
	  paths
		.map((part) => part.trim().replace(/(^[\/]*|[\/]*$)/g, ''))
		.filter((x) => x.length > 0)
		.join('/'),
  };
  