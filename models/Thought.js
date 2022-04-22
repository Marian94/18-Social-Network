const { format } = require("express/lib/response");
const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

const thoughtSchema = new Schema(
  {
    thoughtDescription: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 200,
    },
    createAt: {
      type: Date,
      default: Date.now,
      get: formatDate,
    },
    userName: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

function formatDate(date) {
  return `${new Date(date).getMonth() + 1}/${new Date(
    date
  ).getDate()}/${new Date(date).getFullYear()}`;
}

thoughtSchema.virtual("reactionNumber").get(function () {
  return this.reactions.length;
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
