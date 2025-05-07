import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', authRoutes); // Use auth route

app.get("/", (_req, res) => {
  res.send("API is running...");
});

export default app;
