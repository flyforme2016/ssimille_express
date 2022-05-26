const express = require('express');
const router = express.Router();
const spotifyController = require('../controller/spotify_controller')

router.get('/oauth/callback', function(req, res, next) {
    console.log('Enter server')
    res.render('loading');
  }
);

router.post('/updateCurrentMusic', spotifyController.updateCurrentMusic)

module.exports = router;