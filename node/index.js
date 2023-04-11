const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = 5000;

const { Post } = require('./model/postSchema');
const { Counter } = require('./model/counterSchema');

app.use(express.static(path.join(__dirname, '../react/build')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//MongoDB 접속
app.listen(port, () => {
	mongoose
		.connect(
			'mongodb+srv://saerom:!abc1234@cluster0.nfm6xba.mongodb.net/?retryWrites=true&w=majority'
		)
		.then(() =>
			console.log(`Server app listening on Port ${port} with MongoDB`)
		)
		.catch((err) => console.log(err));
});

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../react/build/index.html'));
});
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../react/build/index.html'));
});

//create 요청처리
app.post('/api/create', (req, res) => {
	Counter.findOne({ name: 'counter' })
		.exec()
		.then((doc) => {
			console.log(doc);

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
app.post('/api/read', (req, res) => {
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
