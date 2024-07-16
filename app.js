// require("dotenv").config();
// const express = require("express");
// const app = express();
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const connectDB = require("./src/config/db");
// const routes = require("./src/routes");
// const { errorHandler } = require("./src/middleware/errorHandler");

// app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(errorHandler);
// app.use(cors());
// app.use("/dev", routes);

// // for multer if needed
// // Serve static files from the "uploads" directory
// // app.use("/dev/images/uploads", express.static("src/uploads"));

// app.get("/health", (req, res) => {
//   console.log("health check");
//   res.status(200).send("up");
// });

// // Connect Database
// connectDB()
//   .then(() => {
//     console.log(
//       "Connection to the database has been established successfully."
//     );
//   })
//   .catch((error) => {
//     console.error("Unable to connect to the database:", error);
//   });

// const PORT = 4000;

// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./src/config/db");
const routes = require("./src/routes");
const { errorHandler } = require("./src/middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 4000;

// Enable CORS for all routes or configure it for specific origins
const corsOptions = {
  origin: [
    // "http://localhost:3000",
    "https://669687fdf619af34ae4dd13e--smm-fe.netlify.app",
  ], // specify your allowed origins
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// Handle preflight requests
app.options("*", cors(corsOptions));

// Middleware to log requests for debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  console.log("Headers:", req.headers);
  next();
});

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get("/public", (req, res) => {
  res.status(200).json({
    message: "This is a public API endpoint.",
  });
});
app.use("/dev", routes);
app.get("/health", (req, res) => {
  console.log("health check");
  res.status(200).send("up");
});

// Error Handler (should be after routes)
app.use(errorHandler);

// Connect Database
connectDB()
  .then(() => {
    console.log(
      "Connection to the database has been established successfully."
    );
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

// Start the server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
