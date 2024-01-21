import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';

export function useBookings() {
	// Quering the Supabase API.
	const {
		isPending,
		data: bookings,
		error,
	} = useQuery({
		queryKey: ['bookings'],
		queryFn: getBookings,
	});

	// Returning the cabins and the loading state.
	return { bookings, isPending, error };
}
