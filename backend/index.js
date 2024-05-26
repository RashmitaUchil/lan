const express = require('express')
const bodyParser = require("body-parser");
const user = require("./routes/user");
const language = require("./routes/language");
const InitiateMongoServer = require("./config/db");
const cors= require('cors');
const session= require('express-session');
const cookieParser= require('cookie-parser');

InitiateMongoServer();

const app = express();
app.use(cors())
const PORT= 8081;
//const User = mongoose.model('user',UserSchema);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret:'secret',
  resave: false,
  saveUninitialized: false,
  cookie:{
    secure: false,
    maxAge: 1000*60*60*24
  }


}))

app.get("/", (req, res) => {
    res.json({ message: "API Working" });
  });

app.use("/user", user);
app.use("/language", language); 
app.listen(PORT, (req, res) => {
  console.log('Server Started at PORT ${PORT}');
});

