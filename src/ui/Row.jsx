import styled, { css } from 'styled-components';

const Row = styled.div`
	display: flex;

	/* If the type of row is horizontal, apply these styles. */
	${(props) =>
		props.type === 'horizontal' &&
		css`
			justify-content: space-between;
			align-items: center;
		`}

	/* If the type of row is vertical, apply these styles. */
	${(props) =>
		props.type === 'vertical' &&
		css`
			flex-direction: column;
			gap: 1.6rem;
		`}
`;

// Setting some default props.
Row.defaultProps = {
	type: 'vertical',
};

export default Row;
