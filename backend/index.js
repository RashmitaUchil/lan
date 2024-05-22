const express = require('express')
const bodyParser = require("body-parser");
const user = require("./routes/user");
const language = require("./routes/language");
const InitiateMongoServer = require("./config/db");
const cors= require('cors');
app.use(cors())

InitiateMongoServer();

const app = express();
const PORT= 8081;
//const User = mongoose.model('user',UserSchema);
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({ message: "API Working" });
  });

app.use("/user", user);
app.use("/language", language); 
app.listen(PORT, (req, res) => {
  console.log('Server Started at PORT ${PORT}');
});

