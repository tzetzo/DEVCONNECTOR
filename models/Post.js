const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  user: {
    //can be also 'owner' for example
    //associate the Post with the User model by using the User ID
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  text: { type: String, required: true },
  name: { type: String }, //name of the user who posted the post
  avatar: { type: String }, //avatar of the user who posted the post
  likes: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: "User" } }],
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      text: { type: String, required: true },
      name: { type: String }, //name of the user who posted the post
      avatar: { type: String }, //avatar of the user who posted the post
      date: { type: Date, default: Date.now }
    }
  ],
  date: { type: Date, default: Date.now }
});

module.exports = Post = mongoose.model("Post", PostSchema);
