import express from 'express';
import passport from 'passport';
import expressSession from 'express-session';
import logger from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes';
import initDb from './db';
import auth from './auth';
import notFound from './middlewares/notFound';
import errorHandler from './middlewares/errorHandler';

dotenv.config();
initDb();
auth();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(expressSession({ secret: 'nobody needs to know', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.authenticate('session'));

routes(app);

app.get('/', (req, res) => {
    res.json(req.user);
});

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.SERVER_PORT);
