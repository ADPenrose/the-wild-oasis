import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useCheckin() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { mutate: checkin, isPending: isCheckingIn } = useMutation({
		mutationFn: (bookingId) =>
			updateBooking(bookingId, { status: 'checked-in', isPaid: true }),
		onSuccess: (data) => {
			toast.success(
				`Booking #${data.id} successfully checked-in successfully!`
			);
			// Invalidating all of the currently active queries.
			queryClient.invalidateQueries({ active: true });
			navigate('/');
		},
		onError: () => {
			toast.error('There was an error checking-in the booking.');
		},
	});

	return { checkin, isCheckingIn };
}
