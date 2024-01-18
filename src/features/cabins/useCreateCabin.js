import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export function useCreateCabin() {
	// Getting access to the query client.
	const queryClient = useQueryClient();

	// Using a mutation from react query to submit the form data.
	const { mutate: createCabin, isPending: isCreating } = useMutation({
		// Since I will pass the new cabin data to the mutation function,
		// I don't need to pass any arguments here to the createCabin function.
		mutationFn: createEditCabin,
		onSuccess: () => {
			// Showing a success toast notification when the cabin was created.
			toast.success('Cabin created successfully!');
			// Invalidating the query.
			queryClient.invalidateQueries({ queryKey: ['cabins'] });
		},
		onError: (error) => {
			// Showing an error toast notification when the cabin creation failed.
			toast.error(error.message);
		},
	});

	// Returning the createCabin function and the loading state.
	return { createCabin, isCreating };
}
