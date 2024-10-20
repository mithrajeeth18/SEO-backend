const express = require("express");
const aiRoutes = require("./routes/AIRoute");
const seoRoutes = require("./routes/seoRoutes");
const cors = require("cors");
//const errorHandler = require("./middleware/errorHandler");


const app = express();
const corsOptions = {
  origin: "*", // Change this to your frontend's URL in production
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/ai", aiRoutes);
app.use("/api/seo", seoRoutes);



//app.use(errorHandler);

module.exports = app;
