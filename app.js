import express from "express";
import indexRouter from "./routers/indexRouter.js";
import authRouter from "./routers/authRouter.js";
import path from "path";
import session from "express-session";
import passport from "passport";
// 1. IMPORT SEPARATE PASSPORT FILE HERE!
// (Adjust the relative path to wherever your passport.js actually lives)
import "./middleware/passport.js";
import messageRouter from "./routers/messageRouter.js";

// Creates the Express application instance
const app = express();

// Makes it possible to read the object from the form
app.use(express.urlencoded({ extended: true }));
// 1. Session setup FIRST (creates req.session)
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
// 2. Initialize Passport SECOND (attaches authentication tools to req)
app.use(passport.initialize());
// 3. Connect Passport to sessions THIRD (uses req.session to store/retrieve the user)
app.use(passport.session());

//makes possible to access currentUser across the app, instead of needing to pass in in every ejs file
app.use((req, res, next) => {
  console.log("Session ID:", req.sessionID);
  console.log(
    "Is Authenticated?:",
    req.isAuthenticated ? req.isAuthenticated() : false,
  );
  console.log("User in middleware:", req.user);
  res.locals.currentUser = req.user;
  next();
});

app.use(express.static(path.join(import.meta.dirname, "public")));
// Serve files from the "uploads" folder publicly under the "/uploads" URL path.
const uploadsPath = express.static(path.join(import.meta.dirname, "uploads"));
app.use("/uploads", uploadsPath);

// Tells Express that all view templates are stored inside the /views directory
const viewPath = path.join(import.meta.dirname, "views");
app.set("views", viewPath);
// Configures EJS as the template engine for rendering views
app.set("view engine", "ejs");
app.use("/messages", messageRouter);
// Routes all requests starting at "/" to the indexRouter
app.use("/", indexRouter);
app.use("/", authRouter);

// Sets the server port from environment variables, defaulting to 3000
const PORT = process.env.PORT || 3000;

// Starts the HTTP server and listens for incoming connections on the specified port
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Server is running on ${PORT}`);
});
