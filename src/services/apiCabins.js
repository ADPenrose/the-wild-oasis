import supabase, { supabaseUrl } from './supabase';

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

export async function createCabin(newCabin) {
	// Creating a "random" name for the image. We need to replace the slashes
	// because Supabase would create folders otherwise.
	const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
		'/',
		''
	);

	// This is the path where the image will be stored.
	const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

	// First, a new cabin needs to be created.
	const { data, error } = await supabase
		.from('cabins')
		.insert([{ ...newCabin, image: imagePath }])
		.select();

	// If there is an error, we throw it.
	if (error) {
		console.error(error);
		throw new Error('Cabin could not be created');
	}

	// If there is no error, we need to upload the image.
	const { error: storageError } = await supabase.storage
		.from('cabin-images')
		.upload(imageName, newCabin.image);

	// If there is an error while loading the image, we delete the cabin.
	if (storageError) {
		await supabase.from('cabins').delete().eq('id', data.id);
		throw new Error(
			'Cabin image could not be uploaded and the cabin was not created'
		);
	}

	return data;
}

export async function deleteCabin(id) {
	const { data, error } = await supabase.from('cabins').delete().eq('id', id);

	// If there is an error, we throw it.
	if (error) {
		console.error(error);
		throw new Error('Cabin could not be deleted');
	}

	return data;
}
