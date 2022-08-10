// initial config
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// read json config
// middlewares
app.use(express.urlencoded({ extended: true })); // middleware
app.use(express.json()); // middleware

const routes = require('./routes/cripto-routes');

app.use('/criptos', routes);
app.use(cors({ origin: '*' }));

// initial route
app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

// set a port
mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cripto-cluster.v6zh5f1.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(process.env.PORT || 3000);
    console.log('Connection Stablished');
  })
  .catch((connectionError) => console.log(connectionError));

// mongodb+srv://cripto-user:cripto123@cripto-cluster.v6zh5f1.mongodb.net/?retryWrites=true&w=majority