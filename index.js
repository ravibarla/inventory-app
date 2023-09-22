import ProductController from "./src/controller/product.controller.js";
import expressEjsLayouts from "express-ejs-layouts";
import express from "express";
import path from "path";
import validateMiddleware from "./src/middlewares/validation.middleware.js";
import { uploadFile } from "./src/middlewares/fileUpload.middleware.js";
import UserController from "./src/controller/user.controller.js";
import session from "express-session";
import { auth } from "./src/middlewares/auth.middleware.js";
const server = express();

server.use(express.static("public"));
server.use(
  session({
    secret: "SecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
//parse form data
server.use(expressEjsLayouts);
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//setup view engine setting
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));

//creating instance of product controller
const productController = new ProductController();
const userController = new UserController();
server.get("/register", userController.getRegister);
server.get("/login", userController.getLogin);
server.post("/login", userController.postLogin);
server.get("/logout", userController.logout);
server.post("/register", userController.postRegister);
server.get("/", auth, productController.getProducts);
server.get("/add-product", auth, productController.getAddForm);
server.post(
  "/",
  uploadFile.single("imageURL"),
  validateMiddleware,
  productController.addNewProduct
);
server.get("/update-product/:id", auth, productController.getUpdateProductView);
server.post("/update-product", auth, productController.postUpdateProductView);
server.post("/delete-product/:id", auth, productController.deleteProduct);

server.use(express.static("src/views"));

server.listen(3100);
console.log("server is running in 3100 port");
