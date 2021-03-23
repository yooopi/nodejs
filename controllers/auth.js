const models = require("../models");
const bcryptjs = require("bcrypt");

exports.getSignin = (req, res, next) => {
  if (req.session.userId) return res.redirect("/orders");
  res.render("signin", { email: req.cookies.email });
};

exports.postSignin = async (req, res, next) => {
  const user = await models.Users.getUserByEmail(req.body.email);
  req.body.remember
    ? res.cookie("email", req.body.email)
    : res.clearCookie("email");

  if (!user) {
    res.render("signin", {
      email: req.body.email,
      error: `No results matching ${req.body.email}`,
    });
  }

  const isPasswordCorrect = bcryptjs.compareSync(
    req.body.password,
    user.password
  );

  if (!isPasswordCorrect) {
    return res.render("signin", {
      email: req.body.email,
      error: `Wrong password!`,
    });
  }

  req.session.userId = user.id;
  req.session.userName = user.name;
  res.redirect("/orders");
};

exports.googleSignin = async (req, res, next) => {
  req.session.userId = req.user.id;
  req.session.userName = req.user.name;
  res.redirect("/orders");
};

exports.getSignup = (req, res, next) => {
  if (req.session.userId) return res.redirect("/orders");
  res.render("signup");
};

exports.postSignup = async (req, res, next) => {
  const {name, email, password, passwordConfirm} = req.body;

  const isExist = (await models.Users.getUserByEmail(email));
  const arePasswordsMatch = password === passwordConfirm;

  if (!isExist && arePasswordsMatch) {
    await models.Users.create(name, email, bcryptjs.hashSync(password, 12));
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

exports.postSignout = async (req, res, next) => {
  await req.session.destroy();
  res.redirect("/signin");
};
