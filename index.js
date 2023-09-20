import ProductController from "./src/controller/product.controller.js";
import expressEjsLayouts from "express-ejs-layouts";
import express from "express";
import path from "path";
import validateMiddleware from "./src/middlewares/validation.middleware.js";
const server = express();

//parse form data
server.use(express.urlencoded({ extended: true }));

//setup view engine setting
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));

server.use(expressEjsLayouts);

//creating instance of product controller
const productController = new ProductController();
server.get("/", productController.getProducts);
server.get("/new", productController.getAddForm);
server.post("/", validateMiddleware, productController.addNewProduct);
server.use(express.static("src/views"));

server.listen(3100);
console.log("server is running in 3100 port");
