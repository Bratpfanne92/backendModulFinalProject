require("dotenv").config();
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
app.use(express.json()); //parse true json
app.use(cors()); //connect frontend and backend to 4000 port

const port = process.env.PORT || 3000;
require("./dbconnect");

//API creation

app.get("/", (req, res) => {
  res.send("Express App is running!-response ok");
});

// Image Storage Engine-MULTER

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

// Creating Upload for Endpoint Image
app.use("/images", express.static("upload/images"));
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
    //access to uploaded image
  });
});

// Schema for Creating Products

const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

//Endpoint for addproduct-save to db
app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }

  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
    // available: req.body.available,
  });
  console.log(product);
  await product.save();
  console.log("Saved to DB");
  res.json({
    success: true,
    name: req.body.name,
  });
});

//App listening
app.listen(port, (error) => {
  if (!error) {
    console.log(`Server is running on Port ${port}`);
  } else {
    console.log("Error: ", error);
  }
});
