const express = require("express");
const router = express.Router();
const items = require("../controllers/items.controller")

router.route('/items')
    .get(items.getAll)
    .post(items.create)
    .put(items.update);

router.route('/items/tags')
    .get(items.getTags);

module.exports = router;