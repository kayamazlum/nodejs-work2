const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    // token= "Bearer aksldjasldsakld"   gibi bir şey
    const token = req.headers.authorization.split(" ")[1]; //split space ile ayırdık ve 1. elemanı yani tokeni aldık
    let decodedData;
    if (token) {
      decodedData = jwt.verify(token, process.env.SECRET_TOKEN);

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData.sub;
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Bu bir hatadır :D" });
  }
};

module.exports = auth;
