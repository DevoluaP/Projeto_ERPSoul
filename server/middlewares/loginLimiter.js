const rateLimit = require("express-rate-limit");

exports.loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message:
    "Muitas tentativas de login deste IP. Tente novamente após 10 minutos.",
  handler: (req, res) => {
    res.status(429).json({
      message:
        "Muitas tentativas de login deste IP. Tente novamente após 10 minutos.",
    });
  },
});
