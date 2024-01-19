import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateSetting as updateSettingAPI } from '../../services/apiSettings';

export function useUpdateSetting() {
	// Getting access to the query client.
	const queryClient = useQueryClient();

	// This mutation is for the edit form.
	const { mutate: updateSetting, isPending: isUpdating } = useMutation({
		// I need to use a callback function because I need to pass multiple
		// arguments to the editCabin function.
		mutationFn: updateSettingAPI,
		onSuccess: () => {
			// Showing a success toast notification when the cabin was created.
			toast.success('Setting successfully edited!');
			// Invalidating the query.
			queryClient.invalidateQueries({ queryKey: ['settings'] });
		},
		onError: (error) => {
			// Showing an error toast notification when the cabin creation failed.
			toast.error(error.message);
		},
	});

	// Returning the editCabin function and the loading state.
	return { updateSetting, isUpdating };
}
