import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createEditCabin } from '../../services/apiCabins';

export function useEditCabin() {
	// Getting access to the query client.
	const queryClient = useQueryClient();

	// This mutation is for the edit form.
	const { mutate: editCabin, isPending: isEditing } = useMutation({
		// I need to use a callback function because I need to pass multiple
		// arguments to the editCabin function.
		mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
		onSuccess: () => {
			// Showing a success toast notification when the cabin was created.
			toast.success('Cabin successfully edited!');
			// Invalidating the query.
			queryClient.invalidateQueries({ queryKey: ['cabins'] });
		},
		onError: (error) => {
			// Showing an error toast notification when the cabin creation failed.
			toast.error(error.message);
		},
	});

	// Returning the editCabin function and the loading state.
	return { editCabin, isEditing };
}
