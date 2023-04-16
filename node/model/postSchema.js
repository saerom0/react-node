const mongoose = require('mongoose');
const postSchema = new mongoose.Schema(
	{
		title: String,
		content: String,
		communityNum: Number,

		writer: {
			ref: 'User',
			type: mongoose.Schema.Types.ObjectId,
		},
	},
	{ collection: 'Posts' }
);
const Post = mongoose.model('Post', postSchema);
module.exports = { Post };
