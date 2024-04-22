var express = require('express');
var router = express.Router();
const { scrapingsController } = require('../controllers');

/* GET scrapings listing. */

router.post('/', scrapingsController.getScrapings);


module.exports = router;
