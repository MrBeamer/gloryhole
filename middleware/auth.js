export const isAuthenticated = (req, res, next) => {
  // Passport method that returns true if logged in
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/");
};
