import { useForm } from 'react-hook-form';
import { useCreateCabin } from './useCreateCabin';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';
import { useEditCabin } from './useEditCabin';

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
	// Getting the values necessary to re-populate the form.
	const { id: editId, ...editValues } = cabinToEdit;

	// If there is an editId, then the form is for editing an existing cabin.
	const isEditSession = Boolean(editId);

	// Getting access to some vital functions from the useForm hook.
	const { register, handleSubmit, reset, getValues, formState } = useForm({
		// Only if we are editing an existing cabin, we want to populate the form with the existing values.
		defaultValues: isEditSession ? editValues : {},
	});

	// Getting all of the validation errors from the form.
	const { errors } = formState;

	// This mutation is for the create form.
	const { createCabin, isCreating } = useCreateCabin();

	// The mutation for the edit form.
	const { editCabin, isEditing } = useEditCabin();

	// This variables tells us if the function is in the process of creating or editing a cabin.
	const isWorking = isCreating || isEditing;

	// This function will be called when the form is submitted.
	// It gets access to all the data from the form.
	function onSubmit(data) {
		// We need to determine if a new image was uploaded or not.
		const image = typeof data.image === 'string' ? data.image : data.image[0];
		// If we are in the edit session, we need to call the editCabin function.
		if (isEditSession) {
			editCabin(
				{ newCabinData: { ...data, image }, id: editId },
				{
					onSuccess: () => {
						reset();
						onCloseModal?.();
					},
				}
			);
		} else {
			// Since the image is an array, I need to get the first element from it.
			createCabin(
				{ ...data, image: image },
				{
					onSuccess: () => {
						reset();
						onCloseModal?.();
					},
				}
			);
		}
	}

	// This function will be called when the form has validation errors.
	function onError(errors) {
		// console.log(errors);
	}

	return (
		// Handling both the submit and the error cases (validation-wise) for the form.
		<Form
			onSubmit={handleSubmit(onSubmit, onError)}
			$type={onCloseModal ? 'modal' : 'regular'}
		>
			<FormRow label="Cabin name" error={errors?.name?.message}>
				{/* Registering the input fields that we want React Hook Forms to handle*/}
				<Input
					type="text"
					id="name"
					// While the cabin is being created, the input field is disabled.
					disabled={isWorking}
					// Defining some validation rules for the input field.
					{...register('name', { required: 'This field is required' })}
				/>
			</FormRow>

			<FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
				<Input
					type="number"
					id="maxCapacity"
					disabled={isWorking}
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
					disabled={isWorking}
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
					disabled={isWorking}
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
					disabled={isWorking}
					{...register('description', { required: 'This field is required' })}
				/>
			</FormRow>

			<FormRow label="Cabin photo">
				<FileInput
					id="image"
					accept="image/*"
					{...register('image', {
						required: isEditSession ? false : 'This field is required',
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button
					onClick={() => onCloseModal?.()}
					$variation="secondary"
					type="reset"
				>
					Cancel
				</Button>
				<Button disabled={isWorking}>
					{isEditSession ? 'Edit cabin' : 'Create new cabin'}
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
