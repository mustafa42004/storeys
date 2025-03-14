const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const mongoosePaginate = require("mongoose-paginate-v2");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    passwordChangedAt: Date,
  },
  { timestamps: true }
);

// using paginate plugin
userSchema.plugin(mongoosePaginate);

// pre save hook for hashing password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

// pre save hook for setting password changed At
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// user instance method for comparing passwords
userSchema.methods.comparePasswords = async (enteredPassword, storedPassword) =>
  await bcrypt.compare(enteredPassword, storedPassword);

// user instance method for setting password changed at date
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
