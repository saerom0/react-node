import { useState } from 'react';
import Layout from '../common/Layout';
import { useNavigate } from 'react-router-dom';
import firebase from '../firebase';
import styled from 'styled-components';

const BtnSet = styled.div`
	display: flex;
	gap: 10px;
	margin-top: 20px;
`;

function Login() {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [pwd, setPwd] = useState('');
	const [err, setErr] = useState('');

	const handleLogin = async () => {
		if (!email && pwd) return alert('모든 값을 입력하세요.');
		try {
			await firebase.auth().signInWithEmailAndPassword(email, pwd);
			navigate('/');
		} catch (err) {
			if (err.code == 'auth/user-not-found')
				setErr('존재하지 않는 이메일입니다.');
			else if (err.code == 'auth/wrong-password')
				setErr('비밀번호가 일치하지 않습니다.');
			else setErr('로그인에 실패하였습니다.');
		}
	};
	return (
		<Layout name={'Login'}>
			<input
				type='email'
				value={email}
				placeholder='이메일 주소를 입력하세요'
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type='password'
				value={pwd}
				placeholder='비밀번호를 입력하세요'
				onChange={(e) => setPwd(e.target.value)}
			/>

			<BtnSet>
				<button onClick={handleLogin}>로그인</button>
				<button onClick={() => navigate('/join')}>회원가입</button>
			</BtnSet>
			{err !== '' && (
				<p style={{ fontFamily: 'arial', color: 'violet', marginTop: '10px' }}>
					{err}
				</p>
			)}
		</Layout>
	);
}

export default Login;
