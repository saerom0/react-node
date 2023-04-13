import Layout from '../common/Layout';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';

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
	const item = useMemo(() => ({ num: params.num }), [params]);

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
					<BtnStyle>
						<button>
							<Link to={`/edit/${detail?.communityNum}`}>Edit</Link>
						</button>
						<button>
							<Link>Delete</Link>
						</button>
					</BtnStyle>
				</>
			}
		</Layout>
	);
}

export default Detail;
