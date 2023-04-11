const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = 5000;

app.use(express.static(path.join(__dirname, '../react/build')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//community전용 라우터
app.use('/api/community', require('./router/communityRouter.js'));

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
