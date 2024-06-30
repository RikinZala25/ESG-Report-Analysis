import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
	return (
		<div>
			<nav>
				<div className="nav-items container">
					<div className="logo">
						<a href="/">
							<h1>ESG Investment App</h1>
						</a>
					</div>
					<ul>
						<li>
							<NavLink to="/">Home</NavLink>
						</li>
                        <li>
							<NavLink to="/ratings">Ratings</NavLink>
						</li>
						<li>
							<NavLink to="/allocation">Allocation</NavLink>
						</li>
						<li>
							<NavLink to="/report-analyser">Report Analyser</NavLink>
						</li>
						<li>
							<NavLink to="/about">About</NavLink>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	);
};

export default NavBar;