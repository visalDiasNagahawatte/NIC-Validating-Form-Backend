const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");
  console.log("Received accessToken: ", accessToken);

  if (!accessToken) return res.json({ error: "User not logged in!" });

  try {
    const validToken = verify(accessToken, "importantsecret");

    if (validToken) {
      return next();
    }
  } catch (err) {
    console.error("Token verification error: ", err);
    return res.json({ error: err });
  }
};

module.exports = { validateToken };
