var express = require('express');
var router = express.Router();
const scrapingsRouter = require('./scrapings');


// Mount the scrapings routes on the '/scrapings' path
router.use('/scrapings', scrapingsRouter);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('healthy')
});

module.exports = router;
