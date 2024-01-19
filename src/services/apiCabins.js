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

export async function createEditCabin(newCabin, id) {
	// First, we check if the image data sent has supabase's url.
	const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

	// Creating a "random" name for the image. We need to replace the slashes
	// because Supabase would create folders otherwise.
	const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
		'/',
		''
	);

	// This is the path where the image will be stored. If there is already
	// a path, we use it. If not, we create a new one.
	const imagePath = hasImagePath
		? newCabin.image
		: `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

	// Let's create a reusabel query.
	let query = supabase.from('cabins');

	// If there is no id, we create a new cabin.
	if (!id) {
		query = query.insert([{ ...newCabin, image: imagePath }]);
	}

	// If there is an id, we update the cabin.
	if (id) {
		query = query.update({ ...newCabin, image: imagePath }).eq('id', id);
	}

	const { data, error } = await query.select().single();

	// If there is an error, we throw it.
	if (error) {
		console.error(error);
		throw new Error('Cabin could not be created');
	}

	// If there is already an image, we don't need to upload anything, so we can
	// return the data.
	if (hasImagePath) {
		return data;
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
