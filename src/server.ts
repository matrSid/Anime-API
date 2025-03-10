import express from "express";
import { config } from "dotenv";
import { limiter } from "./middlewares/rateLimit";
import { router } from "./routes/routes";
import cors from "cors";

config(); // dotenv

const app = express();
const PORT = process.env.PORT ?? 3001;

// Enable CORS - Allow all origins with maximum permissiveness
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  credentials: true
}));

//middlewares
//app.use(limiter);

// router
app.use("/", router);

app.listen(PORT, () => {
  console.log(`⚔️  API started ON PORT : ${PORT} @ STARTED  ⚔️`);
});

export default app;
