import { Router, Request, Response, NextFunction } from "express";
import { createDocPath,  getDocument, updateDoc } from "src/services/database";
import { Task, getTaskCollection, getTaskPath } from "@models";
import { RequestPostTask, ResponseTask } from "@payloads";

const router = Router();

router.get(":id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const task = await getDocument(getTaskPath(id));
    res.status(200).json({ task });
  } catch (error) {
    next(error);
  }
});

router.post("", async (req: Request<{}, ResponseTask, RequestPostTask>, res: Response, next: NextFunction) => {
  try {
    const task = req.body.task;
    if (task.userId !== req.locals.userId) {
      return res.status(401).json({ success: false });
    }
    await createDocPath(getTaskCollection(), task);
    return res.status(201).json({ success: true });
  } catch (error) {
    return next(error);
  }
});

router.patch(":id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;

    const task = await getDocument<Task>(getTaskPath(id));
    if (task.userId !== req.locals.userId) {
      return res.status(401).json({ success: false });
    }
    await updateDoc(getTaskPath(task.id), task, true);
    return res.status(200).json({ success: true });
  } catch (error) {
    return next(error);
  }
});

router.delete(":id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const task = await getDocument<Task>(getTaskPath(id));
    if (task.userId !== req.locals.userId) {
      return res.status(401).json({ success: false });
    }
    await updateDoc(getTaskPath(task.id), { isActive: false }, true);
    return res.status(200).json({ success: true });
  } catch (error) {
    return next(error);
  }
});

export const listener = router;
