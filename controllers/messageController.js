import { addMessageToDb } from "../db/queries.js";

export const renderMessageBoard = (req, res) => {
  res.render("messages", { title: "Gloryhole" });
};

export const createMessage = async (req, res) => {
  console.log("createMessage");
  const { secretMessage } = req.body;
  console.log(secretMessage);
  const user = req.user;
  await addMessageToDb(user.username, secretMessage, user.id);
  res.redirect("/messages");
};
