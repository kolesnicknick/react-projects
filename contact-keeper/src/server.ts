import * as express from 'express';
import Router from './routes/index';
import { Express } from 'express-serve-static-core';
import * as db from './config/db';
import { response } from 'express';
import path from 'path';


const app: Express = express();

db.connectDB();

app.use(express.json({ extended: false }));

const add = (a: number, b: number): number => a + b;

Router.configure(app);

if(process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('../client/build'));
    app.get('*', (req, res) => {
        return response.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'))
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`);
});
