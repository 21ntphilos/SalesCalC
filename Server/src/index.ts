import express,{Request, Response, NextFunction} from 'express'
import { port, CLIENT } from "./config";
import {post, allMetrics} from './Controllers'
import cors from 'cors'

const app = express()
app.use(cors({ origin: "https://salesmetric.vercel.app/" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", async (req: Request, res: Response, next: NextFunction) => {
	try {
		res.status(201).json({
			Message: "WELCOME TO SALES"
		});
	} catch (error) {
		next(error);
	}
});

app.post('/metric', post)
app.get("/metrics", allMetrics);
app.get("/metric/:id", );


app.use("/", (error: Error, req: Request, res: Response) => {
  
    res.status(400).json({
      message: error.message,
      stack: error.stack,
      name: error.name
    });

});

app.listen(port, ()=> console.log(`Server Listening At Port ${port}`))