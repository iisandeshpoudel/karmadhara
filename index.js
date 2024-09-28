const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');
const college = require('./router/college');
const student = require('./router/student');
const login = require('./router/login');
const categories = require('./router/category');
const states = require('./router/state');
const services = require('./router/service');
const city = require('./router/city.js');

const API_VERSION = process.env.API_VERSION;
const DB_STRING = process.env.DB_STRING;
const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
const corsOptions = {
  exposedHeaders: 'auth',
};

app.use(cors(corsOptions));

// router
app.use(`${API_VERSION}/categoryImages/:id`, (req, res) => {
  res.sendFile(path.join(__dirname, `categoryImages/${req.params.id}.png`));
});
app.use(`${API_VERSION}/college`, college);
app.use(`${API_VERSION}/student`, student);
app.use(`${API_VERSION}/login`, login);
app.use(`${API_VERSION}/categories`, categories);
app.use(`${API_VERSION}/states`, states);
app.use(`${API_VERSION}/services`, services);
app.use(`${API_VERSION}/city`, city);

if (NODE_ENV === 'development') {
  app.use(morgan('tiny'));
}

if (NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')),
  );
}

//database connection
try {
  if (!DB_STRING) {
    console.error('Please Provide Valid DB STRING');
    process.exit(1);
  } else {
    mongoose.connect(DB_STRING);
    const db = mongoose.connection;
    console.log('NODE_ENV:', NODE_ENV);
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
      // Extract the database name from the connection string
      const dbName = DB_STRING.split('/').pop();
      console.log(`Database connected to ${dbName}`);
    });
  }
} catch (error) {
  console.log('Error connecting to database:', error);
}

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
