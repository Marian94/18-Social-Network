const { User, Thought } = require("../models/index");

module.exports = {
  getAllUsers(req, res) {
    User.find()
      .then((user) => {
        console.log("[X] GET ALL USERS!");
        return res.json(user);
      })
      .catch((err) => {
        console.log("[X] GET ALL USERS ERROR!");
        return res.status(500).json(err);
      });
  },
  getUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .then((user) => {
        user
          ? res.json(user)
          : res.status(404).json({
              message: `[X] GET USER ERROR! \nNo user found with this id ${req.params.userId}!`,
            });
      })
      .catch((err) => {
        console.log("[X] GET USER ERROR!");
        res.status(500).json(err);
      });
  },
  createUser(req, res) {
    User.create(req.body)
      .then((user) => {
        console.log("[X] CREATE USER!");
        res.json(user);
      })
      .catch((err) => {
        console.log("[X] CREATE USER ERROR!");
        res.status(500).json(err);
      });
  },
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      {
        $set: req.body,
      },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((user) => {
        user
          ? res.json(user)
          : res.status(404).json({
              message: `[X] UPDATE USER ERROR! \nNo user found with this id ${req.params.userId}!`,
            });
      })
      .catch((err) => {
        console.log("[X] UPDATE USER ERROR!");
        res.status(500).json(err);
      });
  },
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) => {
        user
          ? Thought.deleteMany({ _id: { $in: user.thoughts } })
              .then(() => {
                res.json({ message: "[X] DELETE USER AND THOUGHTS COMPLETE!" });
              })
              .catch((err) => {
                console.log("[X] DELETE USER AND THOUGHTS ERROR!");
                res.status(500).json(err);
              })
          : res.status(404).json({
              message: `[X] DELETE USER ERROR! \nNo user found with this id ${req.params.userId}!`,
            });
      })
      .catch((err) => {
        console.log("[X] DELETE USER ERROR!");
        res.status(500).json(err);
      });
  },
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((user) => {
        user
          ? res.json(user)
          : res.status(404).json({
              message: `[X] ADD FRIEND ERROR! \nNo user found with this id ${req.params.userId}!`,
            });
      })
      .catch((err) => {
        console.log("[X] ADD FRIEND ERROR!");
        res.status(500).json(err);
      });
  },
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((user) => {
        user
          ? res.json(user)
          : res.status(404).json({
              message: `[X] REMOVE FRIEND ERROR! \nNo user found with this id ${req.params.userId}!`,
            });
      })
      .catch((err) => {
        console.log("[X] REMOVE FRIEND ERROR!");
        res.status(500).json(err);
      });
  },
};
