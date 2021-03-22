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
  console.log(messages);
  const chatsList = await models.Chats.getChatsList();
  res.render("chat", { chatsList: chatsList, messages: messages, chatId: req.params.id });
};

exports.postChat = async (req, res, next) => {
  await models.Chats.create(req.body.chatName);
  res.redirect("/chats");
};

exports.postMessage = async (req, res, next) => {
  await models.ChatsMessages.create(req.session.userId, req.body.message);
};
