import path from "path";
import ProductModel from "../models/product.model.js";

export default class ProductController {
  getProducts(req, res) {
    let products = ProductModel.get();
    // console.log(products);
    // return res.sendFile(
    //   path.join(path.resolve(), "src", "views", "products.html")
    // );
    res.render("products", { products });
  }
  getAddForm(req, res) {
    return res.render("new-product", { errorMessage: null });
  }
  addNewProduct(req, res) {
    //access data from form
    // console.log(req.body);

    ProductModel.add(req.body);
    let products = ProductModel.get();
    // return res.render("products", { products });
    return res.render("products", { products });
  }
  getUpdateProductView(req, res, next) {
    //1. if product exist then return view
    const id = req.params.id;
    console.log("id :", id);
    const productFound = ProductModel.getById(id);
    console.log("productfound :", productFound);
    if (productFound) {
      res.render("update-product", {
        product: productFound,
        errorMessage: null,
      });
    }
    //2. else return error
    else {
      res.status(401).send("Product not found");
    }
  }
  postUpdateProductView(req, res, next) {
    ProductModel.update(req.body);
    let products = ProductModel.get();
    console.log("products :", products);
    return res.render("products", { products });
  }
  deleteProduct(req, res, next) {
    const id = req.params.id;
    console.log("id :", id);
    const productFound = ProductModel.getById(id);
    console.log("productFound :", productFound);
    if (!productFound) {
      return res.status(401).send("product not found");
    }
    ProductModel.delete(id);
    var products = ProductModel.get();
    return res.render(("products", { products }));
  }
}
