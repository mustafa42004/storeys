const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

// Move designation order to the model since it's specific to team sorting
const designationOrder = {
  "Founder & CEO": 1,
  CEO: 1, // alternate format
  "Co Founder": 2,
  "Co-founder": 2, // alternate format
  "Director of Sales": 3,
  "Sales Director": 3, // alternate format
  "Area Manager": 4,
  "Senior Portfolio Manager": 5,
  "Senior Manager": 5, // equivalent level
  "Portfolio Manager": 6,
  "Portfolio manager": 6, // handle case variation
  "ortfolio Manager": 6, // handle typo
};

const teamSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      default: "",
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      default: "",
      required: [true, "Last name is required"],
      trim: true,
    },
    designation: {
      type: String,
      default: "",
      required: [true, "Designation is required"],
      trim: true,
    },
    profile: {
      s3Url: { type: String, default: "" },
      s3Key: { type: String, default: "" },
    },
  },
  { collection: "team", timestamps: true }
);

teamSchema.post("find", function (docs, next) {
  if (docs) {
    docs.sort((a, b) => {
      // Normalize designations by trimming and converting to lowercase
      const normalizeDesignation = (designation) => {
        return designation.trim().toLowerCase().replace(/-/g, " ");
      };

      // Get order values, defaulting to Infinity if not found
      const getOrderValue = (designation) => {
        // Try exact match first
        if (designationOrder[designation]) {
          return designationOrder[designation];
        }

        // Try normalized match
        const normalized = normalizeDesignation(designation);
        const matchingKey = Object.keys(designationOrder).find(
          (key) => normalizeDesignation(key) === normalized
        );

        return matchingKey ? designationOrder[matchingKey] : Infinity;
      };

      const orderA = getOrderValue(a.designation);
      const orderB = getOrderValue(b.designation);

      return orderA - orderB;
    });
  }
  next();
});

// using paginate plugin
teamSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("team", teamSchema);
