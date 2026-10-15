import express from "express";
import cors from "cors";
import jobRoutes from "./routes/job.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Job service is running",
    data: {}
  });
});

app.use("/api/v1/jobs", jobRoutes);

app.use(errorMiddleware);

export default app;
