const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
	{
		title: String,
		content: String,
		communityNum: Number,
	},
	{ collection: 'Posts' }
);

const Post = mongoose.model('Post', postSchema);
module.exports = { Post };
