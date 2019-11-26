import React, { useRef, useCallback } from "react";
import useBookSearch from "../custom-hooks/useBookSearch";
import Loader from "./Loader";
import styled from "styled-components";

const List = styled.ul`
	width: 80%;
	max-width: 600px;
	list-style: none;
	margin: 0 auto;
`;

const Item = styled.li`
	background: #fafafa;
	color: #1e2436;
	font-weight: bold;
	border-radius: 4px;
	margin: 0.8rem;
	padding: 0.8rem 1rem;
	text-align: center;
	font-size: 1.3rem;
	line-height: 1.5;
`;

const Error = styled.p`
	font-size: 1.3rem;
	text-align: center;
	padding: 1rem;
	color: red;
`;

const BookList = ({ query, pageNumber, handlePageNumberChange }) => {
	const { books, hasMore, loading, error } = useBookSearch(query, pageNumber);

	const observer = useRef();

	const lastBookElementRef = useCallback(
		node => {
			if (loading) return;
			const notNull = observer.current;
			if (notNull) observer.current.disconnect();
			// entries is the list of intersection is observing;
			observer.current = new IntersectionObserver(entries => {
				if (entries[0].isIntersecting && hasMore) {
					handlePageNumberChange();
				}
			});

			if (node) observer.current.observe(node);
		},
		[loading, hasMore]
	);

	return (
		<>
			<List>
				{books.map((book, index) => {
					if (books.length === index + 1) {
						return (
							<Item ref={lastBookElementRef} key={book}>
								{book}
							</Item>
						);
					} else {
						return <Item key={book}>{book}</Item>;
					}
				})}
			</List>
			{loading && <Loader />}
			{error && <Error>Error</Error>}
		</>
	);
};

export default BookList;
