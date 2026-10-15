import express from "express";
import { upload, getAll,getOne,remove,analyze,atsScore,compareJd,improve} from "../controllers/resume.controller.js";
import uploadMiddleware from "../middlewares/upload.middleware.js";

const router = express.Router();

router.post("/upload", uploadMiddleware.single("resume"), upload);
router.get("/", getAll);
router.get("/:id", getOne);
router.delete("/:id", remove);
router.post("/:id/analyze", analyze);
router.post("/:id/ats-score", atsScore);
router.post("/:id/compare-jd", compareJd);
router.post("/:id/improve", improve);

export default router;
