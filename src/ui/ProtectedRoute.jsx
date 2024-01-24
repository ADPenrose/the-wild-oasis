import styled from 'styled-components';
import { useUser } from '../features/authentication/useUser';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const FullPage = styled.div`
	height: 100vh;
	background-color: var(--color-grey-50);
	display: flex;
	align-items: center;
	justify-content: center;
`;

function ProtectedRoute({ children }) {
	const navigate = useNavigate();
	// Loading the authenticated user.
	const { user, isPending, isAuthenticated } = useUser();

	// If there is no authenticated user, redirect to the login page.
	useEffect(
		function () {
			if (!isAuthenticated && !isPending) {
				navigate('/login');
			}
		},
		[isAuthenticated, isPending, navigate]
	);

	// While the user is loading, show a spinner.
	if (isPending) {
		return (
			<FullPage>
				<Spinner />
			</FullPage>
		);
	}

	// If there is an authenticated user, render the app.
	if (isAuthenticated) return children;
}

export default ProtectedRoute;
