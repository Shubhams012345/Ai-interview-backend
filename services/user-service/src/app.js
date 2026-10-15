import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "User service is running",
    data: {}
  });
});

app.use("/api/v1/users", userRoutes);

app.use(errorMiddleware);

export default app;
