export const setLastVisit = (req, res, next) => {
  // 1. if cookies is set , then add a local variable with last visit time data
  console.log("lastVisit :", req.cookies.lastVist);
  if (req.cookies.lastVisit) {
    res.locals.lastVisit = new Date(req.cookies.lastVisit).toLocaleString();
  } else {
    res.cookie("lastVist", new Date().toISOString(), {
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });
  }
  next();
};
