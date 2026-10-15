import app from "./app.js";
import env from "./config/env.js";

app.get("/",(req,res)=>{
  res.send("Gateway is live")
})
app.listen(env.port, () => {
  console.log(`API Gateway running on port ${env.port}`);
});
