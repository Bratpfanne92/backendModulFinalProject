require("dotenv").config();
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");

app.use(express.json()); //parse true json
app.use(cors()); //connect frontend and backend to 4000 port

//DB connection
const port = process.env.PORT || 3000;
require("./dbconnect");

//APIS:

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

//Endpoint for delete products
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Product Removed");
  res.json({
    success: true,
    name: req.body.name,
  });
});

//create endpoint for get all products
app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("All Products Fetched");
  res.send(products);
});

//Create Schema for User model
const Users = mongoose.model("Users", {
  name: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    // required: true,
  },
  cartData: {
    type: Object,
    default: {},
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//Create endpoint for user registration

app.post("/signup", async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({
      success: false,
      error: "User already exists with same email! :)",
    });
  }

  //create cart object
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  const user = new Users({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });

  await user.save();
  //jwt token
  const data = {
    user: {
      id: user.id,
    },
  };
  const token = jwt.sign(data, process.env.JWT_SECRET);
  res.json({ success: true, token: token });
});

// endpoint for user login

app.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, process.env.JWT_SECRET);
      return res.json({ success: true, token: token });
    } else {
      return res.json({ success: false, error: "Invalid Password" });
    }
  } else {
    return res.json({ success: false, error: "Invalid Email" });
  }
});

//Endpoint for NewCollection data

app.get("/newcollection", async (req, res) => {
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8); //get last 8 products from newCOllection db
  console.log("New Collection Fetched");
  res.send(newcollection);
});

// endpoint for popular im Womemn category

app.get("/popularinwomen", async (req, res) => {
  let products = await Product.find({ category: "women" });
  let popular_in_women = products.slice(0, 4);
  console.log("Popular in women fetched");
  res.send(popular_in_women);
});

//Middleware for fetching user data
//fetch user data with token verification
const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(401)
      .send({ error: "Please authenticate using valid token!" });
  } else {
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified.user;
      next();
    } catch (error) {
      res.status(400).json({ success: false, error: "Token is not valid" });
    }
  }
};

//endpoint for adding products to cartData
app.post("/addtocart", fetchUser, async (req, res) => {
  console.log("Added to cart", req.body.itemId);
  // console.log(req.body, req.user);
  let userData = await Users.findById({ _id: req.user.id });
  userData.cartData[req.body.itemId] += 1;
  await Users.findByIdAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("Added to Cart");
});

//endpiint for removing products from cartData

app.post("/removefromcart", fetchUser, async (req, res) => {
  console.log("Removed from Cart", req.body.itemId);
  let userData = await Users.findById({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] > 0)
    userData.cartData[req.body.itemId] -= 1;
  await Users.findByIdAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("Removed from Cart");
});

//endpoint for fetching cartData

app.get("/getcart", fetchUser, async (req, res) => {
  console.log("Get Cart Data");
  let userData = await Users.findById({ _id: req.user.id });
  res.json(userData.cartData);
});

//App listening
app.listen(port, (error) => {
  if (!error) {
    console.log(`Server is running on Port ${port}`);
  } else {
    console.log("Error: ", error);
  }
});
