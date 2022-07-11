const express = require("express");
const router = express.Router();
const userController = require("../controller/users");

router.get("/profile", userController.getMyProfile);

router.put("/profile", userController.editProfile);

router.get("/favorite-songs", userController.getFavoriteSongList);

router.post("/favorite-songs", userController.addFavoriteSong);

router.delete("/favorite-songs", userController.removeFavoriteSong);

router.get("/genre-matrix", userController.getGenreMatrix);

router.put("/genre-matrix", userController.updateGenreMatrix);

router.put("/region", userController.updateUserRegion);

module.exports = router;
