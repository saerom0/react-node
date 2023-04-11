import axios from 'axios';
import { useState } from 'react';
import Layout from '../common/Layout';

function Create() {
	const [tit, setTit] = useState('');
	const [con, setCon] = useState('');

	const handleCreate = () => {
		const item = { title: tit, content: con };

		axios
			.post('/api/create', item)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};
	return (
		<Layout name={'Post'}>
			<label htmlFor='tit'>Title</label>
			<input
				type='text'
				id='tit'
				value={tit}
				onChange={(e) => setTit(e.target.value)}
			/>
			<br />

			<label htmlFor='con'>Content</label>
			<textarea
				name='con'
				id='con'
				cols='30'
				rows='3'
				value={con}
				onChange={(e) => setCon(e.target.value)}
			></textarea>
			<br />

			<button onClick={handleCreate}>SEND</button>
		</Layout>
	);
}

export default Create;
