const models = require("../../models");
const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtConfig = require("../../configs/jwt");

exports.postSignin = async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.json({
      status: "Error",
      description: "Required params `email` or `password` are missed",
    });
  }

  const user = await models.Users.getUserByEmail(req.body.email);
  if (user) {
    const isPasswordCorrect = bcryptjs.compareSync(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      res.json({ status: "Error", description: "Wrong password!" });
    } else {
      const token = jwt.sign(
        { userId: user.id, userEmail: user.email, userName: user.name },
        jwtConfig.secret,
        jwtConfig.options
      );
      res.json({ status: "Successful", jwtToken: token });
    }
  } else {
    res.json({
      status: "Error",
      description: `No results matching ${req.body.email}`,
    });
  }
};

exports.postSignup = async (req, res, next) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.password ||
    !req.body.passwordConfirm
  ) {
    return res.json({
      status: "Error",
      description:
        "Missing some of required params `email`, `name, `password` or `passwordConfirm`",
    });
  }

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const passwordConfirm = req.body.passwordConfirm;

  const isExist = (await models.Users.getUserByEmail(email)) ? true : false;
  const arePasswordsMatch = password === passwordConfirm ? true : false;

  if (!isExist && arePasswordsMatch) {
    await models.Users.create(name, email, bcryptjs.hashSync(password, 12));
    const user = await models.Users.getUserByEmail(email);
    const token = jwt.sign(
      { userId: user.id, userEmail: user.email, userName: user.name },
      jwtConfig.secret,
      jwtConfig.options
    );

    res.json({ status: "Successful", jwtToken: token });
  } else if (isExist) {
    return res.json({
      status: "Error",
      description: "User with such email already exist!",
    });
  } else if (!arePasswordsMatch) {
    return res.json({
      status: "Error",
      description: "Passwords doesn't match!",
    });
  }
};

exports.checkJWT = async (req, res, next) => {
  if (!req.body.jwtToken) {
    return res.json({
      status: "Error",
      description: "Missing required param `jwtToken`",
    });
  }
  
  try {
    const tokenValidation = jwt.verify(req.body.jwtToken, jwtConfig.secret);
    console.log(tokenValidation);
    req.body.userId = tokenValidation.userId;
    next();
  } catch (err) {
    return res.json({
      status: "Error",
      description: "Invalid jwtToken!",
      errorMessage: err.message,
    });
  }
};
