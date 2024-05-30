var express = require('express');
var router = express.Router();
const { simpleScrapingsController } = require('../controllers');


/* GET scrapings listing. */

router.post('/', simpleScrapingsController.getSimpleScrapings);


module.exports = router;
