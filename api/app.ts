import express, { Application, Request } from "express";
import cors from "cors"
import path from "path";

import { connect } from "./db";
import transactionRouter from "./routers/transactionsRouter";
import * as middleware from "./utils/middleware";
import usersRouter from "./routers/usersRouter";

const app: Application = express();

// Connecting to Database
connect(app);

// Running the build
app.use(express.static(path.join(__dirname, 'build')));
app.get('/add-user', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.get('/add-transaction', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.get('/user/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Middleware
app.use(express.json());
if (process.env.NODE_ENV !== 'test') {
  app.use(middleware.requestLogger);
}
app.use(cors<Request>())

// Setting Router to work for the /api route
app.use('/api/users', usersRouter);
app.use('/api/transactions', transactionRouter);

app.use(middleware.unknownEndpoint);

export default app;