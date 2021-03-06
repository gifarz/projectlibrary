const db = require("../config/db.js");
const User = db.user;
const Role = db.role;
const RoleUser = db.roleuser;
const asyncMiddleware = require("express-async-handler");

var bcrypt = require("bcryptjs");

exports.users = asyncMiddleware(async (req, res) => {
  const user = await User.findAll({
    attributes: ["id", "name", "username", "email"],
    include: [
      {
        model: Role,
        attributes: ["id", "name"],
        through: {
          attributes: ["userId", "roleId"]
        }
      }
    ]
  });
  res.status(200).json({
    description: "All User",
    user: user
  });
});

exports.userContent = asyncMiddleware(async (req, res) => {
  const user_id = req.params.id
  const user = await User.findOne({
    where: {
        id: user_id
    },
//     where: { id: req.userId },
    attributes: ["id", "name", "username", "email"],
    include: [
      {
        model: Role,
        attributes: ["id", "name"],
        through: {
          attributes: ["userId", "roleId"]
        }
      }
    ]
  });
  res.status(200).json({
    description: "User Content Page",
    user: user
  });
});


exports.dashboard = asyncMiddleware(async (req, res) => {
  const user_id = req.userId
  const user = await User.findOne({
    where: {
        id: user_id
    }
  })
  res.status(200).json(user);
});

exports.dashboardUpdate = asyncMiddleware(async (req, res) => {

  const user = await User.findOne({
    where: {
      id: req.userId
    }
  })

  if(!user) {
    return res.status(404).send({
      error: true,
      message: "User Not Found"
    })
  }

  const profile = await User.update({
      name: req.body.name,
    },
  {
        where: {
            id: req.userId
        }
      }
  )
  
  const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
  if (!passwordIsValid) {
    return res.status(401).send({
      auth: false,
      accessToken: null,
      reason: "Invalid Password!"
    });
  }

  res.status(201).send({
    error: false,
    message: "User has been updated"
  })
})

exports.userUpdate = asyncMiddleware(async (req, res) => {
  try {
      const idUser = req.params.id
      const userRole = await RoleUser.update({
          roleId: req.body.roleId
      }, {
          where: {
              userId: idUser
          }
      })
      res.status(201).send({
          data: userRole,
          massage: "user role successfuly update"
      })
  } catch (error) {
      res.status(500).send({
          error: error,
          massage: "failed to update user role"
      })
  }
});


exports.adminBoard = asyncMiddleware(async (req, res) => {
  const user = await User.findOne({
    where: { id: req.userId },
    attributes: ["name", "username", "email"],
    include: [
      {
        model: Role,
        attributes: ["id", "name"],
        through: {
          attributes: ["userId", "roleId"]
        }
      }
    ]
  });
  res.status(200).json({
    description: "Admin Board",
    user: user
  });
});


exports.managementBoard = asyncMiddleware(async (req, res) => {
  const user = await User.findOne({
    where: { id: req.userId },
    attributes: ["name", "username", "email"],
    include: [
      {
        model: Role,
        attributes: ["id", "name"],
        through: {
          attributes: ["userId", "roleId"]
        }
      }
    ]
  });
  res.status(200).json({
    description: "Management Board",
    user: user
  });
});
