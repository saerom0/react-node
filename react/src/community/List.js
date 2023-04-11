import axios from 'axios';
import Layout from '../common/Layout';
import { useEffect } from 'react';

function List() {
	useEffect(() => {
		axios
			.post('/api/read')
			.then((res) => {
				if (res.data.success) {
					console.log(res.data.communityList);
				}
			})
			.catch((err) => console.log(err));
	}, []);
	return <Layout name={'List'}>List</Layout>;
}

export default List;
