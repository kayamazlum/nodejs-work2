const mongoose = require("mongoose");
const authScheme = new mongoose.Schema({
  username: {
    type: String,
    required: true, // zorunlu mu : true
    trim: true, // boşlukları alır
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true, // benzersiz mi olmalı : true
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Auth", authScheme);
