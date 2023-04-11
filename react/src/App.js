import axios from 'axios';
import { useEffect } from 'react';

function App() {
	const item = { name: 'David' };

	useEffect(() => {
		axios
			.post('/api/send', item)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [item]);

	return (
		<div className='App'>
			<h1>React</h1>
		</div>
	);
}

export default App;
