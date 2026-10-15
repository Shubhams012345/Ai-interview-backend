import app from "./app.js";
import connectDb from "./config/db.js";
import env from "./config/env.js";

const startServer = async () => {
  await connectDb();
  
  app.get("/",(req,res)=>{
    res.send("Interview service is live")
  })
  app.listen(env.port, () => {
    console.log(`Interview service running on port ${env.port}`);
  });
};

startServer();
