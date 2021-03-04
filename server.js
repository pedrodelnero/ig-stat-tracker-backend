import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import session from 'express-session';
import cookieParser from 'cookie-parser';

import routes from './routes/routers.js';

const port = process.env.PORT || 5000;
const app = express();
app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(
//   session({
//     key: 'userId',
//     secret: process.env.EXPRESS_SESS_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       httpOnly: false,
//       expires: 60 * 60 * 8 * 1000,
//     },
//   })
// );

app.use('/', routes);

app.listen(port, () => console.log(`listening in port ${port}`));
