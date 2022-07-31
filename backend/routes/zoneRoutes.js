const router = require("express").Router();
const zoneController = require("../controller/zoneController");
const auth = require("../middleware/auth");

router.post("/create-zone", auth, zoneController.createZone);
router.get("/all-zones", auth, zoneController.gelAllzones);
router.post("/update-zone/:id", auth, zoneController.updateZone);

module.exports = router;
