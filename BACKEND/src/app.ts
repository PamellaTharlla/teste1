
import express from 'express';
import cors from 'cors';  
import router from './routes/alimentos';

const app = express();

app.use(cors());  
app.use(express.json());
app.use("/alimentos", router);

export default app;