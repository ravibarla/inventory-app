import path from "path";
import ProductModel from "../models/product.model.js";

export default class ProductController {
  getProducts(req, res) {
    let products = ProductModel.get();
    res.render("products", { products, userEmail: req.session.userEmail });
  }
  getAddForm(req, res) {
    return res.render("new-product", {
      errorMessage: null,
      userEmail: req.session.userEmail,
    });
  }
  addNewProduct(req, res) {
    //access data from form
    // console.log(req.body);
    const { image, desc, price } = req.body;
    const imageURL = "images/" + req.file.filename;
    ProductModel.add(image, desc, price, imageURL);
    let products = ProductModel.get();
    // return res.render("products", { products });
    return res.render("products", {
      products,
      userEmail: req.session.userEmail,
    });
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
        userEmail: req.session.userEmail,
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
    return res.render("products", {
      products,
      userEmail: req.session.userEmail,
    });
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
    res.render("products", { products, userEmail: req.session.userEmail });
  }
<<<<<<< HEAD
  
}
=======
}
>>>>>>> 00c9a2a1d26d2e3dba5137594eb94f9bcbf38ccc
