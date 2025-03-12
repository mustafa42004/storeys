const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const routes = require("./config/allRoutes");
const amenityRoutes = require("./routes/amenityRoutes");
const fs = require("fs");
const globalErrorHandler = require("./controllers/errorController");

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow required methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow required headers
  })
);

// Serve static files from the uploads directory with proper URL path
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);
const BASE_URL = "/api/v1";
app.use(`${BASE_URL}/amenities`, amenityRoutes);

app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on : ${port}`);
});
