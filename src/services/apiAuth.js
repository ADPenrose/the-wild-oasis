import supabase from './supabase';

export async function signup({ fullName, email, password }) {
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		// This is an optional property that allows us to store additional
		// information about the user.
		options: {
			data: {
				fullName,
				avatar: '',
			},
		},
	});

	if (error) throw new Error(error.message);

	return data;
}

export async function login({ email, password }) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) throw new Error(error.message);

	return data;
}

export async function getCurrentUser() {
	// Check for the current active session.
	const { data: session } = await supabase.auth.getSession();
	if (!session) return null;

	// If there is a session, return the current user.
	const { data, error } = await supabase.auth.getUser();
	// console.log(data);

	if (error) throw new Error(error.message);

	return data?.user;
}

export async function logout() {
	const { error } = await supabase.auth.signOut();
	if (error) throw new Error(error.message);
}