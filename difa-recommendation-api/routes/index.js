var express = require('express');
const { route } = require('./users');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/json', (req, res,) => {
  res.json({
    massage: 'hai nama saya reynaldi'
  });
});
module.exports = router;
