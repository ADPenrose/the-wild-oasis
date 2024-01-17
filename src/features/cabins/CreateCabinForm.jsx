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
import FormRow from '../../ui/FormRow';

function CreateCabinForm() {
	// Getting access to some vital functions from the useForm hook.
	const { register, handleSubmit, reset, getValues, formState } = useForm();

	// Getting all of the validation errors from the form.
	const { errors } = formState;

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
		// Since the image is an array, I need to get the first element from it.
		mutate({ ...data, image: data.image[0] });
	}

	// This function will be called when the form has validation errors.
	function onError(errors) {
		// console.log(errors);
	}

	return (
		// Handling both the submit and the error cases (validation-wise) for the form.
		<Form onSubmit={handleSubmit(onSubmit, onError)}>
			<FormRow label="Cabin name" error={errors?.name?.message}>
				{/* Registering the input fields that we want React Hook Forms to handle*/}
				<Input
					type="text"
					id="name"
					// While the cabin is being created, the input field is disabled.
					disabled={isCreating}
					// Defining some validation rules for the input field.
					{...register('name', { required: 'This field is required' })}
				/>
			</FormRow>

			<FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
				<Input
					type="number"
					id="maxCapacity"
					disabled={isCreating}
					{...register('maxCapacity', {
						required: 'This field is required',
						min: {
							value: 1,
							message: 'The minimum capacity is 1',
						},
					})}
				/>
			</FormRow>

			<FormRow label="Regular price" error={errors?.regularPrice?.message}>
				<Input
					type="number"
					id="regularPrice"
					disabled={isCreating}
					{...register('regularPrice', {
						required: 'This field is required',
						min: {
							value: 1,
							message: 'The minimum capacity is 1',
						},
					})}
				/>
			</FormRow>

			<FormRow label="Discount" error={errors?.discount?.message}>
				<Input
					type="number"
					id="discount"
					defaultValue={0}
					disabled={isCreating}
					{...register('discount', {
						required: 'This field is required',
						// Custom validation rule. If it fails, we return a message.
						validate: (value) =>
							// Since we are comparing numbers, we need to convert the values to numbers.
							+value <= +getValues().regularPrice ||
							'Discount cannot be higher than the regular price',
					})}
				/>
			</FormRow>

			<FormRow
				label="Description for website"
				error={errors?.description?.message}
			>
				<Textarea
					type="number"
					id="description"
					defaultValue=""
					disabled={isCreating}
					{...register('description', { required: 'This field is required' })}
				/>
			</FormRow>

			<FormRow label="Cabin photo">
				<FileInput
					id="image"
					accept="image/*"
					{...register('image', { required: 'This field is required' })}
				/>
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
