import Layout from '../common/Layout';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState, useMemo } from 'react';

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
					<h2>{detail?.title}</h2>
					<p>{detail?.content}</p>
				</>
			}
		</Layout>
	);
}

export default Detail;
