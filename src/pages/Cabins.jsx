import Heading from '../ui/Heading';
import Row from '../ui/Row';
import CabinTable from '../features/cabins/CabinTable';
import CreateCabinForm from '../features/cabins/CreateCabinForm';
import { useState } from 'react';
import Button from '../ui/Button';

function Cabins() {
	// DEV: This state is temporary.
	const [showForm, setShowForm] = useState(false);

	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">All cabins</Heading>
				<p>Filter/Sort</p>
			</Row>
			<Row>
				<CabinTable />
				<Button onClick={() => setShowForm((show) => !show)}>
					Add new cabin
				</Button>
				{showForm && <CreateCabinForm />}
			</Row>
			<Row></Row>
		</>
	);
}

export default Cabins;
