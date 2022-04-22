const router = require("express").Router();

const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/user");

router.route("/").get(getAllUsers).post(createUser);

router.route("/:userId").get(getUser).put(updateUser).delete(deleteUser);

router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;
