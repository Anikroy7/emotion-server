const express = require("express");
const router = express.Router();
const mediaController = require("../controller/media.controller");

router
  .route("/")
  .post(mediaController.createMedia)
  .get(mediaController.getMedia);

router
  .route("/:id")
  .get(mediaController.getMediaById)
  .put(mediaController.updateMedia)
  .delete(mediaController.deleteMedia);

module.exports = router;
