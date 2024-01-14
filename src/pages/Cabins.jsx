import { useEffect } from 'react';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import { getCabins } from '../services/apiCabins';

function Cabins() {
	// DEV: Get all cabins from the API when the component is mounted.
	// This is temporary and will be replaced when I learn about React
	// Query.
	useEffect(function () {
		getCabins().then((data) => console.log(data));
	}, []);

	return (
		<Row type="horizontal">
			<Heading as="h1">All cabins</Heading>
			<p>TEST</p>
		</Row>
	);
}

export default Cabins;
