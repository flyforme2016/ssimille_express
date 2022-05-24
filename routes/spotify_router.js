const express = require('express');
const router = express.Router();

router.get('/oauth/callback', function(req, res, next) {
    console.log('Enter server')
    res.render('loading');
  });

module.exports = router;