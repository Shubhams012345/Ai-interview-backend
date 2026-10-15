import express from "express";
import cors from "cors";
import resumeRoutes from "./routes/resume.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Resume service is running",
    data: {}
  });
});

app.use("/api/v1/resumes", resumeRoutes);

app.use(errorMiddleware);

export default app;
