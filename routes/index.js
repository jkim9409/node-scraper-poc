var express = require('express');
var router = express.Router();
const scrapingsRouter = require('./scrapings');
const simpleScrapingsRouter = require('./simpleScrapings');


// Mount the scrapings routes on the '/scrapings' path
router.use('/scrapings', scrapingsRouter);
router.use('/simpleScrapings', simpleScrapingsRouter);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('healthy')
});

module.exports = router;
