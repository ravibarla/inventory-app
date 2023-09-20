const validateMiddleware = (req, res, next) => {
  //validate data
  const { name, desc, price, imageUrl } = req.body;
  let errors = [];
  if (!name || name.trim() == "") {
    errors.push("name is required");
  }
  if (!desc || desc.trim() == "") {
    errors.push("description is required");
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

  next();
};
export default validateMiddleware;
