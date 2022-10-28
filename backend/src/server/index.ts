import session from "express-session";
import express, { Express } from "express";
import cors from "cors";
import mongoose from "mongoose";
import connectMongoDBSession from "connect-mongodb-session";
import { router } from "../routes/route";

require("dotenv").config();

const app: Express = express();
const adminPassword: any = process.env.DB_URI;
/*const corsOptions = {
  origin: "https://we-talk-rho.vercel.app/",
  methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
  optionsSuccessStatus: 200,
  credentials: true,
};
//https://we-talk-rho.vercel.app/
//http://localhost:3000

*/
const MongoDBStore = connectMongoDBSession(session);
const store = new MongoDBStore({
  uri: adminPassword,
  collection: "sessions",
  // expires: 1000,
});
const sessionOptions = {
  name: "session-id",
  store: store,
  secret: "WeAreCreatingASecretKeyForSessionHere",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: false,
    maxAge: Date.now() + 1000 * 60 * 60 * 24 * 7,
  },
};
app.set("trust proxy", 1);
app.use(session(sessionOptions));
//(corsOptions)
app.use(cors);
app.use(express.json());

app.use("/api", router);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    const db = await mongoose.connect(adminPassword);
    console.log("MONGODB SUCCESSFULLY CONNECTED,");
  } catch (err) {
    console.log("MONGODB ERROR IN CONNECTION....", err.message);
  }
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
};
startServer();
