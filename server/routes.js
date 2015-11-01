var express = require('express');
var router = express.Router();

// index
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Polymer Startup' });
});

// Add more routes here...

module.exports = router;
