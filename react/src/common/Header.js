import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/userSlice';
import firebase from '../firebase';

const HeaderStyle = styled.header`
	width: 350px;
	height: 100vh;
	position: fixed;
	background: #222;
	top: 0;
	left: 0;
	padding: 50px;
`;

const Logo = styled.h1`
	margin-bottom: 40px;
	a {
		font: 50px/1 'arial';
		color: #fff;
	}
`;

const Gnb = styled.ul`
	a {
		display: block;
		padding: 10px;
		font: bold 16px/1 'arial';
		color: #bbb;
		&:hover {
			color: hotpink;
		}
	}
`;
const Util = styled.ul`
	position: absolute;
	bottom: 50px;
	left: 50px;
	display: flex;
	gap: 20px;
	li {
		a {
			font: 14px/1 'arial';
			color: #eee;
			padding: 5px 15px;
			border: 1px solid #eee;
			cursor: pointer;
			&:hover {
				background: #eee;
				color: #000;
			}
		}
	}
`;

const LoginUtil = styled.ul`
	position: absolute;
	bottom: 50px;
	left: 50px;
	display: flex;
	gap: 20px;
	p {
		color: aqua;
	}
	a {
		display: inline-block;
		color: #eee;
		font: 14px/1 'arial';
		padding: 5px;
		border: 1px solid #eee;
		cursor: pointer;
		&:hover {
			background: #eee;
			color: #000;
		}
	}
`;

function Header() {
	const activeStyle = { color: 'violet' };
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector((store) => store.user);

	return (
		<HeaderStyle>
			<Logo>
				<NavLink to='/'>Logo</NavLink>
			</Logo>
			<Gnb>
				<li>
					<NavLink
						to='/list'
						style={({ isActive }) => (isActive ? activeStyle : null)}
					>
						Show List
					</NavLink>
				</li>
				{user.accessToken !== '' && (
					<li>
						<NavLink
							to='/create'
							style={({ isActive }) => (isActive ? activeStyle : null)}
						>
							Write Post
						</NavLink>
					</li>
				)}
			</Gnb>
			{user.accessToken === '' ? (
				<Util>
					<li>
						<NavLink
							to='/login'
							style={({ isActive }) => (isActive ? activeStyle : null)}
						>
							Login
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/join'
							style={({ isActive }) => (isActive ? activeStyle : null)}
						>
							Join
						</NavLink>
					</li>
				</Util>
			) : (
				<LoginUtil>
					<p>{`${user.displayName}님 반갑습니다!`}</p>
					<a
						onClick={() => {
							firebase.auth().signOut();
							alert('로그아웃 되었습니다. 메인페이지로 이동합니다.');
							dispatch(logoutUser());
							navigate('/');
						}}
					>
						로그아웃
					</a>
				</LoginUtil>
			)}
		</HeaderStyle>
	);
}

export default Header;
