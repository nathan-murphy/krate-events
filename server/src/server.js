const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const path = require("path");
const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");
const potluckRouter = require("./routes/potluck.routes");
const potluckRsvpRouter = require("./routes/potluckRsvp.routes");
const bodyParser = require("body-parser");
const checkAuth = require("./middleware/check-auth");
const https = require("https");
const fs = require("fs");

// Load environment variables from the .env file, where the ATLAS_URI is configured
dotenv.config();

const { MONGODB_DBNAME, MONGODB_URI, APP_PORT, PRIVKEY, CERT } = process.env;

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

var useHttps = false;
if (!PRIVKEY || !CERT) {
  console.warn("No private key found, using non-secure server");
} else {
  useHttps = true;
}

mongoose
  .connect(`${MONGODB_URI}/${MONGODB_DBNAME}`)
  .then(() => {
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    potluckRsvpRouter.use(checkAuth);
    app.use("/api/auth", authRouter);
    app.use("/api/users", userRouter);
    app.use("/api/potluck", potluckRouter);
    app.use("/api/potluck-rsvp", potluckRsvpRouter);

    var staticPath = path.join(__dirname, "angular", "browser");
    app.use("/", express.static(staticPath));
    app.get("*", (req, res) =>
      res.sendFile(path.join(staticPath, "index.html"))
    );

    if (useHttps) {
      https
        .createServer(
          {
            key: fs.readFileSync(PRIVKEY),
            cert: fs.readFileSync(CERT),
          },
          app
        )
        .listen(443, () =>
          console.log(`Https server running at http://localhost:443...`)
        );
    } else {
      app.listen(APP_PORT, () => {
        console.log(`Http server running at http://localhost:${APP_PORT}...`);
      });
    }
  })
  .catch((error) => {
    console.log(`${MONGODB_URI}/${MONGODB_DBNAME}`);
    console.log(error);
  });
