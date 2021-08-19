const { model, Schema } = require("mongoose");

const postSchema = new Schema({
  body: {
    type: String,
    require: true
  },
  username: {
    type: String,
    require: true,
    
  },
  createdAt: {
    type: String,
    require: true
  },
  comments: [
    {
      body: String,
      username: String,
      createdAt: String,
    },
  ],
  likes: [
    {
      username: String,
      createAt: String,
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = model('Post', postSchema);
