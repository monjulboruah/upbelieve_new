const { model, Schema } = require("mongoose");

const incidentSchema = new Schema(
  {
    incidentName: String,
    description: String,
    location: String,
    pinCode: String,
    customerName: String,
    hasComplaint: {
      type: Boolean,
      defualt: false,
    },
    item: String,
    price: String,
    pointOfOccurance: String,
    isResolved: Boolean,
    resolveSummary: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Incidents", incidentSchema);
