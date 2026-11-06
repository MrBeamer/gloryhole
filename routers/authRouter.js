import { Router } from "express";
import multer from "multer";
import passport from "passport";

import {
  renderSignUpForm,
  signUpUser,
  logInUser,
  logOutUser,
  grantMembership,
  renderEnterCodeForm,
} from "../controllers/authController.js";
import { isAuthenticated } from "../middleware/auth.js";

const upload = multer({ dest: "uploads/" });

const authRouter = Router();

authRouter.get("/sign-up", renderSignUpForm);
authRouter.post("/sign-up", upload.single("avatar"), signUpUser);
authRouter.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/",
    failureMessage: true,
  }),
  logInUser,
);
authRouter.post("/logout", isAuthenticated, logOutUser);
authRouter.get("/enter-code", isAuthenticated, renderEnterCodeForm);
authRouter.post("/enter-code", isAuthenticated, grantMembership);

export default authRouter;
