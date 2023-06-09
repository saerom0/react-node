import Layout from '../common/Layout';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const DetailStyle = styled.div`
	width: 100%;
	padding: 40px;
	background: #fff;
	box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.02);
`;

const BtnStyle = styled.div`
	display: flex;
	gap: 10px;
	margin-top: 20px;
`;

function Detail() {
	const [detail, setDetail] = useState(null);
	const params = useParams();
	const navigate = useNavigate();
	const user = useSelector((store) => store.user);
	const item = useMemo(() => ({ num: params.num }), [params]);

	const handleDelete = () => {
		const item = { num: params.num };
		if (!window.confirm('정말 삭제하시겠습니까?')) return;
		axios
			.post('/api/community/delete', item)
			.then((res) => {
				if (res.data.success) {
					alert('게시글이 삭제되었습니다.');
					navigate('/list');
				} else {
					alert('게시글 삭제에 실패했습니다.');
				}
			})
			.catch((err) => console.log(err));
	};
	useEffect(() => {
		axios
			.post('/api/community/detail', item)
			.then((res) => {
				if (res.data.success) {
					console.log(res.data.detail);
					setDetail(res.data.detail);
				}
			})
			.catch((err) => console.log(err));
	}, [item]);

	return (
		<Layout name={'Detail'}>
			{
				<>
					<DetailStyle>
						<h2>{detail?.title}</h2>
						<p>{detail?.content}</p>
					</DetailStyle>

					{user.accessToken !== '' && (
						<BtnStyle>
							<button>
								<Link to={`/edit/${detail?.communityNum}`}>Edit</Link>
							</button>
							<button onClick={handleDelete}>
								<Link>Delete</Link>
							</button>
						</BtnStyle>
					)}
				</>
			}
		</Layout>
	);
}

export default Detail;
