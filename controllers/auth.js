const Auth = require("../models/auth.js");
const bcrypt = require("bcryptjs"); // passwordu sifrelemek icin
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  const { username, password, email } = req.body;

  const user = await Auth.findOne({ email });
  if (user) {
    return res.status(500).json({ message: "Böyle bir kullanıcı zaten var." });
  }

  if (password.length < 8) {
    return res.status(500).json({ message: "Şifre en az 8 karakter olmalı!" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await Auth.create({
    username,
    password: hashedPassword,
    email,
  });

  //   const token = jwt.sign({ id: newUser._id }, process.env.SECRET_TOKEN, {
  //     expiresIn: "1h",
  //   });

  res.status(201).json({
    status: "OK",
    message: "Kayıt başarılı.",
    // ...newUser._doc,
    // token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Auth.findOne({ email });
    if (!user) {
      return res
        .status(500)
        .json({ message: "Böyle bir kullanıcı bulunamadı!" });
    }
    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(500).json({ message: "Şifre yanlış!" });
    }

    const token = jwt.sign({ id: user._id }, proc.env.SECRET_TOKEN, {
      expiresIn: "1h",
    });

    res.status(200).json({
      status: "OK",
      ...user,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Burada bir hata varrrrr" });
  }
};

module.exports = { login, register };
