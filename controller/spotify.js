var SpotifyWebApi = require("spotify-web-api-node");
require("dotenv").config();
const credentials = {
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: `${process.env.BASE_URL}/spotify/oauth/callback`,
};
const spotifyApi = new SpotifyWebApi(credentials);
exports.getAccessToken = async (req, res) => {
  try {
    //access token을 req로 받음
    spotifyApi.authorizationCodeGrant(req.body.code).then(
      function (data) {
        res.json(data);
      },
      function (err) {
        res.send("Failed spotify authentication");
      }
    );
  } catch (error) {
    res.send("Failed spotify authentication");
  }
};
