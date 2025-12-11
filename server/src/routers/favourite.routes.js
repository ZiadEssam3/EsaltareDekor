const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/auth/authenticate.middleware");
const { authorizeRole } = require("../middlewares/auth/authorizeRoles.middleware");
const {
    addToFavouriteHandler,
    getFavouritesHandler,
    removeFromFavouriteHandler,
    clearFavouritesHandler

} = require("../controllers/favourite.controller");

router.post("/:productId", authenticate, authorizeRole("user"), addToFavouriteHandler);
router.get("/", authenticate, authorizeRole("user"), getFavouritesHandler);
router.delete("/:productId", authenticate, authorizeRole("user"), removeFromFavouriteHandler);
router.delete("/", authenticate, authorizeRole("user"), clearFavouritesHandler);
module.exports = router;