import session from "express-session";
import express, { Request, Response, Express } from "express";
import cors from "cors";
import mongoose from "mongoose";
import connectMongoDBSession from "connect-mongodb-session";
import { router } from "../routes/route";

require("dotenv").config();

const app: Express = express();
const adminPassword: any = process.env.DB_URI;
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
  optionsSuccessStatus: 200,
  credentials: true,
};
const MongoDBStore = connectMongoDBSession(session);
const store = new MongoDBStore({
  uri: adminPassword,
  collection: "sessions",
  // expires: 1000,
});
const sessionOptions = {
  name: "session-id",
  store: store,
  secret: "WeAreCreatingASecretKeyForSessionHere",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: false,
    maxAge: Date.now() + 1000 * 60 * 60 * 24 * 7,
  },
};
app.set("trust proxy", 1);
app.use(session(sessionOptions));
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api", router);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    const db = await mongoose.connect(adminPassword);
    console.log("MONGODB SUCCESSFULLY CONNECTED,");
  } catch (err) {
    console.log("MONGODB ERROR IN CONNECTION....", err.message);
  }
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
};
startServer();
















/*
app.use(passport.initialize())
app.use(passport.session())
//passport.use(User.createStrategy());
passport.use(new LocalStrategy.Strategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())




*/

//startServer().catch((err: { message: any }) =>console.log("MONGODB ERROR IN CONNECTION....", err.message))

//mongoose.connect(adminPassword)
//  .then(() => console.log("MONGODB SUCCESSFULLY CONNECTED,"))
//  .catch((err: { message: any }) =>
//  console.log("MONGODB ERROR IN CONNECTION....", err.message)
//);

//MiddleWares  Important to note that we won't immediately have access to the body of the content posted from front-end. to have access to it we can make use of
//app.use(express.urlencoded({ extended: true }));

/*app.get("/api/create", async (req: any, res: { send: (arg0: any) => void; }) => {
  const makeComment = new Comment({
    title: "My first every comment interacting with database"});
  await makeComment.save();
  res.send(makeComment);
});

*/
//const DB:any = process.env.DB_URI
/*
//Rendering all Products with this link below
app.get("/products", async (req, res) => {
  const products = await Product.find({});
  res.render("products/index", { products });
});

//Rendering all Products to show more with this link below
app.get("/products/:id", async (req, res) => {
  const { id } = req.params; //Find something by Id we will make use of this, without this, it won't match and find with id
  const products = await Product.findById(id);
  res.render("products/show ", { products });
});

//Creating new Products
app.post("/products", async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  console.log(newProduct);
  res.redirect(`/products/ ${newProduct._id}`); // on a post request, once the post is done, you want to redirect to another page, maybe a homepage or something
});

//Edit a Products
app.get("/products/:id/edit", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/edit", { product });
});

//once the product is edited, we want to put it into the database to ddo that
app.put("/product/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/products/${product.id}`);
});

//Deleting a Product from database =
app.delete("/product/:id", async (req, res) => {
  const { id } = req.params;
  const deleteProduct = await Product.findByIdAndDelete(id);
  res.redirect(`/products`);
});

//Filtering the Application
app.get("/products", async (req, res) => {
  const { category } = req.query;
  if (category) {
    const product = await Product.find({ category: category });
    res.render("product/index", { product, category});
  } else {
    const product = await Product.find({});
    res.render("product/index", { product, category: "All" });
  }
});
*/

/*   

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
  
  app.get()=> this get something from the database for us based on the model we created and the data we have there already
  
  
  app.Post()=>This is use when a form, comment, likes is being made on the front end, this is what we use in posting it to the database based on the model we have there already
  
  
  Important to note that we won't immediately have access to the body of the content posted from front-end. to have access to it we can make use of 
  app.
  
   */
