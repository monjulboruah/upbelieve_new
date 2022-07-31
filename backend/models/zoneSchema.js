const { model, Schema } = require("mongoose");

const zoneSchema = new Schema(
  {
    location: String,
    currZoneStatus: String,
    totalIncidentOccured: Number,
    fullAddress: String,
    phNo: String,
    email: String,
    pinCode: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Zones", zoneSchema);
