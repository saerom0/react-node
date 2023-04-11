import axios from 'axios';
import Layout from '../common/Layout';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function List() {
	const [list, setList] = useState([]);
	useEffect(() => {
		axios
			.post('/api/community/read')
			.then((res) => {
				if (res.data.success) {
					console.log(res.data.communityList);
					setList(res.data.communityList);
				}
			})
			.catch((err) => console.log(err));
	}, []);
	return (
		<Layout name={'List'}>
			{list.map((post) => {
				return (
					<article key={post._id}>
						<h2>
							<Link to={`/detail/${post.communityNum}`}>{post.title}</Link>
						</h2>
					</article>
				);
			})}
		</Layout>
	);
}

export default List;
