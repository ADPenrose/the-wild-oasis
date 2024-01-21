import { useSearchParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

const StyledFilter = styled.div`
	border: 1px solid var(--color-grey-100);
	background-color: var(--color-grey-0);
	box-shadow: var(--shadow-sm);
	border-radius: var(--border-radius-sm);
	padding: 0.4rem;
	display: flex;
	gap: 0.4rem;
`;

const FilterButton = styled.button`
	background-color: var(--color-grey-0);
	border: none;

	${(props) =>
		props.$active &&
		css`
			background-color: var(--color-brand-600);
			color: var(--color-brand-50);
		`}

	border-radius: var(--border-radius-sm);
	font-weight: 500;
	font-size: 1.4rem;
	/* To give the same height as select */
	padding: 0.44rem 0.8rem;
	transition: all 0.3s;

	&:hover:not(:disabled) {
		background-color: var(--color-brand-600);
		color: var(--color-brand-50);
	}
`;

function Filter({ filterField, options }) {
	const [searchParams, setSearchParams] = useSearchParams();
	// We get the current filter value from the URL. This will allow us to
	// show the active filter button.
	const currentFilter = searchParams.get(filterField);

	function handleClick(value) {
		// This sets the search params to the value of the button that was clicked.
		searchParams.set(filterField, value);
		// Once we have the updated params, we need to make that change also in
		// the URL.
		setSearchParams(searchParams);
	}

	return (
		<StyledFilter>
			{options.map((option) => (
				<FilterButton
					key={option.value}
					$active={currentFilter === option.value}
					disabled={currentFilter === option.value}
					onClick={() => handleClick(option.value)}
				>
					{option.label}
				</FilterButton>
			))}
		</StyledFilter>
	);
}

export default Filter;
