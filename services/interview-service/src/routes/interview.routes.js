import express from "express";
import { start, continueInterview, end, getAll, getOne } from "../controllers/interview.controller.js";

const router = express.Router();

router.post("/start", start);
router.post("/:id/continue", continueInterview);
router.post("/:id/end", end);
router.get("/", getAll);
router.get("/:id", getOne);

export default router;
