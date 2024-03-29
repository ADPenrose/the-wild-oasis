import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabins';

export function useCabins() {
	// Quering the Supabase API.
	const {
		isPending,
		data: cabins,
		error,
	} = useQuery({
		queryKey: ['cabins'],
		queryFn: getCabins,
	});

	// Returning the cabins and the loading state.
	return { cabins, isPending, error };
}
