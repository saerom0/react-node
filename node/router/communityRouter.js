const express = require('express');
const router = express.Router();

const { Post } = require('../model/postSchema.js');
const { Counter } = require('../model/counterSchema.js');
const { user, User } = require('../model/userSchema.js');

//create 요청처리
router.post('/create', (req, res) => {
	const temp = req.body;
	Counter.findOne({ name: 'counter' })
		.exec()
		.then((doc) => {
			temp.communityNum = doc.communityNum;
			console.log(temp);
			User.findOne({ uid: temp.uid })
				.exec()
				.then((doc) => {
					temp.writer = doc._id;
				});
			const PostModel = new Post(temp);
			PostModel.save().then(() => {
				Counter.updateOne(
					{ name: 'counter' },
					{ $inc: { communityNum: 1 } }
				).then(() => {
					res.json({ success: true });
				});
			});
		})
		.catch((err) => console.log(err));
});

//read 요청처리
router.post('/read', (req, res) => {
	Post.find()
		.exec()
		.then((doc) => {
			res.json({ success: true, communityList: doc });
		})
		.catch((err) => {
			console.log(err);
			res.json({ success: false });
		});
});

//detail 요청처리
router.post('/detail', (req, res) => {
	Post.findOne({ communityNum: req.body.num })
		.exec()
		.then((doc) => {
			res.json({ success: true, detail: doc });
		})
		.catch((err) => {
			res.json({ success: false, err: err });
		});
});

//edit 요청처리
router.post('/edit', (req, res) => {
	const temp = {
		title: req.body.title,
		content: req.body.content,
	};

	Post.updateOne({ communityNum: req.body.num }, { $set: temp })
		.exec()
		.then(() => {
			res.json({ success: true });
		})
		.catch((err) => res.json({ success: false, err: err }));
});

//delete 요청처리
router.post('/delete', (req, res) => {
	Post.deleteOne({ communityNum: req.body.num })
		.exec()
		.then(() => {
			res.json({ success: true });
		})
		.catch((err) => console.log({ success: false, err: err }));
});

module.exports = router;
