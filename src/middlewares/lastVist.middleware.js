export const setLastVisit = (req, res, next) => {
  // 1. if cookies is set , then add a local variable with last visit time data
 
  if (req.cookies.lastVist) {
    res.locals.lastVist = new Date(req.cookies.lastVist).toLocaleString();
   
  }
  res.cookie("lastVist", new Date().toISOString(), {
    maxAge: 2 * 24 * 60 * 60 * 1000,
  });
  next();
};
