import { useState, useEffect } from 'react';
import Layout from '../common/Layout';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const BtnSet = styled.div`
	display: flex;
	gap: 10px;
	margin-top: 20px;
`;
function Edit() {
	const params = useParams();
	const navigate = useNavigate();
	const [detail, setDetail] = useState({});
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	const handleUpdate = () => {
		if (title.trim() === '' || content.trim() === '')
			return alert('모든 항목을 입력하세요.');
		const item = { title: title, content: content, num: params.num };

		axios
			.post('/api/community/edit', item)
			.then((res) => {
				if (res.data.success) {
					alert('글 수정이 완료되었습니다.');
					navigate(`/detail/${params.num}`);
				} else {
					alert('글 수정에 실패하였습니다.');
				}
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		const item = { num: params.num };
		axios.post('/api/community/detail', item).then((res) => {
			if (res.data.success) {
				setDetail(res.data.detail);
			}
		});
	}, [params]);

	useEffect(() => {
		setTitle(detail.title);
		setContent(detail.content);
	}, [detail]);

	return (
		<Layout name={'Edit'}>
			<label htmlFor='title'>Title</label>
			<input
				type='text'
				value={title || ''}
				onChange={(e) => setTitle(e.target.value)}
			/>

			<label htmlFor='content'>Content</label>
			<textarea
				name='content'
				id='content'
				cols='30'
				rows='5'
				value={content || ''}
				onChange={(e) => setContent(e.target.value)}
			></textarea>
			<BtnSet>
				<button onClick={() => navigate(-1)}>Cancel</button>
				<button onClick={handleUpdate}>Update</button>
			</BtnSet>
		</Layout>
	);
}

export default Edit;
