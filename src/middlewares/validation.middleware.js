import { body, validationResult } from "express-validator";

const validateMiddleware = async (req, res, next) => {
  //validate data

  //1. setup rules for validation
  const rules = [
    body("name").notEmpty().withMessage("name should be valid"),
    body("price").isFloat({ gt: 0 }).withMessage("price should be positive"),
    body("imageUrl").isURL().withMessage("url should be valid"),
  ];
  //2. run those rules
  await Promise.all(rules.map((rule) => rule.run(req)));
  //3. check if there are any errors after running  the rules

  var validationErrors = validationResult(req);
  console.log(validationErrors);
  //if there is any error then return error msg
  if (!validationErrors.isEmpty()) {
    return res.render("new-product", {
      errorMessage: validationErrors.array()[0].msg,
    });
  }

  next();
};
export default validateMiddleware;
