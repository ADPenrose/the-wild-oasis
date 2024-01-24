import styled, { css } from 'styled-components';

// Creating an styled component.
const Heading = styled.h1`
	// If the type is h1, then apply the following styles.
	${(props) =>
		// We access the as value on the props object, because that is
		// the name of the prop we are passing to the Heading component.
		props.as === 'h1' &&
		css`
			font-size: 3rem;
			font-weight: 600;
		`}

	// If the type is h2, then apply the following styles.
	${(props) =>
		props.as === 'h2' &&
		css`
			font-size: 2rem;
			font-weight: 600;
		`}

	// If the type is h3, then apply the following styles.
	${(props) =>
		props.as === 'h3' &&
		css`
			font-size: 2rem;
			font-weight: 500;
		`}

	// If the type is h4, then apply the following styles.
	${(props) =>
		props.as === 'h4' &&
		css`
			font-size: 3rem;
			font-weight: 600;
			text-align: center;
		`}

	/* This style applies to all of the cases */
  line-height: 1.4;
`;

export default Heading;
