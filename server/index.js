import express from 'express';
import cors from 'cors';
import {createServer} from 'http';
import connectDb from './config/connectDb.js';
import initializeSocket from './utils/initializeSocket.js';
import router from './routes/index.js';

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(
    cors({
        origin: "*",
        methods: "*",
    })
);

app.use(router)

const server = createServer(app);
initializeSocket(server);

server.listen(8000, async () => {
        await connectDb();
        console.log(`Server started`);
});