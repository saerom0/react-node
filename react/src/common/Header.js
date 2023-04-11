import { NavLink } from 'react-router-dom';

function Header() {
	const activeStyle = { color: 'violet' };
	return (
		<header>
			<h1>
				<NavLink to='/'>Logo</NavLink>
			</h1>
			<ul id='gnb'>
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
			</ul>
		</header>
	);
}

export default Header;
