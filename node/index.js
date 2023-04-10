const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = 5000;

//express에서 react안쪽 build폴더까지의 경로를 static으로 지정
app.use(express.static(path.join(__dirname, '../react/build')));

app.listen(port, () => {
	mongoose
		.connect(
			'mongodb+srv://saerom:!abc1234 @cluster0.nfm6xba.mongodb.net/?retryWrites=true&w=majority'
		)
		.then(() =>
			console.log(`Server app listening on port ${port} with MongoDB`)
		)
		.catch((err) => console.log(err));
});

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../react/build/index.html'));
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../react/build/index.html'));
});
