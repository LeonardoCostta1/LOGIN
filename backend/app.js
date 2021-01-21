const bodyParser = require("body-parser");

const express = require("express");

const cors = require("cors");

require("dotenv").config();

const app = express();

const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");

const User = require("./model");

mongoose.connect(
  "mongodb+srv://leonardo:Vemqtem2014@cluster0.nccyo.mongodb.net/<dbname>?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
);

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function verifyJWT(req, res, next) {
  const token = req.headers["x-access-token"];

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) return res.status(401).send({ err: "Invalid Token" });

    req.id = decoded.id;

    next();
  });
}

app.get("/logged", verifyJWT, async (req, res) => {
  const id = req.id;
  const user = await User.findOne(id);

  if (!user) {
    res.status(401).send({ validation: false });
  } else {
    res.status(200).send({ user });
  }
});

app.post("/create", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.send({ user });
  } catch (error) {
    res.status(500);
  }
});

app.post("/login", async (req, res) => {
  const { email, pass } = req.body;

  try {
    
  const user = await User.findOne({ email }).select("+pass");

  if(email != user.email){
    return res.send({ err: "email inválido" });
  }

  if(pass != user.pass){
    return res.send({ err: "senha inválida" });
  }

  const token = jwt.sign({ id: user }, process.env.SECRET, { expiresIn: 120 });

  res.send({auth: true,token,});

  } catch (error) {
    
    return res.json({ err: "email inválido" });
  
  }
});

app.get("/read/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500);
  }
});

app.listen(4000, () => {
  console.log("ON");
});
