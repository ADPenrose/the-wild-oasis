import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

// Importing the pages.
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Cabins from './pages/Cabins';
import Account from './pages/Account';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';

// Importing the global styles component.
import GlobalStyles from './styles/GlobalStyles';
import AppLayout from './ui/AppLayout';

// Since we are not going to be using the data loading
// functionality of React Router, we can just use the
// old way of defining routes.
function App() {
	return (
		<>
			{/* Importing the global styles component. */}
			<GlobalStyles />
			<BrowserRouter>
				<Routes>
					{/* This route is here to provide a layout to its child routes */}
					<Route element={<AppLayout />}>
						{/* Creating a redirect to the dashboard page */}
						<Route index element={<Navigate to="dashboard" replace />} />
						<Route path="dashboard" element={<Dashboard />} />
						<Route path="bookings" element={<Bookings />} />
						<Route path="cabins" element={<Cabins />} />
						<Route path="users" element={<Users />} />
						<Route path="settings" element={<Settings />} />
						<Route path="account" element={<Account />} />
					</Route>
					<Route path="login" element={<Login />} />
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;

// import styled from 'styled-components';
// import GlobalStyles from './styles/GlobalStyles';
// import Button from './ui/Button';
// import Input from './ui/Input';
// import Heading from './ui/Heading';
// import Row from './ui/Row';

// // Styling the content of the App component. It is a convention
// // calling it StyledApp.
// const StyledApp = styled.div`
// 	/* background-color: orangered; */
// 	padding: 20px;
// `;

// function App() {
// 	return (
// 		<>
// 			<GlobalStyles />
// 			<StyledApp>
// 				<Row>
// 					<Row type="horizontal">
// 						{/* The as prop let's us define what kind of element should be
//         rendered */}
// 						<Heading as="h1">The Wild Oasis</Heading>
// 						<div>
// 							<Heading as="h2">Check in and out</Heading>
// 							<Button onClick={() => alert('Check In')}>Check In</Button>
// 							<Button
// 								variation="secondary"
// 								size="small"
// 								onClick={() => alert('Check Out')}
// 							>
// 								Check Out
// 							</Button>
// 						</div>
// 					</Row>

// 					<Row>
// 						<Heading as="h3">Form</Heading>
// 						<div>
// 							<Input type="text" placeholder="Number of Guests" />
// 							<Input type="text" placeholder="Number of Guests" />
// 						</div>
// 					</Row>
// 				</Row>
// 			</StyledApp>
// 		</>
// 	);
// }

// export default App;
