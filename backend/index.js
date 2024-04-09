require("dotenv").config();
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const exp = require("constants");
app.use(express.json()); //parse true json
app.use(cors()); //connect frontend and backend to 4000 port
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;

//API creation

app.get("/", (req, res) => {
  res.send("Express App is running!-response ok");
});

//App listening
app.listen(port, (error) => {
  if (!error) {
    console.log(`Server is running on Port ${port}`);
  } else {
    console.log("Error: ", error);
  }
});
