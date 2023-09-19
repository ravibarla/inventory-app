import ProductController from "./src/controller/product.controller.js";
import express from "express";
const server = express();

//creating instance of product controller
const productController = new ProductController();
server.get("/", productController.getProducts);
server.use(express.static("src/views"));

server.listen(3100);
console.log("server is running in 3100 port");
