import React, { useState, Suspense } from "react";
import Nav from "./components/Nav";
import BookList from "./components/BookList";
import styled from "styled-components";

const Input = styled.input`
	border: 1px solid #888;
	border-radius: 4px;
	display: block;
	margin: 3rem auto 2rem auto;
	background: #fafafa;
	padding: 0.5rem 0.8rem;
	width: 300px;
	font-size: 1.3rem;
`;

const App = () => {
	const [query, setQuery] = useState("");
	const [pageNumber, setPageNumber] = useState(1);

	const handleChange = e => {
		setQuery(e.target.value);
		setPageNumber(1);
	};

	const handlePageNumberChange = () => {
		setPageNumber(prevPageNumber => prevPageNumber + 1);
	};

	return (
		<>
			<Nav />
			<Input
				type="text"
				onChange={handleChange}
				value={query}
				placeholder="Enter a book name"
			/>
			<BookList
				query={query}
				handlePageNumberChange={handlePageNumberChange}
				pageNumber={pageNumber}
			/>
		</>
	);
};

export default App;
