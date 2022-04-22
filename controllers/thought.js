const { Thought, User } = require("../models/index");

module.exports = {
  getAllThoughts(req, res) {
    Thought.find()
      .then((thoughts) => {
        console.log("[X] GET ALL THOUGHTS");
        return res.json(thoughts);
      })
      .catch((err) => {
        console.log("[X] GET ALL THOUGHTS ERROR");
        return res.status(500).json(err);
      });
  },
  getThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) => {
        thought
          ? res.json(thought)
          : res.status(404).json({
              message: `[X]GET THOUGHT ERROR! \nNo thought found with this id ${req.params.thoughtId}!`,
            });
      })
      .catch((err) => {
        console.log(`[X]GET THOUGHT ERROR!`);
        return res.status(500).json(err);
      });
  },
  createThought(req, res) {
    Thought.create(req.body).then((thought) => {
      User.findOneAndUpdate(
        {
          _id: req.body.userId,
        },
        { $push: { thoughts: thought._id } },
        { runValidators: true, new: true }
      )
        .then((user) => {
          user
            ? res.json(thought)
            : res.status(404).json({
                message: `[X] CREATE THOUGHT USER ERROR \nThought created but the user is not found!`,
              });
        })
        .catch((err) => {
          console.log("[X] CREATE THOUGHT ERROR!");
          res.status(500).json(err);
        });
    });
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((thought) => {
        thought
          ? res.json(thought)
          : res.status(404).json({
              message: `[X] UPDATE THOUGHT ERROR! \nNo thought found with this id ${req.params.thoughtId}!`,
            });
      })
      .catch((err) => {
        console.log(`[X] UPDATE THOUGHT ERROR!`);
        res.status(500).json(err);
      });
  },
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) => {
        thought
          ? res.json(thought)
          : res.status(404).json({
              message: `[X] DELETE THOUGHT ERROR! \nNo thought found with this id ${req.params.thoughtId}!`,
            });
      })
      .catch((err) => {
        console.log(`[X] DELETE THOUGHT ERROR!`);
        res.status(500).json(err);
      });
  },
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        thought
          ? res.json(thought)
          : res.status(404).json({
              message: `[X] ADD REACTION ERROR! \nNo thought found with this id ${req.params.thoughtId}!`,
            })
      )
      .catch((err) => {
        console.log("[X] ADD REACTION ERROR!");
        res.status(500).json(err);
      });
  },
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        thought
          ? res.json(thought)
          : res.status(404).json({
              message: `[X] REMOVE REACTION ERROR! \nNo thought found with this id ${req.params.thoughtId}!`,
            })
      )
      .catch((err) => {
        console.log("[X] REMOVE REACTION ERROR!");
        res.status(500).json(err);
      });
  },
};
