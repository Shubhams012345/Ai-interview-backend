import app from "./app.js";
import connectDb from "./config/db.js";
import env from "./config/env.js";
import seedJobsIfEmpty from "./utils/seedJobs.js";

const startServer = async () => {
  await connectDb();
  await seedJobsIfEmpty();
   
  app.get("/",(req,res)=>{
    res.send("Job service is live")
  })
  app.listen(env.port, () => {
    console.log(`Job service running on port ${env.port}`);
  });
};

startServer();

