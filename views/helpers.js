const hbs = require("hbs");

module.exports = () => {
  hbs.registerHelper("isSelected", (data, value) => {
    if (data == value) return "selected";
  });
};
