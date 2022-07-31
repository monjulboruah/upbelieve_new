const router = require("express").Router();
const incidentController = require("../controller/incidentController");
const auth = require("../middleware/auth");

router.post("/create-incident", auth, incidentController.createIncident);

router.post("/update-incident/:id", auth, incidentController.updateIncident);

router.get("/all-incident", auth, incidentController.getAllIncident);

router.get(
  "/all-incident-in-a-location",
  auth,
  incidentController.incidentsOfAParticularLocation
);

module.exports = router;
