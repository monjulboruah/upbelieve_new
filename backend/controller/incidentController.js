const { response } = require("express");
const Incidents = require("../models/incidentSchema");
const Zones = require("../models/zoneSchema");
const sendEmail = require("../utils/sendEmail");

const incidentController = {
  createIncident: async (req, res) => {
    try {
      const {
        incidentName,
        description,
        pinCode,
        location,
        customerName,
        item,
        hasComplaint,
        price,
        pointOfOccurance,
      } = req.body;

      console.log(req.body);

      const newIncident = new Incidents({
        incidentName,
        description,
        pinCode,
        location,
        customerName,
        hasComplaint,
        item,
        price,
        pointOfOccurance,
        isResolved: false,
      });

      let savedIncident = await newIncident.save();

      console.log(hasComplaint === "true");
      let response = await updateToLocation(
        pinCode,
        hasComplaint === "true" ? 1 : 0
      );

      if (response) {
        res.status(201).json("Incidents created successfully");
      } else {
        res.status(500).json("Incidents creation unsuccessfull");
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: err.message });
    }
  },

  getAllIncident: async (req, res) => {
    try {
      let allIncident = await Incidents.find({});
      // console.log(allIncident);
      res.status(200).json(allIncident);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateIncident: async (req, res) => {
    try {
      let _id = req.params.id;
      const { pinCode, isResolved, resolveSummary } = req.body;
      const updatedIncident = await Incidents.findByIdAndUpdate(_id, {
        isResolved,
        resolveSummary,
      });

      let respose = await updateToLocation(
        pinCode,
        isResolved === "true" ? -1 : 0
      );
      if (response) {
        res.status(201).json("Incidents updated successfully");
      } else {
        res.status(500).json("Incident update unsuccessfull");
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  incidentsOfAParticularLocation: async (req, res) => {
    try {
      const { location } = req.body;
      const allIncident = await Incidents.find({
        location,
      });
      res.status(201).json(allIncident);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const updateToLocation = async (pinCode, val) => {
  const zone = await Zones.findOne({
    pinCode: pinCode,
  });

  console.log(zone.totalIncidentOccured);

  const totalIncident = zone.totalIncidentOccured + val;
  const email = zone.email;

  let currStatus = "green";

  if (totalIncident >= 20 && totalIncident < 30) {
    currStatus = "yellow";
  } else if (totalIncident >= 30) {
    currStatus = "red";
  }

  const updatedZone = await Zones.updateOne(
    { pinCode: pinCode },
    {
      totalIncidentOccured: totalIncident,
      currZoneStatus: currStatus,
    }
  );

  if (totalIncident >= 0) {
    sendEmail(email, pinCode, currStatus, totalIncident);
  }

  return updatedZone;
};

module.exports = incidentController;
