const names = require("./names.json");

module.exports = function (app) {
  app.get("/api/search/:name?", (req, res) => {
    const { name } = req.params;
    const pattern = new RegExp(name, "i");
    res.send(
      names.filter((n) => pattern.test(n)).filter((_, index) => index < 10)
    );
  });
};
