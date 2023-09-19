import path from "path";
import ProductModel from "../models/product.model.js";

export default class ProductController {
  getProducts(req, res) {
    let products = ProductModel.get();
    console.log(products);
    // return res.sendFile(
    //   path.join(path.resolve(), "src", "views", "products.html")
    // );
    res.render("products", { products });
  }
  getAddForm(req, res) {
    return res.render("new-product");
  }
  addNewProduct(req, res) {
    //access data from form
    console.log(req.body);
    ProductModel.add(req.body);
    let products = ProductModel.get();
    // return res.render("products", { products });
    return res.render("products", { products });
  }
}
