import supabase from './supabase';

export async function getCabins() {
	// Creating a query to the supabase client.
	const { data, error } = await supabase.from('cabins').select('*');

	// If there is an error, we throw it.
	if (error) {
		console.error(error);
		throw new Error('Cabins could not be loaded');
	}

	// If there is no error, we return the data.
	return data;
}
