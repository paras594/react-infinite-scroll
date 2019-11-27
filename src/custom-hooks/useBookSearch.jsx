import { useEffect, useState } from "react";
import Axios from "axios";

const useBookSearch = (query, pageNumber) => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [books, setBooks] = useState([]);
	const [hasMore, setHasMore] = useState(false);

	useEffect(() => {
		setBooks([]);
	}, [query]);

	useEffect(() => {
		setLoading(true);
		setError(false);
		let cancel;

		Axios({
			method: "GET",
			url: "https://openlibrary.org/search.json",
			params: { q: query, page: pageNumber },
			cancelToken: new Axios.CancelToken(c => (cancel = c)),
		})
			.then(res => {
				setBooks(prevBooks => {
					return Array.from(
						new Set([...prevBooks, ...res.data.docs.map(b => b.title)])
					);
				});
				setHasMore(res.data.docs.length > 0);
				setLoading(false);
			})
			.catch(err => {
				if (Axios.isCancel(err)) return;
				setLoading(false);
				setError(true);
			});

		return () => cancel();
	}, [query, pageNumber]);

	return { loading, error, books, hasMore };
};

export default useBookSearch;
