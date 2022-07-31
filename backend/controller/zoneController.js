const Zones = require("../models/zoneSchema");

const zoneController = {
  createZone: async (req, res) => {
    try {
      const { location, pinCode, fullAddress, phNo, email } = req.body;
      let zone = await Zones.findOne({
        pinCode: pinCode,
      });

      if (zone) {
        return res.status(500).json("Zone already exist");
      }

      const newZone = new Zones({
        location,
        pinCode,
        currZoneStatus: "green",
        totalIncidentOccured: 0,
        fullAddress,
        phNo,
        email,
      });

      let savedZone = await newZone.save();

      res.status(201).json("Zone created successfully");
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: err.message });
    }
  },

  gelAllzones: async (req, res) => {
    try {
      let allZones = await Zones.find({});
      res.status(201).json(allZones);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateZone: async (req, res) => {
    try {
      let _id = req.params.id;
      //console.log(_id);
      const { incidents } = req.body;
      // console.log(incidents);
      const zone = await Zones.findById({ _id });
      //  console.log(zone.totalIncidentOccured);
      const totalIncident = incidents + zone.totalIncidentOccured;

      let currStatus = "green";
      if (totalIncident >= 20 && totalIncident < 30) {
        currStatus = "yellow";
      } else if (totalIncident >= 30) {
        currStatus = "red";
      }

      const updatedZone = await Zones.findByIdAndUpdate(_id, {
        totalIncidentOccured: totalIncident,
        currZoneStatus: currStatus,
      });

      if (totalIncident > 10) {
        informToLocation(zone);
      }

      res.status(201).json("Zone updated successfully");
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const informToLocation = (zone) => {
  console.log("informing to zone" + zone);
};

module.exports = zoneController;
