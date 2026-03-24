import { Router, type IRouter } from "express";
import healthRouter from "./health";
import projectsRouter from "./projects";
import contactLeadsRouter from "./contact-leads";

const router: IRouter = Router();

router.use(healthRouter);
router.use(projectsRouter);
router.use(contactLeadsRouter);

export default router;
