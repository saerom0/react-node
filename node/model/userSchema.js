const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		userNum: Number,
		email: String,
		displayName: String,
		uid: String,
	},
	{ collection: 'User' }
);
