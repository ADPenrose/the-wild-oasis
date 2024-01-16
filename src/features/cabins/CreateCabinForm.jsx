import styled from 'styled-components';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

const FormRow = styled.div`
	display: grid;
	align-items: center;
	grid-template-columns: 24rem 1fr 1.2fr;
	gap: 2.4rem;

	padding: 1.2rem 0;

	&:first-child {
		padding-top: 0;
	}

	&:last-child {
		padding-bottom: 0;
	}

	&:not(:last-child) {
		border-bottom: 1px solid var(--color-grey-100);
	}

	&:has(button) {
		display: flex;
		justify-content: flex-end;
		gap: 1.2rem;
	}
`;

const Label = styled.label`
	font-weight: 500;
`;

const Error = styled.span`
	font-size: 1.4rem;
	color: var(--color-red-700);
`;

function CreateCabinForm() {
	// Getting access to some vital functions from the useForm hook.
	const { register, handleSubmit, reset } = useForm();

	// Getting access to the query client.
	const queryClient = useQueryClient();

	// Using a mutation from reactquery to submit the form data.
	const { mutate, isLoading: isCreating } = useMutation({
		// Since I will pass the new cabin data to the mutation function,
		// I don't need to pass any arguments here to the createCabin function.
		mutationFn: createCabin,
		onSuccess: () => {
			// Showing a success toast notification when the cabin was created.
			toast.success('Cabin created successfully!');
			// Invalidating the query.
			queryClient.invalidateQueries({ queryKey: ['cabins'] });
			// Resetting the form.
			reset();
		},
		onError: (error) => {
			// Showing an error toast notification when the cabin creation failed.
			toast.error(error.message);
		},
	});

	// This function will be called when the form is submitted.
	// It gets access to all the data from the form.
	function onSubmit(data) {
		mutate(data);
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormRow>
				<Label htmlFor="name">Cabin name</Label>
				{/* Registering the input fields that we want React Hook Forms to handle*/}
				<Input type="text" id="name" {...register('name')} />
			</FormRow>

			<FormRow>
				<Label htmlFor="maxCapacity">Maximum capacity</Label>
				<Input type="number" id="maxCapacity" {...register('maxCapacity')} />
			</FormRow>

			<FormRow>
				<Label htmlFor="regularPrice">Regular price</Label>
				<Input type="number" id="regularPrice" {...register('regularPrice')} />
			</FormRow>

			<FormRow>
				<Label htmlFor="discount">Discount</Label>
				<Input
					type="number"
					id="discount"
					defaultValue={0}
					{...register('discount')}
				/>
			</FormRow>

			<FormRow>
				<Label htmlFor="description">Description for website</Label>
				<Textarea
					type="number"
					id="description"
					defaultValue=""
					{...register('description')}
				/>
			</FormRow>

			<FormRow>
				<Label htmlFor="image">Cabin photo</Label>
				<FileInput id="image" accept="image/*" />
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button $variation="secondary" type="reset">
					Cancel
				</Button>
				<Button disabled={isCreating}>Add cabin</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
