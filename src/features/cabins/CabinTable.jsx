import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import { useCabins } from './useCabins';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { useSearchParams } from 'react-router-dom';
import Empty from '../../ui/Empty';

function CabinTable() {
	// I can use the custom hook for fetching data.
	const { cabins, isPending } = useCabins();
	const [searchParams] = useSearchParams();

	// If the data is loading, we show a spinner.
	if (isPending) return <Spinner />;

	if (!cabins.length) return <Empty resourceName="cabins" />;

	// The params from the URL will give us the filter value.
	// 1. Filter.
	const filterValue = searchParams.get('discount') || 'all';

	// We filter the cabins based on the filter value.
	let filteredCabins;
	if (filterValue === 'all') filteredCabins = cabins;
	if (filterValue === 'no-discount')
		filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
	if (filterValue === 'with-discount')
		filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

	// 2. Sort.
	const sortBy = searchParams.get('sortBy') || 'startDate-asc';
	const [field, direction] = sortBy.split('-');
	const modifier = direction === 'asc' ? 1 : -1;
	const sortedCabins = filteredCabins?.sort(
		(a, b) => (a[field] - b[field]) * modifier
	);

	return (
		<Menus>
			<Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
				<Table.Header>
					<div></div>
					<div>Cabin</div>
					<div>Capacity</div>
					<div>Price</div>
					<div>Discount</div>
					<div></div>
				</Table.Header>
				{/* Using the render props pattern */}
				<Table.Body
					data={sortedCabins}
					render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
				/>
			</Table>
		</Menus>
	);
}

export default CabinTable;
