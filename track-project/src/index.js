require('./models/User');
require('./models/Track');
const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require('./middlewares/requireAuth');
const trackRoute = require('./routes/trackRoute');
// const bodyParse = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const app = express();
app.use(express.json()); // handle json
app.use(authRoutes);
app.use(trackRoute);
const mongoUri =
  "mongodb+srv://admin:admin@cluster0.ftgdl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(mongoUri);
mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});
mongoose.connection.on("error", (err) => {
  console.error("Error connecting to mongo", err);
});
app.get("/", requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
