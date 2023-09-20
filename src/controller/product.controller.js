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
    return res.render("new-product", { errorMessage: null });
  }
  addNewProduct(req, res) {
    //access data from form
    // console.log(req.body);

    //validate data
    const { name, price, imageUrl } = req.body;
    let errors = [];
    if (!name || name.trime() == "") {
      errors.push("name is required");
    }
    if (!price || parseFloat(price) < 1) {
      errors.push("price must be positive value");
    }
    try {
      const validUrl = new URL(imageUrl);
    } catch (err) {
      errors.push("URL is invalid");
    }
    if (errors.length > 0) {
      return res.render("new-product", { errorMessage: errors[0] });
    }

    ProductModel.add(req.body);
    let products = ProductModel.get();
    // return res.render("products", { products });
    return res.render("products", { products });
  }
}
