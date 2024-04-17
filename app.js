const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
require('dotenv').config();
const { initPuppeteer } = require('./utils/puppeteerBrowser');
const pagePoolManager = require('./utils/pagePoolManager');
const compression = require('compression')

// Initialize the Puppeteer browser and page pool manager
async function init() {
  await initPuppeteer(); // Ensures Puppeteer browser is started
  await pagePoolManager.init(); // Initializes the page pool with pages
}


init().then(() => console.log('Initialization complete.'))
     .catch(err => console.error('Failed to initialize:', err));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(cookieParser());
app.use(routes);


app.use(function(req, res, next) {
  next(createError(404));
});

app.use(errorHandler);




module.exports = app;
