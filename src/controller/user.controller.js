import UserModel from "../models/user.model.js";
import ProductModel from "../models/product.model.js";

export default class UserController {
  static add(name, email, password) {
    const newUser = new UserModel(user.length + 1, name, email, password);
  }
  static isValidUser(email, password) {
    const res = users.find((u) => u.email == email && u.password == password);
    return res;
  }
  getRegister(req, res) {
    res.render("register");
  }
  getLogin(req, res) {
    res.render("login", { errorMessage: null });
  }
  postRegister(req, res) {
    const { name, email, password } = req.body;
    res.render("login", { errorMessage: null });
  }
  postLogin(req, res) {
    const { email, password } = req.body;
    const user = isValidUser(email, password);
    if (!user) {
      return res.render("login", {
        errorMessage: "! Invalid Credential",
      });
    }
      let products = ProductModel.get();
      return res.render("products", { products });
    }
  }

var users = [];
