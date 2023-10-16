import express,{Request, Response, NextFunction} from 'express'
import {port} from './config'
import { config } from 'process'

const app = express()
app.use(express.json());
app.post('/metrics', (req: Request, res: Response, next:NextFunction) => {
  try {
    

  } catch (error) {
    next(error)
  }
    
})

app.get("/metrics", (req: Request, res: Response, next: NextFunction) => {
	try {
	} catch (error) {
		next(error);
	}
});

app.post("/metrics", (error: Error, req: Request, res: Response, next: NextFunction) => {
	try {
	} catch (error) {
		next(error);
	}
});

app.listen(Port, ()=> console.log(`Server Listening At Port ${Port}`))