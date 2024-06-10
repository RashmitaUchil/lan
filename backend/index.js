const express = require('express')
const bodyParser = require("body-parser");
const user = require("./routes/user");
const language = require("./routes/language");
const questions = require("./routes/questions");
const InitiateMongoServer = require("./config/db");
const cors= require('cors');
const session= require('express-session');
const cookieParser= require('cookie-parser');

InitiateMongoServer();

const app = express();
app.use(cors({
  origin:["http://localhost:3000"], 
  methods:["POST","GET"],
  credentials: true
}))
const PORT= 8081;
//const User = mongoose.model('user',UserSchema);
app.use(bodyParser.json());
app.use(cookieParser());



app.use(session({
  secret:'secret',
  resave: false,
  saveUninitialized: true ,
  cookie:{
    secure: false,
    maxAge: 1000*60*60*24
  }


}))

app.get("/", (req, res) => {
  if(req.session.userId)
    {
      return res.json({
        valid: true,
         user_id: req.session.userId,
         userName : req.session.userName
        })

    }
    else{
      return res.json({ valid: false});
    }
    
  });

app.use("/user", user);
app.use("/language", language); 
app.use("/questions", questions);
app.listen(PORT, (req, res) => {
  console.log('Server Started at PORT ${PORT}');
});

