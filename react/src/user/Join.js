import Layout from '../common/Layout';
import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from '../firebase';

const BtnSet = styled.div`
	display: flex;
	gap: 15px;
	margin-top: 20px;
`;

function Join() {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [pwd1, setPwd1] = useState('');
	const [pwd2, setPwd2] = useState('');
	const [name, setName] = useState('');

	const handleJoin = async () => {
		if (!(name && email && pwd1 && pwd2))
			return alert('모든 항목을 입력하세요.');
		if (pwd1 !== pwd2) return alert('비밀번호를 동일하게 입력하세요.');
		let createdUser = await firebase
			.auth()
			.createUserWithEmailAndPassword(email, pwd1);
		await createdUser.user.updateProfile({ displayName: name });
		console.log(createdUser.user);
		navigate('/login');
	};
	return (
		<Layout name={'Join'}>
			<input
				type='email'
				value={email}
				placeholder='이메일 주소를 입력하세요'
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type='password'
				value={pwd1}
				placeholder='비밀번호를 입력하세요'
				onChange={(e) => setPwd1(e.target.value)}
			/>
			<input
				type='password'
				value={pwd2}
				placeholder='비밀번호를 재입력하세요'
				onChange={(e) => setPwd2(e.target.value)}
			/>
			<input
				type='text'
				value={name}
				placeholder='사용자명을 입력하세요'
				onChange={(e) => setName(e.target.value)}
			/>

			<BtnSet>
				<button
					onClick={() => {
						navigate(-1);
					}}
				>
					가입취소
				</button>
				<button onClick={handleJoin}>회원가입</button>
			</BtnSet>
		</Layout>
	);
}
export default Join;
