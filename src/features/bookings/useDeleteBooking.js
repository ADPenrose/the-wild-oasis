import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBooking as deleteBookingApi } from '../../services/apiBookings';
import toast from 'react-hot-toast';

export function useDeleteBooking() {
	// Getting access to the query client.
	const queryClient = useQueryClient();

	// From the useMutation hook, we can get the data, but also
	// the mutate function, which will be used to trigger the
	// mutation.
	const { isPending: isDeleting, mutate: deleteBooking } = useMutation({
		// The id will be given automatically to the deleteCabin
		// callback function thanks to the mutate function.
		mutationFn: deleteBookingApi,
		onSuccess: () => {
			// Alerting the user that the cabin was deleted.
			toast.success(`Booking was deleted successfully!`);
			// We can invalidate the query to refetch the data.
			queryClient.invalidateQueries({ queryKey: ['bookings'] });
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	// Using this custom hook should return two things: the mutate function
	// and the loading state.
	return { isDeleting, deleteBooking };
}
