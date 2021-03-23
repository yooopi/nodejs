const models = require("../models");

exports.getChats = async (req, res, next) => {
  if (!req.session.userId) {
    res.redirect("/");
  } else {
    const chatsList = await models.Chats.getChatsList();
    res.render("chat", { chatsList: chatsList });
  }
};

exports.getChatById = async (req, res, next) => {
  if (!req.session.userId) res.redirect("/");
  if (!req.params.id) res.redirect("/chats");

  const messages = await models.ChatsMessages.getMessages(req.params.id);
  const chatsList = await models.Chats.getChatsList();
  res.render("chat", { chatsList: chatsList, messages: messages, chatId: req.params.id });
};

exports.postChat = async (req, res, next) => {
  const [result, fields] = await models.Chats.create(req.body.chatName);
  res.redirect(`/chats/${result.insertId}`);
};

exports.postMessage = async (req, res, next) => {
  await models.ChatsMessages.create(req.session.userId, req.body.message);
  console.log(req.params)
};
