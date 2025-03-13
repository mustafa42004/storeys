const mongoose = require("mongoose");
require("dotenv").config();

function connectToDB() {
  mongoose
    .connect(
      process.env.DATABASE_URI.replace(
        "<db_password>",
        process.env.DATABASE_PASSWORD
      ),
      { autoIndex: true }
    )
    .then(() => console.log("DB Connected Successfully ✅"))
    .catch((err) => console.log(`DB CONNECTION ERROR💥: ${err.message}`));

  // mongoose.connection.on("connected", () => {
  //   console.log("Database connected...");
  // });
  // mongoose.connection.on("error", (err) => {
  //   console.log(err);
  // });
}

module.exports = connectToDB;
