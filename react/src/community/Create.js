import axios from 'axios';
import { useState } from 'react';
import Layout from '../common/Layout';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Create() {
	const navigate = useNavigate();
	const user = useSelector((store) => store.user);
	const [tit, setTit] = useState('');
	const [con, setCon] = useState('');

	const handleCreate = () => {
		if (tit.trim() === '' || con.trim() === '')
			return alert('본문과 내용을 모두 입력하세요.');
		const item = { title: tit, content: con, uid: user.uid };

		axios
			.post('/api/community/create', item)
			.then((res) => {
				if (res.data.success) {
					alert('글 저장이 완료되었습니다.');
					navigate('/list');
				} else {
					alert('글 저장에 실패하였습니다.');
				}
			})
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
