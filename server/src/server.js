const dotenv = require("dotenv");
const mongoose = require ("mongoose");
const cors = require("cors");
const express = require("express");
const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");
const potluckRouter = require("./routes/potluck.routes");
const potluckRsvpRouter = require("./routes/potluckRsvp.routes");
const bodyParser = require("body-parser");
const checkAuth = require("./middleware/check-auth");

// Load environment variables from the .env file, where the ATLAS_URI is configured
dotenv.config();

const { MONGODB_DBNAME, MONGODB_URI, APP_PORT } = process.env;

if (!MONGODB_URI) {
  console.error(
    "No MONGODB_URI environment variable has been defined in config.env"
  );
  process.exit(1);
}

if (!MONGODB_DBNAME) {
  console.error(
    "No MONGODB_DBNAME environment variable has been defined in config.env"
  );
  process.exit(1);
}

if (!APP_PORT) {
  console.error(
    "No APP_PORT environment variable has been defined in config.env"
  );
  process.exit(1);
}

mongoose.connect(`${MONGODB_URI}/${MONGODB_DBNAME}`)
  .then(() => {
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use("/api/auth", authRouter);
    
    app.use("/api/users", userRouter);
    app.use(checkAuth);
    app.use("/api/potluck", potluckRouter);
    app.use("/api/potluck-rsvp", potluckRsvpRouter);

    // start the Express server
    app.listen(APP_PORT, () => {
      console.log(`Server running at http://localhost:${APP_PORT}...`);
    });
  })
  .catch(error => console.log(error))
