const models = require("../models");

exports.getSignin = (req, res, next) => {
  if (req.session.userId) {
    res.redirect("/orders");
  } else {
    res.render("signin");
  }
};

exports.postSignin = async (req, res, next) => {
  const user = await models.Users.getUserByEmail(req.body.email);

  if (user) {
    if (user.password !== req.body.password) {
      res.render("signin", { error: `Wrong password!` });
    } else {
      req.session.userId = user.id;
      req.session.userName = user.name;
      res.redirect("/orders");
    }
  } else {
    res.render("signin", { error: `No results matching ${req.body.email}` });
  }
};

exports.getSignup = (req, res, next) => {
  if (req.session.userId) {
    res.redirect("/orders");
  } else {
    res.render("signup");
  }
};

exports.postSignup = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const passwordConfirm = req.body.passwordConfirm;

  const isExist = (await models.Users.getUserByEmail(email)) ? true : false;
  const arePasswordsMatch = password === passwordConfirm ? true : false;

  if (!isExist && arePasswordsMatch) {
    await models.Users.create(name, email, password);
    const user = await models.Users.getUserByEmail(email);

    req.session.userId = user.id;
    req.session.userName = user.name;
    res.redirect("/orders");
  } else if (isExist) {
    res.render("signup", {
      error: `User with such email already exist!`,
      name: name,
      email: email,
    });
  } else if (!arePasswordsMatch) {
    res.render("signup", {
      error: `Passwords doesn't match!`,
      name: name,
      email: email,
    });
  }
};

exports.postSignout = (req, res, next) => {
  req.session.destroy();
  res.redirect("/signin");
};
