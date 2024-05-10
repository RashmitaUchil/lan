const express = require('express')
const bodyParser = require("body-parser");
const user = require("./routes/user");
const InitiateMongoServer = require("./config/db");

InitiateMongoServer();

const app = express();
const PORT= 8081;
//const User = mongoose.model('user',UserSchema);
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({ message: "API Working" });
  });

app.use("/user", user);

app.listen(PORT, (req, res) => {
  console.log('Server Started at PORT ${PORT}');
});

