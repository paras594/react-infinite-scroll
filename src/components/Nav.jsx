import React from "react";
import styled from "styled-components";

const Navbar = styled.nav`
	text-align: center;
	background: #00a5ad;
	padding: 1rem 0;
	box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);

	p {
		font-size: 2rem;
		color: #fafafa;
	}
`;

const Nav = () => (
	<Navbar>
		<p>Search Book Titles</p>
	</Navbar>
);

export default Nav;
