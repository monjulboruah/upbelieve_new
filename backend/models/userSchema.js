const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    email: String,
    password: String,
    mobileNo: String,
    role: {
      type: String,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Users", userSchema);
