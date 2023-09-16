import { testFunction } from "../../../setup";

import { equal } from 'assert';
import { apiGet, signUpAnonymous } from "../../axios";

describe("API Cloud Functions", () => {
  after(() => {
    testFunction.cleanup();
  });

  it("/api/tasts - should return error on GET tasks", async () => {
    const anonymous = await signUpAnonymous();
    const errorResponse = await apiGet("/api/tasks/fake-id", {
      authorization: anonymous,
    }).catch((error) => error);
    equal(errorResponse.response.data.message, 'Task not found');
  });
});
