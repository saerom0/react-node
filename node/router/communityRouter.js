const express = require('express');
const router = express.Router();

const { Post } = require('../model/postSchema.js');
const { Counter } = require('../model/counterSchema.js');

//create 요청처리
router.post('/create', (req, res) => {
	Counter.findOne({ name: 'counter' })
		.exec()
		.then((doc) => {
			const PostModel = new Post({
				title: req.body.title,
				content: req.body.content,
				communityNum: doc.communityNum,
			});

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

module.exports = router;
