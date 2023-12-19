import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { connectToDatabase } from "./database";
import { userRouter } from "./user.routes";
import { potluckRouter } from "./potluck/potluck.routes";
import { potluckRsvpRouter } from "./potluck-rsvp/potluckRsvp.routes";
import bodyParser from "body-parser";

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

connectToDatabase(MONGODB_URI, MONGODB_DBNAME)
  .then(() => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cors());

    app.use("/users", userRouter);

    app.use("/api/potluck", potluckRouter);

    app.use("/api/potluck-rsvp", potluckRsvpRouter)

    app.use(express.static("../dist"));

    // start the Express server
    app.listen(APP_PORT, () => {
      console.log(`Server running at http://localhost:${APP_PORT}...`);
    });
  })
  .catch((error) => console.error(error));
