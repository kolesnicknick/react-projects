import * as express from 'express';
import Router from "./routes/index";

const app: express.Application = express();

const add = (a: number, b: number): number => a+b;

Router.configure(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`)
});