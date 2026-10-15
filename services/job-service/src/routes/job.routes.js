import express from "express";
import {
  search,
  create,
  save,
  saved,
  apply,
  applied,
  recommend,
  skillGap,
  rank
} from "../controllers/job.controller.js";

const router = express.Router();

router.get("/search", search);
router.post("/", create);
router.post("/save", save);
router.get("/saved", saved);
router.post("/apply", apply);
router.get("/applied", applied);
router.post("/recommend", recommend);
router.post("/skill-gap", skillGap);
router.post("/rank", rank);

export default router;
