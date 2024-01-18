import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCabin as deleteCabinApi } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export function useDeleteCabin() {
	// Getting access to the query client.
	const queryClient = useQueryClient();

	// From the useMutation hook, we can get the data, but also
	// the mutate function, which will be used to trigger the
	// mutation.
	const { isPending: isDeleting, mutate: deleteCabin } = useMutation({
		// The id will be given automatically to the deleteCabin
		// callback function thanks to the mutate function.
		mutationFn: deleteCabinApi,
		onSuccess: () => {
			// Alerting the user that the cabin was deleted.
			toast.success(`Cabin was deleted successfully!`);
			// We can invalidate the query to refetch the data.
			queryClient.invalidateQueries({ queryKey: ['cabins'] });
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	// Using this custom hook should return two things: the mutate function
	// and the loading state.
	return { isDeleting, deleteCabin };
}
