const verifySignUp = require("./verifySignUp");
const authJwt = require("./verifyJwtToken");
const authController = require("../controllers/authController.js");
const userController = require("../controllers/userController.js");
const bookController = require("../controllers/bookController");
const orderController = require("../controllers/orderController");
const commentController = require("../controllers/commentController");

module.exports = function(app) {
  // Auth
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUserNameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    authController.signup
  );
  app.post("/api/auth/signin", authController.signin);

  app.get("/dashboard", [authJwt.verifyToken], userController.dashboard)
  app.put("/dashboard/:id", [authJwt.verifyToken], userController.dashboardUpdate)

  // get all user
  app.get("/api/users", [authJwt.verifyToken], userController.users);

  // get 1 user according to roles
  app.get("/api/test/user/:id", [authJwt.verifyToken], userController.userContent);
  app.put("/api/test/user/:id", [authJwt.verifyToken], userController.userUpdate);
  app.get(
    "/api/test/pm",
    [authJwt.verifyToken, authJwt.isPmOrAdmin],
    userController.managementBoard
  );
  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    userController.adminBoard
  );
    //post book
    app.post("/book", [authJwt.verifyToken], bookController.createbook);

    //get book
    app.get("/book", [authJwt.verifyToken], bookController.books);

    //get book id
    app.get("/book/:id", [authJwt.verifyToken], bookController.book);
    app.get("/getbook/:id", [authJwt.verifyToken], bookController.getBookById);

    //update book by id
    app.put("/book/:id", [authJwt.verifyToken], bookController.update);

    //delete book by id
    app.delete("/book/:id", [authJwt.verifyToken], bookController.deletebook);

    //post order
    app.post("/order", [authJwt.verifyToken], orderController.order);

    //get order
    app.get("/orders", [authJwt.verifyToken], orderController.orders);

    //get order
    app.get("/order/:id", [authJwt.verifyToken], orderController.orderId);

    //post comment
    app.get("/comment", [authJwt.verifyToken], commentController.getComment)
    app.post("/comment/:id", [authJwt.verifyToken], commentController.createComment)

  // error handler 404
  app.use(function(req, res, next) {
    return res.status(404).send({
      status: 404,
      message: "Not Found"
    });
  });

  // error handler 500
  app.use(function(err, req, res, next) {
    return res.status(500).send({
      error: err
    });
  });
};
