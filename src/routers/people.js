const express = require("express");
const router = express.Router();
const controller = require("../controllers/PersonController");

router.post("/", controller.create);
router.get("/", controller.readAll);
router.get("/:id", controller.read);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

module.exports = router;
