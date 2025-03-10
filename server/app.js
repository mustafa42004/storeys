const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const routes = require("./config/allRoutes");
const amenityRoutes = require("./routes/amenityRoutes");

app.use(express.json());
app.use(express.static(path.join(__dirname, "uploads")));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow required methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow required headers
  })
);
app.use(routes);
app.use("/api/v1/amenities", amenityRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on : ${port}`);
});
