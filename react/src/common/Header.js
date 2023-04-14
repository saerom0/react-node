import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

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
			color: #555;
		}
	}
`;

function Header() {
	const activeStyle = { color: 'violet' };
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
				<li>
					<NavLink
						to='/create'
						style={({ isActive }) => (isActive ? activeStyle : null)}
					>
						Write Post
					</NavLink>
				</li>
			</Gnb>
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
		</HeaderStyle>
	);
}

export default Header;
