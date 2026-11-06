import bcrypt from "bcryptjs";
import "dotenv/config";

import { addUserToDB, updateUserMembership } from "../db/queries.js";

export const renderSignUpForm = async (req, res) => {
  res.render("sign-up", { title: "Gloryhole" });
};

export const signUpUser = async (req, res) => {
  try {
    /// fix status check
    const status = res.status;
    console.log(status);
    const { firstname, lastname, username, email } = req.body;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log(req.body);
    const avatar = req.file.filename;
    console.log(req.file);
    await addUserToDB(
      firstname,
      lastname,
      username,
      email,
      hashedPassword,
      avatar,
    );

    res.redirect("/");
  } catch (error) {
    throw new Error(`Sign-up failed: ${error.message}`, { cause: error });
  }
};

export const logInUser = async (req, res) => {
  res.redirect("/");
};

export const logOutUser = async (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

export const renderEnterCodeForm = (req, res) => {
  res.render("enter-code", { title: "Gloryhole" });
};

export const grantMembership = async (req, res) => {
  const { inviteCode } = req.body;
  if (inviteCode !== process.env.CLUB_INVITE_CODE) {
    res.redirect("/");
  }
  const user = req.user;
  const userId = user.id;
  console.log("membership for:");
  console.log(user);
  try {
    await updateUserMembership(userId);
    res.redirect("/");
  } catch (error) {
    throw new Error(`Granting membership failed: ${error.message}`, {
      cause: error,
    });
  }
};
