import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';

export function useBookings() {
	// Getting the params from the URL.
	const [searchParams] = useSearchParams();
	// Accessing the query client.
	const queryClient = useQueryClient();

	// For filtering.
	const filterValue = searchParams.get('status');
	const filter =
		!filterValue || filterValue === 'all'
			? null
			: { field: 'status', value: filterValue };

	// For sorting.
	const sotyByRaw = searchParams.get('sortBy') || 'startDate-desc';
	const [field, direction] = sotyByRaw.split('-');
	const sortBy = { field, direction };

	// For pagination.
	const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

	// Quering the Supabase API.
	const {
		isPending,
		data: { data: bookings, count } = {},
		error,
	} = useQuery({
		queryKey: ['bookings', filter, sortBy, page],
		queryFn: () => getBookings({ filter, sortBy, page }),
	});

	// Pre-fetching if we are not on the last page or the first page.
	const pageCount = Math.ceil(count / 10);

	if (page < pageCount)
		queryClient.prefetchQuery({
			// eslint-disable-next-line @tanstack/query/exhaustive-deps
			queryKey: ['bookings', filter, sortBy, page + 1],
			queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
		});

	if (page > 1)
		queryClient.prefetchQuery({
			// eslint-disable-next-line @tanstack/query/exhaustive-deps
			queryKey: ['bookings', filter, sortBy, page - 1],
			queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
		});

	// Returning the cabins and the loading state.
	return { bookings, isPending, error, count };
}
