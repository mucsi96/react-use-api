const names = require("./names.json");

module.exports = function (app) {
  app.get("/api/search/:name?", (req, res) => {
    const {
      "X-Delay": delay = "0",
      "X-Fail": fail = false,
    } = req.headers.cookie.split(";").reduce((acc, cookie) => {
      const [key, value] = cookie.split("=");
      return { ...acc, [key.trim()]: value.trim() };
    }, {});

    if (fail) {
      return res.status(501).send({ error: "Error has occured" });
    }

    setTimeout(() => {
      const { name } = req.params;
      const pattern = new RegExp(name, "i");
      res.send(
        names.filter((n) => pattern.test(n)).filter((_, index) => index < 10)
      );
    }, parseInt(delay));
  });
};
