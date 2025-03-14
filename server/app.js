require("dotenv").config();
const express = require("express");
const connectToDB = require("./config/dataBase");
const app = express();
const path = require("path");
const cors = require("cors");
const propertyRoutes = require("./routes/propertyRoutes");
const amenityRoutes = require("./routes/amenityRoutes");
const authRoutes = require("./routes/authRoutes");
const newsRoutes = require("./routes/newsRoutes");
const teamRoutes = require("./routes/teamRoutes");
const contactRoutes = require("./routes/contactRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const fs = require("fs");
const globalErrorHandler = require("./controllers/errorController");
const ApiError = require("./utils/ApiError");
const morgan = require("morgan");

connectToDB();

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

app.use(morgan("dev"));
// Serve static files from the uploads directory with proper URL path
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const BASE_URL = "/api/v1";
app.use(`${BASE_URL}/auth`, authRoutes);
app.use(`${BASE_URL}/properties`, propertyRoutes);
app.use(`${BASE_URL}/amenities`, amenityRoutes);
app.use(`${BASE_URL}/news`, newsRoutes);
app.use(`${BASE_URL}/teams`, teamRoutes);
app.use(`${BASE_URL}/contacts`, contactRoutes);
app.use(`${BASE_URL}/testimonials`, testimonialRoutes);

// Handle all routes that are not defined
app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on : ${port}`);
});
