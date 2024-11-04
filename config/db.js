const mongoose = require("mongoose");
// mongoose ile mongodb uzerinde model olusuturacagım

const db = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("mongo db ye baglanıldıııı");
    })
    .catch((err) => {
      // throw new Error("sdasdas")
      console.log(err);
    });
};

module.exports = db;
