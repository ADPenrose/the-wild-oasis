import { useSearchParams } from 'react-router-dom';
import Select from './Select';

function SortBy({ options }) {
	// Getting the current params from the URL.
	const [searchParams, setSearchParams] = useSearchParams();

	// Getting the current sort value from the URL.
	const sortBy = searchParams.get('sortBy') || '';

	function handleChange(e) {
		// Adding the new sort value to the search params.
		searchParams.set('sortBy', e.target.value);
		setSearchParams(searchParams);
	}

	return (
		<Select
			options={options}
			type="white"
			value={sortBy}
			onChange={handleChange}
		/>
	);
}

export default SortBy;
