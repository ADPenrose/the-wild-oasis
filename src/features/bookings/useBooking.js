import { useQuery } from '@tanstack/react-query';
import { getBooking } from '../../services/apiBookings';
import { useParams } from 'react-router-dom';

export function useBooking() {
	// Getting the ID from the URL.
	const { bookingId } = useParams();

	// Quering the Supabase API.
	const {
		isPending,
		data: booking,
		error,
	} = useQuery({
		queryKey: ['booking', bookingId],
		queryFn: () => getBooking(bookingId),
		retry: false,
	});

	// Returning the cabins and the loading state.
	return { booking, isPending, error };
}
