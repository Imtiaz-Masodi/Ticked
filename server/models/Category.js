const mongoose = require("mongoose");
const { COLOR_HEX_CODE_PATTERN } = require("../utils/constants");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, index: 1 },
  categoryColorCode: {
    type: String,
    validate: {
      // Regular expression to validate hex color code (both 3 and 6 characters long)
      validator: function (value) {
        // The value can either be a valid hex color code or be undefined/null
        if (!value) return true;
        return RegExp(COLOR_HEX_CODE_PATTERN).test(value);
      },
      message: (props) => `${props.value} is not a valid hex color code!`,
    },
  },
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
});

categorySchema.index({ name: 1, createdBy: 1 });

categorySchema.methods.omitInfo = function () {
  const category = this.toObject();
  delete category.__v;
  return category;
};

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
